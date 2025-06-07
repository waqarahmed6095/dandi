import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { summarizeRepository } from './chain';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    // Get API key from request headers
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 401 }
      );
    }

    // Validate API key in Supabase
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .limit(1);

    if (error || !data || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'GitHub URL is required' },
        { status: 400 }
      );
    }

    // Validate GitHub URL format
    if (!url.startsWith('https://github.com/')) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL format' },
        { status: 400 }
      );
    }

    // Use the refactored summarizeRepository function
    const parsed = await summarizeRepository(url);

    return NextResponse.json({
      summary: parsed.summary,
      coolfacts: parsed.coolfacts,
      repository: url,
    });

  } catch (error) {
    console.error('Error in GitHub summarizer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
 