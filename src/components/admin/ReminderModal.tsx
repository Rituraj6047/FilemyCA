'use client';

import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface SimpleClient {
    id: string;
    name: string;
    phone: string;
    gstin?: string; // Single mode may provide this
}

export interface ReminderModalProps {
    mode: 'single' | 'bulk';
    client?: SimpleClient; // For single mode
    pendingClients?: SimpleClient[]; // For bulk mode
    onClose: () => void;
    onSent?: () => void;
}

type ModalState = 'preview' | 'sending' | 'sent';

export default function ReminderModal({
    mode,
    client,
    pendingClients,
    onClose,
    onSent,
}: ReminderModalProps) {
    const [modalState, setModalState] = useState<ModalState>('preview');
    // For bulk mode
    const [selectedClientIds, setSelectedClientIds] = useState<Set<string>>(
        new Set(pendingClients?.map((c) => c.id) || [])
    );

    // Editing template
    const [isEditingTemplate, setIsEditingTemplate] = useState(false);

    const defaultSingleTemplate = `🔔 Reminder from Sharma & Associates

Dear ${client?.name || '[Name]'},

Please upload your sales register for March 2026 (GSTR-1).
Deadline: 11th March 2026.

Upload here: https://filemyca.in/upload/demo

Thank you,
Sharma & Associates`;

    const defaultBulkTemplate = `🔔 Reminder from Sharma & Associates

Dear [Client Name],

Please upload your sales register for March 2026 (GSTR-1).
Deadline: 11th March 2026.

Upload here: https://filemyca.in/upload/demo

Thank you,
Sharma & Associates`;

    const [templateText, setTemplateText] = useState(
        mode === 'single' ? defaultSingleTemplate : defaultBulkTemplate
    );

    const [sentChannel, setSentChannel] = useState<'WhatsApp' | 'Email'>('WhatsApp');
    const [toastMsg, setToastMsg] = useState<string | null>(null);

    // Total counts
    const totalPending = pendingClients?.length || 0;
    const selectedCount = selectedClientIds.size;

    // ── Handlers ──
    function handleToggleAll(checked: boolean) {
        if (!pendingClients) return;
        if (checked) {
            setSelectedClientIds(new Set(pendingClients.map((c) => c.id)));
        } else {
            setSelectedClientIds(new Set());
        }
    }

    function handleToggleOne(id: string, checked: boolean) {
        const next = new Set(selectedClientIds);
        if (checked) next.add(id);
        else next.delete(id);
        setSelectedClientIds(next);
    }

    function handleSend(channel: 'WhatsApp' | 'Email') {
        const count = mode === 'single' ? 1 : selectedCount;
        if (count === 0) return;

        setSentChannel(channel);
        setModalState('sending');

        setTimeout(() => {
            setModalState('sent');
            setToastMsg(`${count} reminder(s) sent via ${channel}`);

            // Simulated API call based on mode
            if (mode === 'single' && client) {
                console.log('STUB → POST /api/reminders/bulk', { clientIds: [client.id], channel });
            } else if (mode === 'bulk') {
                console.log('STUB → POST /api/reminders/bulk', { clientIds: Array.from(selectedClientIds), channel });
            }

            if (onSent) onSent();

            // clear toast after 3s
            setTimeout(() => setToastMsg(null), 3000);
        }, 1500);
    }

    // Modal title based on mode
    const headerTitle =
        mode === 'single'
            ? `Send Reminder — ${client?.name || ''}`
            : `Send Reminders — ${totalPending} Pending Clients`;

    return (
        <>
            <style>{`
                @keyframes reminderModalOpen {
                    from { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
            `}</style>

            {/* Overlay */}
            <div
                className="reminder-modal-overlay"
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.6)',
                    zIndex: 50,
                }}
                onClick={() => {
                    // Do not close if sending
                    if (modalState !== 'sending') onClose();
                }}
            />

            {/* Modal Box */}
            <div
                className="reminder-modal-box"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 51,
                    background: '#12121a',
                    border: '1px solid #2a2a3a',
                    borderRadius: '12px',
                    width: '540px',
                    maxHeight: '82vh',
                    overflowY: 'auto',
                    animation: 'reminderModalOpen 200ms ease-out',
                }}
            >
                {/* ── PREVIEW OR SENDING STATE (Same layout, changing footer) ── */}
                {modalState !== 'sent' && (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '20px 24px',
                                borderBottom: '1px solid #1a1a26',
                            }}
                        >
                            <span style={{ fontSize: '18px', fontWeight: 600, color: '#f0f0ff' }}>
                                {headerTitle}
                            </span>
                            {/* Disable close if sending */}
                            {modalState !== 'sending' && (
                                <button
                                    onClick={onClose}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#8888aa',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Message Template Box */}
                            <div
                                style={{
                                    background: '#0a0a0f',
                                    border: '1px solid #2a2a3a',
                                    borderRadius: '8px',
                                    padding: '16px',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span
                                        style={{
                                            fontSize: '11px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            color: '#8888aa',
                                        }}
                                    >
                                        Message Preview
                                    </span>
                                    <button
                                        onClick={() => setIsEditingTemplate(!isEditingTemplate)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            fontSize: '12px',
                                            color: '#6366f1',
                                            cursor: 'pointer',
                                            padding: 0,
                                        }}
                                        disabled={modalState === 'sending'}
                                    >
                                        {isEditingTemplate ? 'Save template' : 'Edit template'}
                                    </button>
                                </div>

                                {isEditingTemplate ? (
                                    <textarea
                                        value={templateText}
                                        onChange={(e) => setTemplateText(e.target.value)}
                                        disabled={modalState === 'sending'}
                                        style={{
                                            background: '#0a0a0f',
                                            border: 'none',
                                            color: '#c0c0d0',
                                            fontSize: '13px',
                                            lineHeight: 1.7,
                                            width: '100%',
                                            minHeight: '160px',
                                            resize: 'vertical',
                                            outline: 'none',
                                            boxShadow: modalState === 'sending' ? 'none' : 'inset 0 0 0 1px #6366f1',
                                        }}
                                    />
                                ) : (
                                    <pre
                                        style={{
                                            margin: 0,
                                            whiteSpace: 'pre-wrap',
                                            fontFamily: 'inherit',
                                            color: '#c0c0d0',
                                            fontSize: '13px',
                                            lineHeight: 1.7,
                                            minHeight: '160px',
                                            opacity: modalState === 'sending' ? 0.6 : 1,
                                        }}
                                    >
                                        {templateText}
                                    </pre>
                                )}
                            </div>

                            {/* Pending Clients List (Bulk mode only) */}
                            {mode === 'bulk' && pendingClients && (
                                <div>
                                    <div
                                        style={{
                                            fontSize: '11px',
                                            textTransform: 'uppercase',
                                            color: '#8888aa',
                                            marginBottom: '8px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <span>Pending clients ({totalPending})</span>
                                        <span style={{ fontSize: '12px', textTransform: 'none' }}>
                                            {selectedCount} of {totalPending} selected
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            maxHeight: '180px',
                                            overflowY: 'auto',
                                            border: '1px solid #1a1a26',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        {/* Select All Row */}
                                        <div
                                            style={{
                                                padding: '8px 12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                borderBottom: '1px solid #1a1a26',
                                                background: 'rgba(255,255,255,0.02)',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCount === totalPending && totalPending > 0}
                                                onChange={(e) => handleToggleAll(e.target.checked)}
                                                disabled={modalState === 'sending'}
                                                style={{ accentColor: '#6366f1', cursor: 'pointer' }}
                                            />
                                            <span style={{ fontSize: '12px', color: '#8888aa' }}>Select All</span>
                                        </div>

                                        {/* Client Rows */}
                                        {pendingClients.map((c, i) => (
                                            <div
                                                key={c.id}
                                                className="reminder-row"
                                                style={{
                                                    padding: '8px 12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    borderBottom: i === pendingClients.length - 1 ? 'none' : '1px solid #1a1a26',
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedClientIds.has(c.id)}
                                                    onChange={(e) => handleToggleOne(c.id, e.target.checked)}
                                                    disabled={modalState === 'sending'}
                                                    style={{ accentColor: '#6366f1', cursor: 'pointer' }}
                                                />
                                                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ fontSize: '13px', color: '#f0f0ff' }}>{c.name}</span>
                                                    <span style={{ fontSize: '12px', color: '#8888aa' }}>{c.phone}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div
                            style={{
                                padding: '16px 24px',
                                borderTop: '1px solid #1a1a26',
                                display: 'flex',
                                gap: '8px',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            {modalState === 'preview' ? (
                                <>
                                    <button
                                        className="btn-ghost"
                                        style={{ marginRight: 'auto' }}
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn-primary"
                                        onClick={() => handleSend('WhatsApp')}
                                        disabled={selectedCount === 0 && mode === 'bulk'}
                                    >
                                        Send via WhatsApp
                                    </button>
                                    <button
                                        className="btn-ghost"
                                        onClick={() => handleSend('Email')}
                                        disabled={selectedCount === 0 && mode === 'bulk'}
                                    >
                                        Send via Email
                                    </button>
                                </>
                            ) : (
                                <div style={{ color: '#8888aa', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid #2a2a3a',
                                        borderTopColor: '#6366f1',
                                        borderRadius: '50%',
                                        animation: 'spin 0.6s linear infinite',
                                    }} />
                                    Sending reminders...
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* ── SENT STATE ── */}
                {modalState === 'sent' && (
                    <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '320px', justifyContent: 'center' }}>
                        <CheckCircle size={52} color="#10b981" />
                        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#f0f0ff', marginTop: '16px', marginBottom: '8px' }}>
                            Reminders sent
                        </h2>
                        <p style={{ fontSize: '13px', color: '#8888aa', marginBottom: '32px' }}>
                            {mode === 'single' ? 1 : selectedCount} clients notified via {sentChannel}
                        </p>
                        <button className="btn-primary" onClick={onClose} style={{ width: '100%', maxWidth: '200px', justifyContent: 'center' }}>
                            Done
                        </button>
                    </div>
                )}
            </div>

            {/* Local Toast For Sent State (simulated layout, matches layout.tsx location generally, but absolute within window mapping) */}
            {toastMsg && (
                <div
                    className="toast"
                    style={{ borderLeft: '3px solid #6366f1', position: 'fixed', zIndex: 1000 }}
                >
                    {toastMsg}
                </div>
            )}
        </>
    );
}
