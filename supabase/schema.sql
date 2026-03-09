-- =====================================================
-- FileMyCa — Database Schema
-- Run this in Supabase SQL Editor to create all tables
-- =====================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Table: firms ──────────────────────────────────────
CREATE TABLE firms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  owner_email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Table: clients ────────────────────────────────────
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firm_id UUID NOT NULL REFERENCES firms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  gstin TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_clients_firm_id ON clients(firm_id);
CREATE INDEX idx_clients_gstin ON clients(gstin);

-- ── Table: filing_periods ─────────────────────────────
CREATE TABLE filing_periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firm_id UUID NOT NULL REFERENCES firms(id) ON DELETE CASCADE,
  return_type TEXT NOT NULL CHECK (return_type IN ('GSTR-1', 'GSTR-3B')),
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  year INT NOT NULL,
  deadline_date DATE NOT NULL
);

CREATE INDEX idx_filing_periods_firm_id ON filing_periods(firm_id);

-- ── Table: client_filing_status ───────────────────────
CREATE TABLE client_filing_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  filing_period_id UUID NOT NULL REFERENCES filing_periods(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'Pending'
    CHECK (status IN ('Pending', 'Data Received', 'Verified', 'Filed', 'Overdue')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(client_id, filing_period_id)
);

CREATE INDEX idx_cfs_client_id ON client_filing_status(client_id);
CREATE INDEX idx_cfs_filing_period_id ON client_filing_status(filing_period_id);
CREATE INDEX idx_cfs_status ON client_filing_status(status);

-- ── Table: uploads ────────────────────────────────────
CREATE TABLE uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  filing_period_id UUID NOT NULL REFERENCES filing_periods(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT,
  validation_status JSONB DEFAULT '{}',
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_uploads_client_id ON uploads(client_id);
CREATE INDEX idx_uploads_filing_period_id ON uploads(filing_period_id);

-- ── Row Level Security ────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE filing_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_filing_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

-- Firms: owner can see/modify their own firm
CREATE POLICY "Firm owners can view own firm"
  ON firms FOR SELECT
  USING (owner_email = auth.jwt() ->> 'email');

CREATE POLICY "Firm owners can update own firm"
  ON firms FOR UPDATE
  USING (owner_email = auth.jwt() ->> 'email');

-- Clients: firm members can see clients belonging to their firm
CREATE POLICY "Firm members can view own clients"
  ON clients FOR SELECT
  USING (
    firm_id IN (
      SELECT id FROM firms WHERE owner_email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Firm members can insert clients"
  ON clients FOR INSERT
  WITH CHECK (
    firm_id IN (
      SELECT id FROM firms WHERE owner_email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Firm members can update own clients"
  ON clients FOR UPDATE
  USING (
    firm_id IN (
      SELECT id FROM firms WHERE owner_email = auth.jwt() ->> 'email'
    )
  );

-- Filing periods: firm members can manage their own periods
CREATE POLICY "Firm members can view own filing periods"
  ON filing_periods FOR SELECT
  USING (
    firm_id IN (
      SELECT id FROM firms WHERE owner_email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Firm members can insert filing periods"
  ON filing_periods FOR INSERT
  WITH CHECK (
    firm_id IN (
      SELECT id FROM firms WHERE owner_email = auth.jwt() ->> 'email'
    )
  );

-- Client filing status: accessible via client's firm
CREATE POLICY "Firm members can view client filing status"
  ON client_filing_status FOR SELECT
  USING (
    client_id IN (
      SELECT c.id FROM clients c
      JOIN firms f ON c.firm_id = f.id
      WHERE f.owner_email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Firm members can update client filing status"
  ON client_filing_status FOR UPDATE
  USING (
    client_id IN (
      SELECT c.id FROM clients c
      JOIN firms f ON c.firm_id = f.id
      WHERE f.owner_email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Firm members can insert client filing status"
  ON client_filing_status FOR INSERT
  WITH CHECK (
    client_id IN (
      SELECT c.id FROM clients c
      JOIN firms f ON c.firm_id = f.id
      WHERE f.owner_email = auth.jwt() ->> 'email'
    )
  );

-- Uploads: accessible via client's firm
CREATE POLICY "Firm members can view uploads"
  ON uploads FOR SELECT
  USING (
    client_id IN (
      SELECT c.id FROM clients c
      JOIN firms f ON c.firm_id = f.id
      WHERE f.owner_email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Firm members can insert uploads"
  ON uploads FOR INSERT
  WITH CHECK (
    client_id IN (
      SELECT c.id FROM clients c
      JOIN firms f ON c.firm_id = f.id
      WHERE f.owner_email = auth.jwt() ->> 'email'
    )
  );
