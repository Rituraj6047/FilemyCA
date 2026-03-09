import Link from "next/link";
import { MessageSquare, FileX, Clock, Linkedin, Mail } from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#0a0a0f", minHeight: "100vh", color: "#f0f0ff", overflowX: "hidden" }}>
      {/* 1. NAV BAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1a1a26",
          height: "60px",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "16px", fontWeight: 700, color: "#f0f0ff" }}>FileMyCa</div>
        <a href="mailto:riturajsingh@email.com?subject=FileMyCa Demo Request" className="btn-primary">
          Book a Demo
        </a>
      </nav>

      {/* 2. HERO SECTION */}
      <section
        style={{
          height: "calc(100vh - 60px)",
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "0 48px",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 10 }}>
          {/* We use inline animations since arbitrary keyframes might not be in globals.css for staggered load */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes fadeUpIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .hero-stagger-1 { animation: fadeUpIn 0.8s ease forwards; animation-delay: 0ms; opacity: 0; }
            .hero-stagger-2 { animation: fadeUpIn 0.8s ease forwards; animation-delay: 150ms; opacity: 0; }
            .hero-stagger-3 { animation: fadeUpIn 0.8s ease forwards; animation-delay: 300ms; opacity: 0; }
          `}} />

          <div className="hero-stagger-1" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#6366f1", marginBottom: "16px", fontWeight: 600 }}>
            For CA Firms · India
          </div>
          <h1 className="hero-stagger-1" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: "#f0f0ff", lineHeight: 1.15, maxWidth: "720px", textAlign: "center" }}>
            Stop Chasing Clients on WhatsApp for GST Data
          </h1>
          <p className="hero-stagger-2" style={{ fontSize: "16px", color: "#8888aa", maxWidth: "560px", textAlign: "center", marginTop: "16px" }}>
            Replace the monthly chaos of missing columns, unreadable PDFs, and endless follow-ups with a single automated upload portal.
          </p>
          <div className="hero-stagger-3" style={{ marginTop: "36px", display: "flex", gap: "12px", justifyContent: "center" }}>
            <a href="mailto:riturajsingh@email.com?subject=FileMyCa Demo Request" className="btn-primary" style={{ padding: "14px 28px", fontSize: "16px" }}>
              Book a 15-Min Demo
            </a>
            <a href="#how-it-works" className="btn-ghost" style={{ padding: "14px 28px", fontSize: "16px", border: "1px solid #2a2a3a" }}>
              See How It Works
            </a>
          </div>
        </div>

        {/* Faint horizontal rule at bottom of hero */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #1a1a26" }}></div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section style={{ padding: "96px 48px", maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#6366f1", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "16px" }}>
            The Problem
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#f0f0ff", textAlign: "center", marginBottom: "48px" }}>
            Every month, the same chaos
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", width: "100%" }}>
            {[
              { icon: <MessageSquare size={24} color="#6366f1" />, title: "Midnight WhatsApp messages", body: "Clients send photos of bills at 11 PM. Your staff spends the first week of every month decoding blurry images and chasing incomplete data." },
              { icon: <FileX size={24} color="#6366f1" />, title: "Wrong formats, missing columns", body: "Every client sends data differently. Sales registers in different layouts, missing GSTIN columns, PDF screenshots instead of Excel files." },
              { icon: <Clock size={24} color="#6366f1" />, title: "3–5 days lost before filing starts", body: "Your team can't start filing until all client data is in. Data collection delays push everything to the last hour before the 11th deadline." }
            ].map((card, idx) => (
              <div key={idx} style={{ background: "#12121a", border: "1px solid #1a1a26", borderRadius: "12px", padding: "28px" }}>
                <div>{card.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f0f0ff", marginTop: "16px" }}>{card.title}</h3>
                <p style={{ fontSize: "14px", color: "#8888aa", lineHeight: 1.6, marginTop: "8px" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" style={{ padding: "96px 48px", maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#6366f1", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "16px" }}>
            The Solution
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#f0f0ff", textAlign: "center", marginBottom: "64px" }}>
            Replace WhatsApp chaos with a structured portal
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", width: "100%" }}>
            {[
              { num: "01", title: "Client gets a portal link", body: "You share a unique upload link with each MSME client. No app download, no password — just click and upload." },
              { num: "02", title: "Client uploads their data", body: "Clients drag-and-drop their sales register. The portal instantly checks for required GST columns and flags errors before submission." },
              { num: "03", title: "You see everything in one dashboard", body: "Track who's submitted, who's pending, and who's overdue. Send WhatsApp reminders to all pending clients in one click." }
            ].map((step, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a26", lineHeight: 1 }}>{step.num}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f0f0ff", marginTop: "16px" }}>{step.title}</h3>
                <p style={{ fontSize: "14px", color: "#8888aa", lineHeight: 1.6, marginTop: "8px", flex: 1 }}>{step.body}</p>
                {idx < 2 && (
                  <div style={{ borderTop: "1px dashed #2a2a3a", marginTop: "24px" }} className="solution-connector"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DASHBOARD PREVIEW SECTION */}
      <section style={{ padding: "96px 48px", maxWidth: "1080px", margin: "0 auto" }}>
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#f0f0ff", textAlign: "center", marginBottom: "16px" }}>
            One dashboard. Every client. Every deadline.
          </h2>
          <p style={{ fontSize: "16px", color: "#8888aa", textAlign: "center", maxWidth: "480px", margin: "0 auto 40px" }}>
            Get a birds-eye view of your entire GST compliance workflow. Stop guessing who has sent what.
          </p>

          <div style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: "12px", padding: "32px", maxWidth: "860px", margin: "0 auto", overflowX: "auto" }}>

            {/* 4 Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(140px, 1fr))", gap: "16px", marginBottom: "32px" }}>
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "11px", color: "#8888aa", textTransform: "uppercase", fontWeight: 500 }}>Total Clients</div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#f0f0ff", marginTop: "8px" }}>47</div>
              </div>
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "11px", color: "#8888aa", textTransform: "uppercase", fontWeight: 500 }}>Submitted</div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#10b981", marginTop: "8px" }}>31</div>
              </div>
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "11px", color: "#8888aa", textTransform: "uppercase", fontWeight: 500 }}>Pending</div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#f59e0b", marginTop: "8px" }}>10</div>
              </div>
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "11px", color: "#8888aa", textTransform: "uppercase", fontWeight: 500 }}>Days Left</div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#f0f0ff", marginTop: "8px" }}>6</div>
              </div>
            </div>

            {/* Table Mockup */}
            <div style={{ background: "#1a1a26", borderRadius: "8px", border: "1px solid #2a2a3a", overflow: "hidden" }}>
              <table className="data-table" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                  <tr>
                    <th style={{ width: "50px" }}>#</th>
                    <th>Client</th>
                    <th>GSTIN</th>
                    <th>Status</th>
                    <th>Last Upload</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "1", client: "Patel Traders", gstin: "27AABCP...A1Z5", status: "Filed", badgeClass: "badge badge-filed", lastUpload: "5 Mar 2026" },
                    { id: "2", client: "Mehta Textiles", gstin: "24AADCM...B1Z3", status: "Filed", badgeClass: "badge badge-filed", lastUpload: "4 Mar 2026" },
                    { id: "3", client: "Singh Electronics", gstin: "07AAUCS...C1Z1", status: "Pending", badgeClass: "badge badge-pending", lastUpload: "—" },
                    { id: "4", client: "Gupta Pharma", gstin: "09AAACG...D1Z7", status: "Pending", badgeClass: "badge badge-pending", lastUpload: "—" },
                    { id: "5", client: "Joshi Exports", gstin: "27AAEFJ...E1Z9", status: "Overdue", badgeClass: "badge badge-overdue", lastUpload: "—" },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < 4 ? "1px solid #2a2a3a" : "none" }}>
                      <td style={{ color: "#8888aa", padding: "14px 16px" }}>{row.id}</td>
                      <td style={{ fontWeight: 500, color: "#f0f0ff", padding: "14px 16px" }}>{row.client}</td>
                      <td style={{ color: "#8888aa", fontFamily: "monospace", padding: "14px 16px" }}>{row.gstin}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span className={row.badgeClass}>
                          {row.status === "Filed" && "✅"}
                          {row.status === "Pending" && "🟡"}
                          {row.status === "Overdue" && "🔴"}
                          {" "}{row.status}
                        </span>
                      </td>
                      <td style={{ color: "#8888aa", padding: "14px 16px" }}>{row.lastUpload}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF SECTION */}
      <section style={{ backgroundColor: "#12121a", padding: "96px 48px", width: "100%" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#f0f0ff", marginBottom: "16px" }}>
            Built for CA firms managing 50+ MSME clients
          </h2>
          <div style={{ fontSize: "14px", color: "#8888aa" }}>
            Sharma & Associates · Mehta & Co. · Patel Tax Consultants
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section style={{
        backgroundColor: "rgba(99,102,241,0.06)",
        borderTop: "1px solid rgba(99,102,241,0.2)",
        borderBottom: "1px solid rgba(99,102,241,0.2)",
        padding: "96px 48px"
      }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#f0f0ff", marginBottom: "16px" }}>
            Ready to stop the chaos?
          </h2>
          <p style={{ fontSize: "16px", color: "#8888aa", maxWidth: "400px", marginBottom: "32px" }}>
            Start collecting GST data cleanly and securely in under 5 minutes.
          </p>
          <a href="mailto:riturajsingh@email.com?subject=FileMyCa Demo Request" className="btn-primary" style={{ fontSize: "16px", padding: "14px 32px" }}>
            Book a Free Demo Call
          </a>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer style={{ backgroundColor: "#0a0a0f", borderTop: "1px solid #1a1a26", padding: "32px 48px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "#f0f0ff" }}>FileMyCa</div>
            <div style={{ fontSize: "14px", color: "#8888aa", marginTop: "4px" }}>A product by Rituraj Singh</div>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="https://linkedin.com/in/riturajsingh" target="_blank" rel="noopener noreferrer" style={{ color: "#8888aa", transition: "color 0.15s ease", display: "block" }} className="hover-text-primary">
              <Linkedin size={18} />
            </a>
            <a href="mailto:riturajsingh@email.com" style={{ color: "#8888aa", transition: "color 0.15s ease", display: "block" }} className="hover-text-primary">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* Hide solution connector on small screens with CSS since grid turns to single column */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .solution-connector { display: none !important; }
        }
      `}} />
    </div>
  );
}
