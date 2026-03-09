import { CalendarClock } from "lucide-react";

interface DeadlineBannerProps {
    returnType: string;
    month: string;
    year: number;
    deadline: string;
    daysLeft: number;
}

export default function DeadlineBanner({
    returnType,
    month,
    year,
    deadline,
    daysLeft,
}: DeadlineBannerProps) {
    /* ── Color logic ─────────────────────────────────── */
    let bg: string;
    let border: string;

    if (daysLeft <= 3) {
        bg = "rgba(239,68,68,0.1)";
        border = "#ef4444";
    } else if (daysLeft <= 7) {
        bg = "rgba(245,158,11,0.1)";
        border = "#f59e0b";
    } else {
        bg = "rgba(99,102,241,0.1)";
        border = "#6366f1";
    }

    return (
        <div
            className="deadline-banner"
            style={{
                background: bg,
                borderLeft: `3px solid ${border}`,
            }}
        >
            <span className="deadline-banner-left">
                {returnType} · {month} {year} &nbsp;|&nbsp; Deadline: {deadline}
            </span>

            <span className="deadline-banner-right" style={{ color: border }}>
                <CalendarClock size={16} />
                {daysLeft} days left
            </span>
        </div>
    );
}
