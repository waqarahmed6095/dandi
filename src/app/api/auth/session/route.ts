import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  // Log all cookies from the request
  console.log('Cookies:', request.cookies.getAll());

  // Try to get the token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log('Token from getToken:', token);

  if (!token) {
    console.error('No valid session token found. Not authenticated.');
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // If token is valid, return the session info
  return NextResponse.json({ token });
} 