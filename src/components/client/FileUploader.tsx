"use client";

import { useState, useRef, useCallback } from "react";
import { UploadCloud, Check } from "lucide-react";
import * as XLSX from "xlsx";

/* ── Types ────────────────────────────────────────────── */

type Stage = "idle" | "validating" | "ready" | "success";

interface ColResult {
    name: string;
    found: boolean;
    fix: string;
}

const REQUIRED_COLUMNS: { name: string; fix: string }[] = [
    { name: "GSTIN", fix: "Add a column named 'GSTIN' with your client GSTINs" },
    {
        name: "Invoice No",
        fix: "Add a column named 'Invoice No' with invoice numbers",
    },
    {
        name: "Taxable Value",
        fix: "Add 'Taxable Value' column (amount before GST)",
    },
    { name: "CGST", fix: "Add 'CGST' column or enter 0 for exempt items" },
    { name: "SGST", fix: "Add 'SGST' column or enter 0 for exempt items" },
    { name: "IGST", fix: "Add 'IGST' column or enter 0 for intra-state sales" },
];

const ACCEPT =
    ".xlsx,.csv,.pdf,.jpg,.jpeg,.png";

const SPREADSHEET_EXTS = ["xlsx", "csv"];
const TAG_LABELS = [".xlsx", ".csv", ".pdf", ".jpg", ".png"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

/* ── Helpers ──────────────────────────────────────────── */

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileExt(name: string): string {
    return name.split(".").pop()?.toLowerCase() ?? "";
}

/* ── Component ────────────────────────────────────────── */

export default function FileUploader() {
    const [stage, setStage] = useState<Stage>("idle");
    const [dragOver, setDragOver] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [colResults, setColResults] = useState<ColResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* ── File handling ───────────────────────────────── */

    const handleFile = useCallback(async (f: File) => {
        if (f.size > MAX_SIZE) {
            setError("File too large — max 10MB");
            setTimeout(() => setError(null), 3000);
            return;
        }

        setFile(f);
        const ext = fileExt(f.name);

        // PDF / image → skip validation, go straight to READY
        if (!SPREADSHEET_EXTS.includes(ext)) {
            setStage("ready");
            return;
        }

        // Excel / CSV → validate columns
        setStage("validating");

        const data = await f.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
            header: 1,
        });
        const headers = ((rows[0] as unknown) as string[]) ?? [];
        const headersLower = headers.map((h) =>
            typeof h === "string" ? h.toLowerCase().trim() : ""
        );

        const results: ColResult[] = REQUIRED_COLUMNS.map((col) => ({
            name: col.name,
            found: headersLower.includes(col.name.toLowerCase()),
            fix: col.fix,
        }));

        setColResults(results);
    }, []);

    const onDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
        },
        [handleFile]
    );

    const onSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
        },
        [handleFile]
    );

    const reset = () => {
        setStage("idle");
        setFile(null);
        setColResults([]);
        setError(null);
    };

    const allPassed = colResults.length > 0 && colResults.every((r) => r.found);

    /* ── IDLE STATE — Drop Zone ──────────────────────── */

    if (stage === "idle") {
        return (
            <>
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    onClick={() => inputRef.current?.click()}
                    style={{
                        border: dragOver ? "2px dashed #6366f1" : "2px dashed #2a2a3a",
                        background: dragOver ? "rgba(99,102,241,0.06)" : "#12121a",
                        borderRadius: 8,
                        padding: "48px 24px",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "border-color 150ms ease, background 150ms ease",
                    }}
                    className={dragOver ? "dropzone-pulse" : ""}
                >
                    <UploadCloud
                        size={32}
                        color="#8888aa"
                        style={{ marginBottom: 12 }}
                    />
                    <p style={{ fontSize: 16, color: "#f0f0ff", marginBottom: 4 }}>
                        Drag your file here or click to browse
                    </p>
                    <p style={{ fontSize: 13, color: "#8888aa", marginBottom: 16 }}>
                        Max 10MB · Excel, CSV, PDF, JPG, PNG
                    </p>

                    {/* File type tags */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 6,
                            flexWrap: "wrap",
                        }}
                    >
                        {TAG_LABELS.map((t) => (
                            <span
                                key={t}
                                style={{
                                    background: "#1a1a26",
                                    border: "1px solid #2a2a3a",
                                    borderRadius: 4,
                                    padding: "2px 8px",
                                    fontSize: 12,
                                    color: "#8888aa",
                                }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <input
                        ref={inputRef}
                        type="file"
                        accept={ACCEPT}
                        onChange={onSelect}
                        style={{ display: "none" }}
                    />
                </div>

                {/* Error toast */}
                {error && (
                    <div className="toast toast-error" style={{ zIndex: 1000 }}>
                        {error}
                    </div>
                )}
            </>
        );
    }

    /* ── VALIDATING STATE — Column Checker ───────────── */

    if (stage === "validating") {
        return (
            <div
                style={{
                    background: "#12121a",
                    border: "1px solid #2a2a3a",
                    borderRadius: 8,
                    padding: 16,
                }}
            >
                <p style={{ fontSize: 14, color: "#f0f0ff", marginBottom: 16 }}>
                    {file?.name}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {colResults.map((r, i) => (
                        <div
                            key={r.name}
                            className="validation-row"
                            style={{
                                animationDelay: `${i * 60}ms`,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    color: r.found ? "#10b981" : "#ef4444",
                                    fontSize: 14,
                                }}
                            >
                                <span>{r.found ? "✅" : "❌"}</span>
                                <span>{r.name}</span>
                            </div>
                            {!r.found && (
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "#ef4444",
                                        marginLeft: 28,
                                        marginTop: 2,
                                    }}
                                >
                                    {r.fix}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Result summary + action */}
                <div style={{ marginTop: 20 }}>
                    {allPassed ? (
                        <>
                            <p
                                style={{
                                    color: "#10b981",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    marginBottom: 12,
                                }}
                            >
                                All columns verified ✅
                            </p>
                            <button
                                className="btn-primary"
                                onClick={() => setStage("success")}
                                style={{ filter: "brightness(1)" }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.filter = "brightness(1.15)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.filter = "brightness(1)")
                                }
                            >
                                Upload File
                            </button>
                        </>
                    ) : (
                        <>
                            <p
                                style={{
                                    color: "#8888aa",
                                    fontSize: 13,
                                    marginBottom: 12,
                                }}
                            >
                                Fix the issues above, then re-upload
                            </p>
                            <button
                                className="btn-ghost"
                                onClick={() => setStage("success")}
                            >
                                Upload Anyway
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    /* ── READY STATE — Non-spreadsheet file ready ───── */

    if (stage === "ready") {
        return (
            <div
                style={{
                    background: "#12121a",
                    border: "1px solid #2a2a3a",
                    borderRadius: 8,
                    padding: 16,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#10b981",
                            display: "inline-block",
                        }}
                    />
                    <span style={{ fontSize: 14, color: "#f0f0ff" }}>
                        File ready to upload: {file?.name}
                    </span>
                </div>
                <div style={{ marginTop: 16 }}>
                    <button
                        className="btn-primary"
                        onClick={() => setStage("success")}
                        style={{ filter: "brightness(1)" }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.filter = "brightness(1.15)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.filter = "brightness(1)")
                        }
                    >
                        Upload File
                    </button>
                </div>
            </div>
        );
    }

    /* ── SUCCESS STATE ──────────────────────────────── */

    return (
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
            {/* Green checkmark circle */}
            <div
                className="success-checkmark"
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                }}
            >
                <Check size={32} color="#10b981" />
            </div>

            <p style={{ fontSize: 20, color: "#f0f0ff", fontWeight: 600 }}>
                Uploaded Successfully
            </p>
            <p style={{ fontSize: 13, color: "#8888aa", marginTop: 6 }}>
                {file?.name} · {file ? formatSize(file.size) : ""}
            </p>
            <p style={{ fontSize: 13, color: "#8888aa", marginTop: 2 }}>
                Uploaded just now
            </p>

            <button
                className="btn-ghost"
                onClick={reset}
                style={{ marginTop: 20 }}
            >
                Upload another file
            </button>
        </div>
    );
}
