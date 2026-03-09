'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Bell,
} from 'lucide-react';

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/clients', label: 'Clients', icon: Users },
    { href: '/admin/filing-periods', label: 'Filing Periods', icon: Calendar },
    { href: '/admin/reminders', label: 'Reminders', icon: Bell },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Derive page title from pathname
    const currentNav = navItems.find((item) => pathname.startsWith(item.href));
    const pageTitle = currentNav?.label || 'Dashboard';

    return (
        <div className="admin-layout">
            {/* ── Sidebar ─────────────────────────────────── */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <div className="sidebar-brand-name">FileMyCa</div>
                    <div className="sidebar-brand-firm">Sharma &amp; Associates</div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`sidebar-nav-item${isActive ? ' active' : ''}`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-user">
                    <div className="sidebar-avatar">SA</div>
                    <div>
                        <div className="sidebar-user-name">Sharma &amp; Associates</div>
                        <div className="sidebar-user-role">CA Firm Admin</div>
                    </div>
                </div>
            </aside>

            {/* ── Main Area ───────────────────────────────── */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <div className="topbar-title">{pageTitle}</div>
                    <div className="topbar-right">
                        <span className="topbar-badge">GSTR-1 · March 2026</span>
                        <Bell size={20} className="topbar-bell" />
                    </div>
                </header>

                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
