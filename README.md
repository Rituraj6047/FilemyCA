# FileMyCa — GST Data Collection SaaS

> A structured, deadline-aware upload portal for Indian CA firms. Replaces the monthly WhatsApp chaos of chasing MSME clients for GST data.

**Solo-built in 5 days. Currently live at [https://filemy-ca.vercel.app/admin/dashboard]

---

## What It Does

**CA Firm Admin** gets a dashboard to track all their MSME clients:
- Live status tracking (Pending / Data Received / Verified / Filed / Overdue)
- Submission rate chart, deadline countdown, filterable client table
- Reminder system with WhatsApp/email template preview and bulk send

**MSME Client** gets a clean upload portal via unique link:
- Deadline countdown banner
- Drag-drop file upload (.xlsx, .csv, .pdf, .jpg, .png)
- SheetJS Excel validation (checks 6 required GST columns)
- Upload history table

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Database | Supabase (PostgreSQL + Storage) |
| Excel Parsing | SheetJS |
| Charts | Recharts |
| Icons | lucide-react |
| Styling | Custom CSS design system (no Tailwind) |
| Deployment | Vercel |

---

## Screens

- `/` — Public landing page
- `/admin/dashboard` — CA firm dashboard
- `/upload/demo` — MSME client upload portal (demo token)
- `/admin/reminders` — Reminder history log

---

## Local Setup
```bash
git clone https://github.com/Rituraj6047/FilemyCA
cd FilemyCA
npm install
# Add your Supabase keys to .env.local
npm run dev
```

---

Built by [Rituraj Singh](https://linkedin.com/in/rituraj-singh-b19119290)
