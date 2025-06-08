import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../dashboard/lib/supabaseClient';
import { withAuth } from '../middleware';

// GET /api/keys - List all API keys for the authenticated user
export async function GET(request: NextRequest) {
  return withAuth(request, async (userEmail) => {
    // Fetch user ID from your users table using the email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Now use user.id to filter API keys
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  });
}

// POST /api/keys - Create a new API key
export async function POST(request: NextRequest) {
  return withAuth(request, async (userEmail) => {
    try {
      // Get user ID from users table
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (userError || !user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const body = await request.json();
      const { name, type = 'dev' } = body;

      const newKey = {
        name: name || 'default',
        type,
        usage: 0,
        key: `dandi-${Math.random().toString(36).substr(2, 8)}n6t9`,
        created_at: new Date().toISOString(),
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from('api_keys')
        .insert([newKey])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(data, { status: 201 });
    } catch (error) {
      console.error('Error creating API key:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  });
} 