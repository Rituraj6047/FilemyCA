-- =====================================================
-- FileMyCa — Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- =====================================================

-- ── Fixed UUIDs for consistency across seeds ─────────
-- Firm
-- firm_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

-- Filing periods (must be valid hex-only UUIDs)
-- jan_2026: '00000000-0000-0000-0000-00000000aaa1'
-- feb_2026: '00000000-0000-0000-0000-00000000bbb2'
-- mar_2026: '00000000-0000-0000-0000-00000000ccc3'

-- ── Insert Firm ───────────────────────────────────────
INSERT INTO firms (id, name, logo_url, owner_email) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sharma & Associates', NULL, 'ca.sharma@example.com');

-- ── Insert 47 Clients ─────────────────────────────────
-- GSTINs follow Indian format: [2-digit state][10-char PAN-format][1Z][1 alphanumeric]
-- PAN format: AAAAA9999A (5 letters, 4 digits, 1 letter)

INSERT INTO clients (id, firm_id, name, gstin, email, phone) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Patel Traders', '27AABCP1234A1Z5', 'patel.traders@email.com', '9876543210'),
  ('c0000002-0000-0000-0000-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Mehta Textiles', '27AADCM5678B1Z3', 'mehta.textiles@email.com', '9876543211'),
  ('c0000003-0000-0000-0000-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Singh Electronics', '07BBAPS9012C1Z8', 'singh.electronics@email.com', '9876543212'),
  ('c0000004-0000-0000-0000-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Gupta Hardware', '09AADCG3456D1Z1', 'gupta.hardware@email.com', '9876543213'),
  ('c0000005-0000-0000-0000-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Joshi Pharmaceuticals', '27AABFJ7890E1Z6', 'joshi.pharma@email.com', '9876543214'),
  ('c0000006-0000-0000-0000-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Kumar Auto Parts', '29BBBPK1234F1Z4', 'kumar.autoparts@email.com', '9876543215'),
  ('c0000007-0000-0000-0000-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Reddy Constructions', '36AADCR5678G1Z2', 'reddy.constructions@email.com', '9876543216'),
  ('c0000008-0000-0000-0000-000000000008', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sharma Steel Works', '27AABCS9012H1Z9', 'sharma.steel@email.com', '9876543217'),
  ('c0000009-0000-0000-0000-000000000009', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Deshmukh Packaging', '27AACDD3456J1Z7', 'deshmukh.packaging@email.com', '9876543218'),
  ('c0000010-0000-0000-0000-000000000010', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Agarwal Sweets', '09AAECA7890K1Z5', 'agarwal.sweets@email.com', '9876543219'),
  ('c0000011-0000-0000-0000-000000000011', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Mishra Transport', '33AADCM1234L1Z3', 'mishra.transport@email.com', '9876543220'),
  ('c0000012-0000-0000-0000-000000000012', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Verma Chemicals', '27AABCV5678M1Z1', 'verma.chemicals@email.com', '9876543221'),
  ('c0000013-0000-0000-0000-000000000013', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Tiwari Garments', '09AADCT9012N1Z8', 'tiwari.garments@email.com', '9876543222'),
  ('c0000014-0000-0000-0000-000000000014', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Chopra Furniture', '06AABFC3456P1Z6', 'chopra.furniture@email.com', '9876543223'),
  ('c0000015-0000-0000-0000-000000000015', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Soni Jewellers', '08BBBPS7890Q1Z4', 'soni.jewellers@email.com', '9876543224'),
  ('c0000016-0000-0000-0000-000000000016', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Nair Spices', '32AADCN1234R1Z2', 'nair.spices@email.com', '9876543225'),
  ('c0000017-0000-0000-0000-000000000017', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Yadav Dairy', '09AABCY5678S1Z9', 'yadav.dairy@email.com', '9876543226'),
  ('c0000018-0000-0000-0000-000000000018', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Pandey Book Store', '27AACFP9012T1Z7', 'pandey.books@email.com', '9876543227'),
  ('c0000019-0000-0000-0000-000000000019', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Saxena Plastics', '09BBAPS3456U1Z5', 'saxena.plastics@email.com', '9876543228'),
  ('c0000020-0000-0000-0000-000000000020', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Iyer IT Solutions', '33AADCI7890V1Z3', 'iyer.itsolutions@email.com', '9876543229'),
  ('c0000021-0000-0000-0000-000000000021', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Bansal Rice Mill', '06AABFB1234W1Z1', 'bansal.ricemill@email.com', '9876543230'),
  ('c0000022-0000-0000-0000-000000000022', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Choudhary Ceramics', '08AACDC5678X1Z8', 'choudhary.ceramics@email.com', '9876543231'),
  ('c0000023-0000-0000-0000-000000000023', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Kapoor Cosmetics', '27BBBPK9012Y1Z6', 'kapoor.cosmetics@email.com', '9876543232'),
  ('c0000024-0000-0000-0000-000000000024', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Malhotra Imports', '07AADCM3456Z1Z4', 'malhotra.imports@email.com', '9876543233'),
  ('c0000025-0000-0000-0000-000000000025', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Bhatia Medical', '27AABFB7890A2Z2', 'bhatia.medical@email.com', '9876543234'),
  ('c0000026-0000-0000-0000-000000000026', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Pillai Fisheries', '32AACFP1234B2Z9', 'pillai.fisheries@email.com', '9876543235'),
  ('c0000027-0000-0000-0000-000000000027', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Dutta Tea Estate', '19BBAPD5678C2Z7', 'dutta.tea@email.com', '9876543236'),
  ('c0000028-0000-0000-0000-000000000028', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Oberoi Hospitality', '07AADCO9012D2Z5', 'oberoi.hospitality@email.com', '9876543237'),
  ('c0000029-0000-0000-0000-000000000029', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sethi Logistics', '06AABFS3456E2Z3', 'sethi.logistics@email.com', '9876543238'),
  ('c0000030-0000-0000-0000-000000000030', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Rathi Cotton Mills', '08BBBPR7890F2Z1', 'rathi.cotton@email.com', '9876543239'),
  ('c0000031-0000-0000-0000-000000000031', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Mukherjee Printing', '19AADCM1234G2Z8', 'mukherjee.printing@email.com', '9876543240'),
  ('c0000032-0000-0000-0000-000000000032', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Chauhan Agro', '08AABFC5678H2Z6', 'chauhan.agro@email.com', '9876543241'),
  ('c0000033-0000-0000-0000-000000000033', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Bhatt Electricals', '24AACFB9012J2Z4', 'bhatt.electricals@email.com', '9876543242'),
  ('c0000034-0000-0000-0000-000000000034', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Kulkarni Engineering', '27BBAPK3456K2Z2', 'kulkarni.engg@email.com', '9876543243'),
  ('c0000035-0000-0000-0000-000000000035', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Jain Optical', '08AADCJ7890L2Z9', 'jain.optical@email.com', '9876543244'),
  ('c0000036-0000-0000-0000-000000000036', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Menon Rubber Works', '32AABFM1234M2Z7', 'menon.rubber@email.com', '9876543245'),
  ('c0000037-0000-0000-0000-000000000037', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sengupta Exports', '19AACFS5678N2Z5', 'sengupta.exports@email.com', '9876543246'),
  ('c0000038-0000-0000-0000-000000000038', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Thakur Handicrafts', '02BBAPS9012P2Z3', 'thakur.handicrafts@email.com', '9876543247'),
  ('c0000039-0000-0000-0000-000000000039', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Bajaj Automobiles', '27AADCB3456Q2Z1', 'bajaj.automobiles@email.com', '9876543248'),
  ('c0000040-0000-0000-0000-000000000040', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Goyal Stationery', '06AABFG7890R2Z8', 'goyal.stationery@email.com', '9876543249'),
  ('c0000041-0000-0000-0000-000000000041', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Rastogi Paints', '09AACFR1234S2Z6', 'rastogi.paints@email.com', '9876543250'),
  ('c0000042-0000-0000-0000-000000000042', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Maheshwari Fabrics', '08BBAPM5678T2Z4', 'maheshwari.fabrics@email.com', '9876543251'),
  ('c0000043-0000-0000-0000-000000000043', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Srinivasan Silks', '33AADCS9012U2Z2', 'srinivasan.silks@email.com', '9876543252'),
  ('c0000044-0000-0000-0000-000000000044', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Kashyap General Store', '02AABFK3456V2Z9', 'kashyap.store@email.com', '9876543253'),
  ('c0000045-0000-0000-0000-000000000045', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Bose Instruments', '19AACFB7890W2Z7', 'bose.instruments@email.com', '9876543254'),
  ('c0000046-0000-0000-0000-000000000046', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ahuja Electronics', '06BBAQA1234X2Z5', 'ahuja.electronics@email.com', '9876543255'),
  ('c0000047-0000-0000-0000-000000000047', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Khandelwal Marbles', '08AADCK5678Y2Z3', 'khandelwal.marbles@email.com', '9876543256');

-- ── Insert 3 Filing Periods (GSTR-1) ─────────────────
-- GSTR-1 deadlines: 11th of the following month
INSERT INTO filing_periods (id, firm_id, return_type, month, year, deadline_date) VALUES
  ('00000000-0000-0000-0000-00000000aaa1', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'GSTR-1', 1, 2026, '2026-02-11'),
  ('00000000-0000-0000-0000-00000000bbb2', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'GSTR-1', 2, 2026, '2026-03-11'),
  ('00000000-0000-0000-0000-00000000ccc3', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'GSTR-1', 3, 2026, '2026-04-11');

-- ── Insert Client Filing Statuses ─────────────────────
-- Jan 2026: All filed (past month) — 47 Filed
-- Feb 2026 (current-ish): Mix — 31 Data Received, 10 Pending, 6 Overdue
-- Mar 2026 (upcoming): All Pending — 47 Pending

-- Jan 2026: All 47 clients Filed
INSERT INTO client_filing_status (client_id, filing_period_id, status, updated_at)
SELECT id, '00000000-0000-0000-0000-00000000aaa1', 'Filed', '2026-02-08T10:00:00+05:30'
FROM clients WHERE firm_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

-- Feb 2026: Clients 1-31 → Data Received
INSERT INTO client_filing_status (client_id, filing_period_id, status, updated_at) VALUES
  ('c0000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-02T09:15:00+05:30'),
  ('c0000002-0000-0000-0000-000000000002', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-01T14:30:00+05:30'),
  ('c0000003-0000-0000-0000-000000000003', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-03T11:00:00+05:30'),
  ('c0000004-0000-0000-0000-000000000004', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-02-28T16:45:00+05:30'),
  ('c0000005-0000-0000-0000-000000000005', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-04T08:20:00+05:30'),
  ('c0000006-0000-0000-0000-000000000006', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-01T10:10:00+05:30'),
  ('c0000007-0000-0000-0000-000000000007', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-02T13:25:00+05:30'),
  ('c0000008-0000-0000-0000-000000000008', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-05T09:00:00+05:30'),
  ('c0000009-0000-0000-0000-000000000009', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-02-27T15:30:00+05:30'),
  ('c0000010-0000-0000-0000-000000000010', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-03T17:45:00+05:30'),
  ('c0000011-0000-0000-0000-000000000011', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-01T08:50:00+05:30'),
  ('c0000012-0000-0000-0000-000000000012', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-04T12:15:00+05:30'),
  ('c0000013-0000-0000-0000-000000000013', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-02-26T14:00:00+05:30'),
  ('c0000014-0000-0000-0000-000000000014', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-02T10:30:00+05:30'),
  ('c0000015-0000-0000-0000-000000000015', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-05T11:20:00+05:30'),
  ('c0000016-0000-0000-0000-000000000016', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-01T16:00:00+05:30'),
  ('c0000017-0000-0000-0000-000000000017', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-03T09:45:00+05:30'),
  ('c0000018-0000-0000-0000-000000000018', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-02-28T13:10:00+05:30'),
  ('c0000019-0000-0000-0000-000000000019', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-04T15:30:00+05:30'),
  ('c0000020-0000-0000-0000-000000000020', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-02T08:00:00+05:30'),
  ('c0000021-0000-0000-0000-000000000021', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-01T11:45:00+05:30'),
  ('c0000022-0000-0000-0000-000000000022', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-05T14:20:00+05:30'),
  ('c0000023-0000-0000-0000-000000000023', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-03T16:30:00+05:30'),
  ('c0000024-0000-0000-0000-000000000024', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-02-27T09:00:00+05:30'),
  ('c0000025-0000-0000-0000-000000000025', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-04T10:45:00+05:30'),
  ('c0000026-0000-0000-0000-000000000026', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-01T13:00:00+05:30'),
  ('c0000027-0000-0000-0000-000000000027', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-02T17:15:00+05:30'),
  ('c0000028-0000-0000-0000-000000000028', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-05T08:30:00+05:30'),
  ('c0000029-0000-0000-0000-000000000029', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-02-26T11:00:00+05:30'),
  ('c0000030-0000-0000-0000-000000000030', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-03T14:45:00+05:30'),
  ('c0000031-0000-0000-0000-000000000031', '00000000-0000-0000-0000-00000000bbb2', 'Data Received', '2026-03-04T09:30:00+05:30');

-- Feb 2026: Clients 32-41 → Pending
INSERT INTO client_filing_status (client_id, filing_period_id, status, updated_at) VALUES
  ('c0000032-0000-0000-0000-000000000032', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30'),
  ('c0000033-0000-0000-0000-000000000033', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30'),
  ('c0000034-0000-0000-0000-000000000034', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30'),
  ('c0000035-0000-0000-0000-000000000035', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30'),
  ('c0000036-0000-0000-0000-000000000036', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30'),
  ('c0000037-0000-0000-0000-000000000037', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30'),
  ('c0000038-0000-0000-0000-000000000038', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30'),
  ('c0000039-0000-0000-0000-000000000039', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30'),
  ('c0000040-0000-0000-0000-000000000040', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30'),
  ('c0000041-0000-0000-0000-000000000041', '00000000-0000-0000-0000-00000000bbb2', 'Pending', '2026-03-01T00:00:00+05:30');

-- Feb 2026: Clients 42-47 → Overdue
INSERT INTO client_filing_status (client_id, filing_period_id, status, updated_at) VALUES
  ('c0000042-0000-0000-0000-000000000042', '00000000-0000-0000-0000-00000000bbb2', 'Overdue', '2026-03-06T00:00:00+05:30'),
  ('c0000043-0000-0000-0000-000000000043', '00000000-0000-0000-0000-00000000bbb2', 'Overdue', '2026-03-06T00:00:00+05:30'),
  ('c0000044-0000-0000-0000-000000000044', '00000000-0000-0000-0000-00000000bbb2', 'Overdue', '2026-03-06T00:00:00+05:30'),
  ('c0000045-0000-0000-0000-000000000045', '00000000-0000-0000-0000-00000000bbb2', 'Overdue', '2026-03-06T00:00:00+05:30'),
  ('c0000046-0000-0000-0000-000000000046', '00000000-0000-0000-0000-00000000bbb2', 'Overdue', '2026-03-06T00:00:00+05:30'),
  ('c0000047-0000-0000-0000-000000000047', '00000000-0000-0000-0000-00000000bbb2', 'Overdue', '2026-03-06T00:00:00+05:30');

-- Mar 2026: All 47 clients Pending (upcoming)
INSERT INTO client_filing_status (client_id, filing_period_id, status, updated_at)
SELECT id, '00000000-0000-0000-0000-00000000ccc3', 'Pending', '2026-03-06T00:00:00+05:30'
FROM clients WHERE firm_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

-- ── Insert Sample Upload Records (2 per demo client) ──
-- For clients 1 and 2 in Jan 2026 period
INSERT INTO uploads (client_id, filing_period_id, file_name, file_url, file_size, validation_status, uploaded_at) VALUES
  ('c0000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-00000000aaa1', 'patel_traders_sales_jan2026.xlsx', '/uploads/patel_traders_sales_jan2026.xlsx', 245760, '{"invoice_number": true, "date": true, "taxable_value": true, "igst": true, "cgst": true, "sgst": true}', '2026-02-05T10:30:00+05:30'),
  ('c0000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-00000000aaa1', 'patel_traders_purchase_jan2026.csv', '/uploads/patel_traders_purchase_jan2026.csv', 128000, '{"invoice_number": true, "date": true, "taxable_value": true, "igst": false, "cgst": true, "sgst": true}', '2026-02-05T10:45:00+05:30'),
  ('c0000002-0000-0000-0000-000000000002', '00000000-0000-0000-0000-00000000aaa1', 'mehta_textiles_sales_jan2026.xlsx', '/uploads/mehta_textiles_sales_jan2026.xlsx', 312000, '{"invoice_number": true, "date": true, "taxable_value": true, "igst": true, "cgst": true, "sgst": true}', '2026-02-04T14:15:00+05:30'),
  ('c0000002-0000-0000-0000-000000000002', '00000000-0000-0000-0000-00000000aaa1', 'mehta_textiles_purchase_jan2026.xlsx', '/uploads/mehta_textiles_purchase_jan2026.xlsx', 198000, '{"invoice_number": true, "date": true, "taxable_value": true, "igst": true, "cgst": true, "sgst": true}', '2026-02-04T14:30:00+05:30');
