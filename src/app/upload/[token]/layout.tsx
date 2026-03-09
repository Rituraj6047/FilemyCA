export default function ClientUploadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
            {/* ── Top Bar ──────────────────────────────────── */}
            <header
                style={{
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px',
                    borderBottom: '1px solid #1a1a26',
                    background: '#0a0a0f',
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: '#f0f0ff',
                            lineHeight: 1,
                        }}
                    >
                        FileMyCa
                    </div>
                    <div
                        style={{
                            fontSize: 11,
                            color: '#8888aa',
                            marginTop: 2,
                        }}
                    >
                        Sharma &amp; Associates
                    </div>
                </div>
            </header>

            {/* ── Centered Content Container ───────────────── */}
            <main
                style={{
                    maxWidth: 720,
                    margin: '0 auto',
                    padding: '40px 24px',
                }}
            >
                {children}
            </main>
        </div>
    );
}
