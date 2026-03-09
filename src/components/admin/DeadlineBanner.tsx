import { CalendarClock } from 'lucide-react';
import { currentFilingPeriod } from '@/data/dummyClients';

function getDaysToDeadline(): number {
    const deadline = new Date(currentFilingPeriod.deadlineDate);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getBannerClass(days: number): string {
    if (days <= 3) return 'deadline-danger';
    if (days <= 7) return 'deadline-warn';
    return 'deadline-safe';
}

export default function DeadlineBanner() {
    const daysLeft = getDaysToDeadline();
    const bannerClass = getBannerClass(daysLeft);

    return (
        <div className={`deadline-banner ${bannerClass} dashboard-section`}>
            <div className="deadline-banner-left">
                {currentFilingPeriod.returnType} · {currentFilingPeriod.month}{' '}
                {currentFilingPeriod.year} · Deadline: 11th March
            </div>
            <div className="deadline-banner-right">
                <CalendarClock size={18} />
                {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
            </div>
        </div>
    );
}
