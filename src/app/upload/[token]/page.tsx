"use client";

import { use } from "react";
import { AlertCircle } from "lucide-react";
import { getClientByToken } from "@/data/dummyClientPortal";
import DeadlineBanner from "@/components/client/DeadlineBanner";
import FileUploader from "@/components/client/FileUploader";
import UploadHistory from "@/components/client/UploadHistory";

export default function ClientUploadPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = use(params);
    const client = getClientByToken(token);

    /* ── Invalid token ─────────────────────────────────── */
    if (!client) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "calc(100vh - 120px)",
                    textAlign: "center",
                }}
            >
                <AlertCircle size={40} color="#ef4444" style={{ marginBottom: "20px" }} />
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#f0f0ff", margin: "0 0 8px 0" }}>
                    Invalid or expired link
                </h1>
                <p style={{ fontSize: "14px", color: "#8888aa", margin: 0 }}>
                    Please contact your CA firm for a new upload link.
                </p>
            </div>
        );
    }

    const { currentFiling, uploadHistory } = client;

    return (
        <div>
            {/* ── Client Greeting ────────────────────────────── */}
            <h2
                style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#f0f0ff",
                    marginBottom: 4,
                }}
            >
                Welcome, {client.clientName}
            </h2>
            <p style={{ fontSize: 13, color: "#8888aa", marginBottom: 28 }}>
                GSTIN: {client.gstin}
            </p>

            {/* ── Deadline Banner ────────────────────────────── */}
            <DeadlineBanner
                returnType={currentFiling.returnType}
                month={currentFiling.month}
                year={currentFiling.year}
                deadline={currentFiling.deadline}
                daysLeft={currentFiling.daysLeft}
            />

            {/* ── File Uploader ──────────────────────────────── */}
            <div style={{ marginTop: 28 }}>
                <FileUploader />
            </div>

            {/* ── Upload History ─────────────────────────────── */}
            <div style={{ marginTop: 40 }}>
                <p
                    style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#8888aa",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: 12,
                    }}
                >
                    Previous Uploads
                </p>
                <UploadHistory history={uploadHistory} />
            </div>
        </div>
    );
}
