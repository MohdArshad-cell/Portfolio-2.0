import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Server-to-server call bypasses browser CORS completely
    const response = await fetch('https://ipwho.is/', { cache: 'no-store' });
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch location' }, { status: 500 });
  }
}