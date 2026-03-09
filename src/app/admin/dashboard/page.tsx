'use client';

import { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { dummyClients } from '@/data/dummyClients';
import StatCards from '@/components/admin/StatCards';
import SubmissionChart from '@/components/admin/SubmissionChart';
import DeadlineBanner from '@/components/admin/DeadlineBanner';
import ClientTable from '@/components/admin/ClientTable';
import ReminderModal from '@/components/admin/ReminderModal';

export default function DashboardPage() {
    const [showModal, setShowModal] = useState(false);

    // Get all pending and overdue clients for bulk mode
    const bulkClients = dummyClients.filter(c => c.status === 'Pending' || c.status === 'Overdue');
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#f0f0ff', margin: '0 0 4px 0' }}>Dashboard</h1>
                <button
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => setShowModal(true)}
                >
                    <CalendarClock size={16} />
                    Send Reminders
                </button>
            </div>

            <StatCards />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="dashboard-section">
                <SubmissionChart />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <DeadlineBanner />
                </div>
            </div>
            <ClientTable />

            {showModal && (
                <ReminderModal
                    mode="bulk"
                    pendingClients={bulkClients}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}
