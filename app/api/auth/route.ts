import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { pin } = await request.json();
  const correctPin = process.env.PIN || '1234';

  if (pin === correctPin) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth_token', 'verified', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
