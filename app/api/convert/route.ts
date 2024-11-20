import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url, format } = await req.json();
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/convert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, format }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Conversion failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to convert video' },
      { status: 500 }
    );
  }
}