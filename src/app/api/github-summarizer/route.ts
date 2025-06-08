import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { summarizeRepository } from './chain';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Checks API key usage against its limit and increments usage if allowed.
 * @param apiKey The API key string
 * @returns {Promise<{ allowed: boolean, error?: string, code?: number }>} allowed: true if under limit, false if over limit
 */
export async function checkApiKeyLimitAndIncrement(apiKey: string): Promise<{ allowed: boolean, error?: string, code?: number }> {
  // Fetch API key row with usage and usage_limit
  const { data, error } = await supabase
    .from('api_keys')
    .select('id, usage, usage_limit')
    .eq('key', apiKey)
    .limit(1)
    .single();

  if (error || !data) {
    return { allowed: false, error: 'Invalid API key', code: 401 };
  }

  // Parse usage_limit as a number (if present)
  const usageLimit = data.usage_limit ? parseInt(data.usage_limit, 10) : null;

  // Check rate limit
  if (usageLimit !== null && data.usage >= usageLimit) {
    return { allowed: false, error: 'Rate limit exceeded', code: 429 };
  }

  // Increment usage
  const { error: updateError } = await supabase
    .from('api_keys')
    .update({ usage: data.usage + 1 })
    .eq('id', data.id);

  if (updateError) {
    return { allowed: false, error: 'Failed to update usage', code: 500 };
  }

  return { allowed: true };
}

/**
 * Extracts owner and repo name from a GitHub URL
 */
function extractGitHubInfo(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

/**
 * Fetches repository metadata from GitHub API
 */
async function fetchGitHubMetadata(owner: string, repo: string) {
  // Fetch basic repo info
  const repoResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Repo-Summarizer'
      }
    }
  );

  if (!repoResponse.ok) {
    throw new Error(`GitHub API error: ${repoResponse.statusText}`);
  }

  const repoData = await repoResponse.json();

  // Fetch latest release
  const releasesResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Repo-Summarizer'
      }
    }
  );

  let latestVersion = 'No releases found';
  if (releasesResponse.ok) {
    const releaseData = await releasesResponse.json();
    latestVersion = releaseData.tag_name;
  }

  return {
    stars: repoData.stargazers_count,
    latestVersion,
    website: repoData.homepage || null,
    license: repoData.license?.name || 'No license specified'
  };
}

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 401 });
    }

    // Use the reusable rate limit function
    const limitResult = await checkApiKeyLimitAndIncrement(apiKey);
    if (!limitResult.allowed) {
      return NextResponse.json({ error: limitResult.error }, { status: limitResult.code || 429 });
    }

    // Continue with your logic
    const body = await request.json();
    const { url } = body;
    if (!url) {
      return NextResponse.json({ error: 'GitHub URL is required' }, { status: 400 });
    }
    if (!url.startsWith('https://github.com/')) {
      return NextResponse.json({ error: 'Invalid GitHub URL format' }, { status: 400 });
    }

    // Extract GitHub info and fetch metadata
    const githubInfo = extractGitHubInfo(url);
    if (!githubInfo) {
      return NextResponse.json({ error: 'Invalid GitHub URL format' }, { status: 400 });
    }

    const [parsed, metadata] = await Promise.all([
      summarizeRepository(url),
      fetchGitHubMetadata(githubInfo.owner, githubInfo.repo)
    ]);

    return NextResponse.json({
      summary: parsed.summary,
      coolfacts: parsed.coolfacts,
      repository: url,
      stars: metadata.stars,
      latestVersion: metadata.latestVersion,
      website: metadata.website,
      license: metadata.license
    });

  } catch (error) {
    console.error('Error in GitHub summarizer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
 