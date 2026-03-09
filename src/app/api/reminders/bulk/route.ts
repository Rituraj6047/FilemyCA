// TODO: Replace with real DB update and external API call
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        console.log('STUB → POST /api/reminders/bulk:', body);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return NextResponse.json({ success: true, count: body.clientIds?.length || 0 });
    } catch (error) {
        console.error('Error in /api/reminders/bulk stub:', error);
        return NextResponse.json(
            { error: 'Failed to send bulk reminders' },
            { status: 500 }
        );
    }
}
