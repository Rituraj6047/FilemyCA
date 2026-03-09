import { Users, CheckCircle, Clock, CalendarClock } from 'lucide-react';
import { currentFilingPeriod } from '@/data/dummyClients';

function getDaysToDeadline(): number {
    const deadline = new Date(currentFilingPeriod.deadlineDate);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getDaysColor(days: number): string {
    if (days <= 3) return '#ef4444';
    if (days <= 7) return '#f59e0b';
    return '#6366f1';
}

export default function StatCards() {
    const daysLeft = getDaysToDeadline();

    const cards = [
        { label: 'Total Clients', value: 47, icon: Users, glow: false },
        { label: 'Submitted', value: 31, icon: CheckCircle, glow: false },
        { label: 'Pending', value: 10, icon: Clock, glow: false },
        { label: 'Days to Deadline', value: daysLeft, icon: CalendarClock, glow: true },
    ];

    return (
        <div className="stat-cards-grid dashboard-section">
            {cards.map((card, index) => {
                const Icon = card.icon;
                const isDeadline = card.glow;
                const valueColor = isDeadline ? getDaysColor(card.value) : '#f0f0ff';

                return (
                    <div
                        key={card.label}
                        className={`stat-card fade-in-${index + 1}${isDeadline ? ' stat-card-glow' : ''}`}
                    >
                        <Icon size={20} className="stat-icon" />
                        <div className="stat-value" style={{ color: valueColor }}>
                            {card.value}
                        </div>
                        <div className="stat-label">{card.label}</div>
                    </div>
                );
            })}
        </div>
    );
}
