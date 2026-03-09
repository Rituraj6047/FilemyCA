import { NextResponse } from 'next/server';

// TODO: Replace with real DB update
export async function PATCH(req: Request) {
    const body = await req.json();
    console.log('Status update:', body);
    return NextResponse.json({ success: true });
}
