'use client';

import { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { dummyClients } from '@/data/dummyClients';

// Generate some dummy reminder history based on the dummy clients
const dummyReminders = dummyClients.slice(0, 15).map((client, i) => {
    const channels = ['WhatsApp', 'Email'];
    const statuses = ['Delivered', 'Failed', 'Read', 'Sent'];

    // Deterministic random-looking data based on index
    const channel = channels[i % 2];
    const status = statuses[i % 4];

    // Generate dates over the last few days
    const date = new Date();
    date.setDate(date.getDate() - (i % 5));
    date.setHours(9 + (i % 8));
    date.setMinutes(i * 7 % 60);

    return {
        id: `REM-${2026}${i.toString().padStart(4, '0')}`,
        clientName: client.name,
        gstin: client.gstin,
        channel,
        status,
        timestamp: date.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }),
    };
});

const statusColors: Record<string, string> = {
    Delivered: '#10b981',
    Failed: '#ef4444',
    Read: '#3b82f6',
    Sent: '#8888aa',
};

export default function RemindersPage() {
    const [search, setSearch] = useState('');

    const filteredReminders = dummyReminders.filter(
        (r) =>
            r.clientName.toLowerCase().includes(search.toLowerCase()) ||
            r.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#f0f0ff', margin: 0 }}>
                    Reminder History
                </h1>
                <p style={{ color: '#8888aa', fontSize: '14px', marginTop: '4px' }}>
                    Log of all sent WhatsApp and Email reminders.
                </p>
            </div>

            <div className="table-controls">
                <div className="search-input-wrapper">
                    <Search size={16} className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by client name or ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Reminder ID</th>
                        <th>Client</th>
                        <th>Channel</th>
                        <th>Status</th>
                        <th>Sent At</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReminders.map((rem) => (
                        <tr key={rem.id}>
                            <td style={{ color: '#8888aa', fontSize: '13px' }}>{rem.id}</td>
                            <td>
                                <div>{rem.clientName}</div>
                                <div style={{ fontSize: '12px', color: '#8888aa', marginTop: '2px' }}>
                                    {rem.gstin.slice(0, 8)}...
                                </div>
                            </td>
                            <td>{rem.channel}</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div
                                        style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: statusColors[rem.status],
                                        }}
                                    />
                                    <span style={{ fontSize: '13px', color: statusColors[rem.status] }}>
                                        {rem.status}
                                    </span>
                                </div>
                            </td>
                            <td style={{ color: '#8888aa', fontSize: '13px' }}>{rem.timestamp}</td>
                        </tr>
                    ))}
                    {dummyReminders.length === 0 && (
                        <tr>
                            <td colSpan={5}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', color: '#8888aa' }}>
                                    <Bell size={32} style={{ marginBottom: '16px', color: '#8888aa' }} />
                                    <div style={{ fontSize: '14px' }}>No reminders sent yet this filing cycle</div>
                                </div>
                            </td>
                        </tr>
                    )}
                    {dummyReminders.length > 0 && filteredReminders.length === 0 && (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', color: '#8888aa', padding: '32px' }}>
                                No reminders found matching your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
