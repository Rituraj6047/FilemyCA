// TODO: Replace with real DB update and external API call
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        console.log('STUB → POST /api/reminders/send:', body);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in /api/reminders/send stub:', error);
        return NextResponse.json(
            { error: 'Failed to send reminder' },
            { status: 500 }
        );
    }
}
