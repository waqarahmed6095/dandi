/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {  NextResponse } from 'next/server';
import { supabase } from '../../../dashboard/lib/supabaseClient';
import { withAuth } from '../../middleware';

// GET /api/keys/[id] - Get a single API key
export async function GET(request: Request, context: { params: { id: string } }) {
  const { params } = context;
  console.log('GET /api/keys/[id] called with params:', params);
  return withAuth(request, async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching API key:', error);
        if (error.code === 'PGRST116') {
          return NextResponse.json({ error: 'API key not found' }, { status: 404 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log('Fetched API key:', data);
      return NextResponse.json(data);
    } catch (error) {
      console.error('Exception in GET /api/keys/[id]:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  });
}

// PUT /api/keys/[id] - Update an API key
export async function PUT(request: Request, context: { params: { id: string } }) {
  const { params } = context;
  console.log('PUT /api/keys/[id] called with params:', params);
  return withAuth(request, async () => {
    try {
      const body = await request.json();
      console.log('PUT body:', body);
      const { name, type } = body;

      const { data, error } = await supabase
        .from('api_keys')
        .update({ name, type })
        .eq('id', params.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating API key:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log('Updated API key:', data);
      return NextResponse.json(data);
    } catch (error) {
      console.error('Exception in PUT /api/keys/[id]:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  });
}

// DELETE /api/keys/[id] - Delete an API key
export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { params } = context;
  console.log('DELETE /api/keys/[id] called with params:', params);
  return withAuth(request, async () => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', params.id);

      if (error) {
        console.error('Error deleting API key:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log('Deleted API key with id:', params.id);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Exception in DELETE /api/keys/[id]:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  });
} 