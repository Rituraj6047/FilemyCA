'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, SearchX, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { dummyClients, Client, ClientStatus } from '@/data/dummyClients';
import ClientPanel from './ClientPanel';
import ReminderModal from './ReminderModal';

type SortField = 'name' | 'status' | null;
type SortDir = 'asc' | 'desc';

const ROWS_PER_PAGE = 10;

const statusBadgeClass: Record<ClientStatus, string> = {
    Pending: 'badge badge-pending',
    'Data Received': 'badge badge-received',
    Verified: 'badge badge-verified',
    Filed: 'badge badge-filed',
    Overdue: 'badge badge-overdue',
};

const statusOrder: Record<ClientStatus, number> = {
    Overdue: 0,
    Pending: 1,
    'Data Received': 2,
    Verified: 3,
    Filed: 4,
};

function truncateGstin(gstin: string): string {
    return gstin.length > 8 ? gstin.slice(0, 8) + '...' : gstin;
}

export default function ClientTable() {
    const [clients, setClients] = useState<Client[]>(dummyClients);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDir, setSortDir] = useState<SortDir>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    // Toast state
    const [toast, setToast] = useState<{ message: string; borderColor: string } | null>(null);

    function showToast(message: string, borderColor: string = '#6366f1') {
        setToast({ message, borderColor });
        setTimeout(() => setToast(null), 3000);
    }

    // Per-client cooldown state: clientId → seconds remaining
    const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
    const cooldownRefs = useRef<Record<string, ReturnType<typeof setInterval>>>({});

    // To handle "single mode" modal
    const [clientToRemind, setClientToRemind] = useState<Client | null>(null);

    // Clean up all intervals on unmount
    useEffect(() => {
        return () => {
            Object.values(cooldownRefs.current).forEach(clearInterval);
        };
    }, []);

    // Filter + sort
    const filteredClients = useMemo(() => {
        let result = [...clients];

        // Search
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (c) =>
                    c.name.toLowerCase().includes(q) ||
                    c.gstin.toLowerCase().includes(q)
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter((c) => c.status === statusFilter);
        }

        // Sort
        if (sortField === 'name') {
            result.sort((a, b) => {
                const cmp = a.name.localeCompare(b.name);
                return sortDir === 'asc' ? cmp : -cmp;
            });
        } else if (sortField === 'status') {
            result.sort((a, b) => {
                const cmp = statusOrder[a.status] - statusOrder[b.status];
                return sortDir === 'asc' ? cmp : -cmp;
            });
        }

        return result;
    }, [clients, search, statusFilter, sortField, sortDir]);

    // Pagination
    const totalPages = Math.ceil(filteredClients.length / ROWS_PER_PAGE);
    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * ROWS_PER_PAGE,
        currentPage * ROWS_PER_PAGE
    );

    function handleSort(field: SortField) {
        if (sortField === field) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDir('asc');
        }
        setCurrentPage(1);
    }

    function getSortIcon(field: SortField) {
        if (sortField !== field) return <ArrowUpDown size={12} className="sort-icon" />;
        return sortDir === 'asc' ? (
            <ArrowUp size={12} className="sort-icon" />
        ) : (
            <ArrowDown size={12} className="sort-icon" />
        );
    }

    function handleStatusChange(clientId: string, newStatus: ClientStatus) {
        setClients((prev) =>
            prev.map((c) => (c.id === clientId ? { ...c, status: newStatus } : c))
        );
        // Also update selectedClient if it's the same
        if (selectedClient?.id === clientId) {
            setSelectedClient((prev) =>
                prev ? { ...prev, status: newStatus } : null
            );
        }
        showToast(`Status updated to ${newStatus}`);
    }

    function handleRemind(client: Client, e?: React.MouseEvent) {
        if (e) e.stopPropagation();
        if (cooldowns[client.id]) return; // already in cooldown

        // Instead of directly sending, open the ReminderModal in "single" mode
        setClientToRemind(client);
    }

    function handleReminderSent() {
        if (!clientToRemind) return;
        const clientId = clientToRemind.id;

        // Start 60s cooldown for this client
        setCooldowns((prev) => ({ ...prev, [clientId]: 60 }));
        cooldownRefs.current[clientId] = setInterval(() => {
            setCooldowns((prev) => {
                const remaining = (prev[clientId] ?? 0) - 1;
                if (remaining <= 0) {
                    clearInterval(cooldownRefs.current[clientId]);
                    delete cooldownRefs.current[clientId];
                    const { [clientId]: _, ...rest } = prev;
                    return rest;
                }
                return { ...prev, [clientId]: remaining };
            });
        }, 1000);
    }

    return (
        <>
            {/* Controls */}
            <div className="table-controls">
                <div className="search-input-wrapper">
                    <Search size={16} className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Data Received">Data Received</option>
                    <option value="Verified">Verified</option>
                    <option value="Filed">Filed</option>
                    <option value="Overdue">Overdue</option>
                </select>
            </div>

            {/* Table */}
            <table className="data-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <span className="sortable-header" onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                Client Name {getSortIcon('name')}
                            </span>
                        </th>
                        <th>GSTIN</th>
                        <th>
                            <span className="sortable-header" onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                                Status {getSortIcon('status')}
                            </span>
                        </th>
                        <th>Last Upload</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedClients.map((client, index) => (
                        <tr
                            key={client.id}
                            onClick={() => setSelectedClient(client)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</td>
                            <td>{client.name}</td>
                            <td title={client.gstin}>{truncateGstin(client.gstin)}</td>
                            <td>
                                <span className={statusBadgeClass[client.status]}>
                                    {client.status}
                                </span>
                            </td>
                            <td style={{ color: '#8888aa', fontSize: '13px' }}>
                                {client.lastUpload || '—'}
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <button
                                        className="btn-ghost btn-small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedClient(client);
                                        }}
                                    >
                                        View
                                    </button>
                                    {client.status === 'Pending' || client.status === 'Overdue' ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <button
                                                className="btn-ghost btn-small"
                                                style={{
                                                    opacity: cooldowns[client.id] ? 0.4 : 1,
                                                    cursor: cooldowns[client.id] ? 'not-allowed' : 'pointer',
                                                }}
                                                disabled={!!cooldowns[client.id]}
                                                onClick={(e) => handleRemind(client, e)}
                                            >
                                                Remind
                                            </button>
                                            {cooldowns[client.id] && (
                                                <span style={{ fontSize: '11px', color: '#8888aa', marginTop: '2px' }}>
                                                    Cooldown: {cooldowns[client.id]}s
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: '12px', color: '#8888aa', padding: '6px 8px' }}>
                                            Submitted ✓
                                        </span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {paginatedClients.length === 0 && (
                        <tr>
                            <td colSpan={6}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', color: '#8888aa' }}>
                                    <SearchX size={24} style={{ marginBottom: '12px' }} />
                                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>No clients match your search</div>
                                    <button
                                        className="btn-ghost"
                                        style={{ fontSize: '13px', color: '#6366f1', padding: '4px 8px' }}
                                        onClick={() => {
                                            setSearch('');
                                            setStatusFilter('all');
                                        }}
                                    >
                                        Clear search
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`pagination-btn${page === currentPage ? ' active' : ''}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Slide-out Panel */}
            {selectedClient && (
                <ClientPanel
                    client={selectedClient}
                    currentCooldown={cooldowns[selectedClient.id] || 0}
                    onClose={() => setSelectedClient(null)}
                    onStatusChange={handleStatusChange}
                    onRemind={handleRemind}
                />
            )}

            {/* Reminder Modal (Single Mode) */}
            {clientToRemind && (
                <ReminderModal
                    mode="single"
                    client={clientToRemind}
                    onClose={() => setClientToRemind(null)}
                    onSent={handleReminderSent}
                />
            )}

            {/* Toast */}
            {toast && (
                <div className="toast" style={{ borderLeft: `3px solid ${toast.borderColor}` }}>
                    {toast.message}
                </div>
            )}
        </>
    );
}
