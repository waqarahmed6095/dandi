import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../dashboard/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Register with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0],
        },
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Create user record in the users table
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user?.id,
          email: data.user?.email,
          name: name || email.split('@')[0],
        },
      ]);

    if (profileError) {
      console.error('Error creating user profile:', profileError);
      // Continue anyway as the auth user was created
    }

    return NextResponse.json({
      message: 'Registration successful. Please check your email for verification.',
      user: data.user
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 