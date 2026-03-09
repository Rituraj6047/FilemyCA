'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { X, Phone, Mail, Download, CalendarClock } from 'lucide-react';
import { Client, ClientStatus } from '@/data/dummyClients';

interface ClientPanelProps {
    client: Client;
    currentCooldown?: number;
    onClose: () => void;
    onStatusChange: (clientId: string, newStatus: ClientStatus) => void;
    onRemind: (client: Client) => void;
}

const statusBadgeClass: Record<ClientStatus, string> = {
    Pending: 'badge badge-pending',
    'Data Received': 'badge badge-received',
    Verified: 'badge badge-verified',
    Filed: 'badge badge-filed',
    Overdue: 'badge badge-overdue',
};

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function ClientPanel({
    client,
    currentCooldown = 0,
    onClose,
    onStatusChange,
    onRemind,
}: ClientPanelProps) {
    // ── Toast state ─────────────────────────────────────
    const [toast, setToast] = useState<{ message: string; type: 'status' | 'reminder' | 'error' } | null>(null);

    function showToast(message: string, type: 'status' | 'reminder' | 'error' = 'reminder') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    // Clean up on unmount
    useEffect(() => {
        // Nothing to clean up anymore
    }, []);

    // ── Status change handler ───────────────────────────
    const handleStatusChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newStatus = e.target.value as ClientStatus;
            onStatusChange(client.id, newStatus);
            showToast(`Status updated to ${newStatus} ✅`, 'status');
            console.log('STUB → PATCH /api/clients/' + client.id + '/status', newStatus);
        },
        [client.id, onStatusChange]
    );

    // ── Reminder handler ────────────────────────────────
    const handleRemind = useCallback(() => {
        // Just bubble up to parent to open the single mode ReminderModal
        onRemind(client);
    }, [client, onRemind]);

    // ── Toast border color ──────────────────────────────
    const toastBorderColor =
        toast?.type === 'status' ? '#10b981' :
            toast?.type === 'error' ? '#ef4444' : '#6366f1';

    return (
        <>
            {/* Overlay */}
            <div className="panel-overlay" onClick={onClose} />

            {/* Panel */}
            <div className="slide-panel">
                {/* Header */}
                <div className="panel-header">
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: 600, color: '#f0f0ff' }}>
                            {client.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#8888aa', marginTop: '4px' }}>
                            {client.gstin}
                        </div>
                    </div>
                    <button className="panel-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Status */}
                <div className="panel-section">
                    <div className="panel-section-title">Current Status</div>
                    <div className="panel-status-row">
                        <span className={statusBadgeClass[client.status]}>
                            {client.status}
                        </span>
                    </div>

                    {/* Update Status Dropdown */}
                    <div style={{ marginTop: '12px' }}>
                        <div style={{
                            fontSize: '11px',
                            textTransform: 'uppercase' as const,
                            color: '#8888aa',
                            letterSpacing: '0.05em',
                            marginBottom: '4px',
                        }}>
                            Update Status
                        </div>
                        <select
                            value={client.status}
                            onChange={handleStatusChange}
                            style={{
                                background: '#0a0a0f',
                                border: '1px solid #2a2a3a',
                                borderRadius: '6px',
                                color: '#f0f0ff',
                                padding: '6px 10px',
                                fontSize: '13px',
                                width: '100%',
                                outline: 'none',
                                cursor: 'pointer',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#6366f1';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#2a2a3a';
                            }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Data Received">Data Received</option>
                            <option value="Verified">Verified</option>
                            <option value="Filed">Filed</option>
                        </select>
                    </div>
                </div>

                {/* Contact */}
                <div className="panel-section">
                    <div className="panel-section-title">Contact</div>
                    <div className="panel-contact-item">
                        <Phone size={14} />
                        {client.phone}
                    </div>
                    <div className="panel-contact-item">
                        <Mail size={14} />
                        {client.email}
                    </div>
                </div>

                {/* Uploaded Files */}
                <div className="panel-section">
                    <div className="panel-section-title">Uploaded Files</div>
                    {client.uploads.length === 0 ? (
                        <div className="panel-empty">No files uploaded yet</div>
                    ) : (
                        client.uploads.map((upload, index) => (
                            <div key={index} className="panel-file-item">
                                <div className="panel-file-info">
                                    <div className="panel-file-name">{upload.fileName}</div>
                                    <div className="panel-file-meta">
                                        {formatFileSize(upload.fileSize)} · {upload.uploadDate}
                                    </div>
                                </div>
                                <Download size={16} className="panel-file-download" />
                            </div>
                        ))
                    )}
                </div>

                {/* Actions */}
                <div className="panel-actions">
                    <button
                        className="btn-primary"
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            opacity: currentCooldown > 0 ? 0.7 : 1,
                            cursor: currentCooldown > 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                        onClick={handleRemind}
                        disabled={currentCooldown > 0}
                    >
                        {currentCooldown === 0 && <CalendarClock size={16} />}
                        Send Reminder
                    </button>
                    {currentCooldown > 0 && (
                        <div style={{
                            fontSize: '12px',
                            color: '#8888aa',
                            textAlign: 'center',
                            marginTop: '4px',
                        }}>
                            Cooldown: {currentCooldown}s
                        </div>
                    )}
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div
                    className="toast"
                    style={{ borderLeft: `3px solid ${toastBorderColor}` }}
                >
                    {toast.message}
                </div>
            )}
        </>
    );
}
