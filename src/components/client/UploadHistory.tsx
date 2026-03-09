import { UploadRecord } from "@/data/dummyClientPortal";

interface UploadHistoryProps {
    history: UploadRecord[];
}

function statusBadgeClass(status: string): string {
    const map: Record<string, string> = {
        Pending: "badge badge-pending",
        Received: "badge badge-received",
        Verified: "badge badge-verified",
        Filed: "badge badge-filed",
        Overdue: "badge badge-overdue",
    };
    return map[status] ?? "badge";
}

function truncate(str: string, max: number): string {
    return str.length > max ? str.slice(0, max) + "…" : str;
}

export default function UploadHistory({ history }: UploadHistoryProps) {
    if (history.length === 0) {
        return (
            <p
                style={{
                    textAlign: "center",
                    color: "#8888aa",
                    fontStyle: "italic",
                    padding: "32px 0",
                    fontSize: 14,
                }}
            >
                No previous uploads
            </p>
        );
    }

    return (
        <table className="data-table">
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Return Type</th>
                    <th>File Name</th>
                    <th>Uploaded On</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {history.map((row, i) => (
                    <tr key={i}>
                        <td>{row.month}</td>
                        <td>{row.returnType}</td>
                        <td title={row.fileName}>{truncate(row.fileName, 30)}</td>
                        <td>{row.uploadedOn}</td>
                        <td>
                            <span className={statusBadgeClass(row.status)}>
                                {row.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
