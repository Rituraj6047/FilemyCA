/* ── Types ────────────────────────────────────────────── */

export interface UploadRecord {
    month: string;
    returnType: string;
    fileName: string;
    uploadedOn: string;
    status: "Pending" | "Received" | "Verified" | "Filed" | "Overdue";
}

export interface CurrentFiling {
    returnType: string;
    month: string;
    year: number;
    deadline: string;
    daysLeft: number;
}

export interface ClientPortalData {
    clientName: string;
    gstin: string;
    firmName: string;
    currentFiling: CurrentFiling;
    uploadHistory: UploadRecord[];
}

/* ── Token → Client Data Map ─────────────────────────── */

const clientPortalMap: Record<string, ClientPortalData> = {
    demo: {
        clientName: "Patel Traders",
        gstin: "27AABCP1234A1Z5",
        firmName: "Sharma & Associates",
        currentFiling: {
            returnType: "GSTR-1",
            month: "March",
            year: 2026,
            deadline: "11 March 2026",
            daysLeft: 6,
        },
        uploadHistory: [
            {
                month: "January 2026",
                returnType: "GSTR-1",
                fileName: "sales_register_jan.xlsx",
                uploadedOn: "5 Jan 2026",
                status: "Filed",
            },
            {
                month: "February 2026",
                returnType: "GSTR-1",
                fileName: "sales_register_feb.xlsx",
                uploadedOn: "7 Feb 2026",
                status: "Filed",
            },
        ],
    },
};

/* ── Lookup helper ────────────────────────────────────── */

export function getClientByToken(token: string): ClientPortalData | null {
    return clientPortalMap[token] ?? null;
}
