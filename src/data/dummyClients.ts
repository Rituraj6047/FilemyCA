// =====================================================
// FileMyCa — Dummy Client Data (hardcoded for Day 2)
// Extracted from supabase/seed.sql
// =====================================================

export type ClientStatus = 'Pending' | 'Data Received' | 'Verified' | 'Filed' | 'Overdue';

export interface Upload {
    fileName: string;
    fileSize: number;
    uploadDate: string;
}

export interface Client {
    id: string;
    name: string;
    gstin: string;
    email: string;
    phone: string;
    status: ClientStatus;
    lastUpload: string | null;
    uploads: Upload[];
}

export const dummyClients: Client[] = [
    { id: 'c001', name: 'Patel Traders', gstin: '27AABCP1234A1Z5', email: 'patel.traders@email.com', phone: '9876543210', status: 'Data Received', lastUpload: '2026-03-02', uploads: [{ fileName: 'patel_traders_sales_jan2026.xlsx', fileSize: 245760, uploadDate: '2026-02-05' }, { fileName: 'patel_traders_purchase_jan2026.csv', fileSize: 128000, uploadDate: '2026-02-05' }] },
    { id: 'c002', name: 'Mehta Textiles', gstin: '27AADCM5678B1Z3', email: 'mehta.textiles@email.com', phone: '9876543211', status: 'Data Received', lastUpload: '2026-03-01', uploads: [{ fileName: 'mehta_textiles_sales_jan2026.xlsx', fileSize: 312000, uploadDate: '2026-02-04' }, { fileName: 'mehta_textiles_purchase_jan2026.xlsx', fileSize: 198000, uploadDate: '2026-02-04' }] },
    { id: 'c003', name: 'Singh Electronics', gstin: '07BBAPS9012C1Z8', email: 'singh.electronics@email.com', phone: '9876543212', status: 'Data Received', lastUpload: '2026-03-03', uploads: [] },
    { id: 'c004', name: 'Gupta Hardware', gstin: '09AADCG3456D1Z1', email: 'gupta.hardware@email.com', phone: '9876543213', status: 'Data Received', lastUpload: '2026-02-28', uploads: [] },
    { id: 'c005', name: 'Joshi Pharmaceuticals', gstin: '27AABFJ7890E1Z6', email: 'joshi.pharma@email.com', phone: '9876543214', status: 'Data Received', lastUpload: '2026-03-04', uploads: [] },
    { id: 'c006', name: 'Kumar Auto Parts', gstin: '29BBBPK1234F1Z4', email: 'kumar.autoparts@email.com', phone: '9876543215', status: 'Data Received', lastUpload: '2026-03-01', uploads: [] },
    { id: 'c007', name: 'Reddy Constructions', gstin: '36AADCR5678G1Z2', email: 'reddy.constructions@email.com', phone: '9876543216', status: 'Data Received', lastUpload: '2026-03-02', uploads: [] },
    { id: 'c008', name: 'Sharma Steel Works', gstin: '27AABCS9012H1Z9', email: 'sharma.steel@email.com', phone: '9876543217', status: 'Data Received', lastUpload: '2026-03-05', uploads: [] },
    { id: 'c009', name: 'Deshmukh Packaging', gstin: '27AACDD3456J1Z7', email: 'deshmukh.packaging@email.com', phone: '9876543218', status: 'Data Received', lastUpload: '2026-02-27', uploads: [] },
    { id: 'c010', name: 'Agarwal Sweets', gstin: '09AAECA7890K1Z5', email: 'agarwal.sweets@email.com', phone: '9876543219', status: 'Data Received', lastUpload: '2026-03-03', uploads: [] },
    { id: 'c011', name: 'Mishra Transport', gstin: '33AADCM1234L1Z3', email: 'mishra.transport@email.com', phone: '9876543220', status: 'Data Received', lastUpload: '2026-03-01', uploads: [] },
    { id: 'c012', name: 'Verma Chemicals', gstin: '27AABCV5678M1Z1', email: 'verma.chemicals@email.com', phone: '9876543221', status: 'Data Received', lastUpload: '2026-03-04', uploads: [] },
    { id: 'c013', name: 'Tiwari Garments', gstin: '09AADCT9012N1Z8', email: 'tiwari.garments@email.com', phone: '9876543222', status: 'Data Received', lastUpload: '2026-02-26', uploads: [] },
    { id: 'c014', name: 'Chopra Furniture', gstin: '06AABFC3456P1Z6', email: 'chopra.furniture@email.com', phone: '9876543223', status: 'Data Received', lastUpload: '2026-03-02', uploads: [] },
    { id: 'c015', name: 'Soni Jewellers', gstin: '08BBBPS7890Q1Z4', email: 'soni.jewellers@email.com', phone: '9876543224', status: 'Data Received', lastUpload: '2026-03-05', uploads: [] },
    { id: 'c016', name: 'Nair Spices', gstin: '32AADCN1234R1Z2', email: 'nair.spices@email.com', phone: '9876543225', status: 'Data Received', lastUpload: '2026-03-01', uploads: [] },
    { id: 'c017', name: 'Yadav Dairy', gstin: '09AABCY5678S1Z9', email: 'yadav.dairy@email.com', phone: '9876543226', status: 'Data Received', lastUpload: '2026-03-03', uploads: [] },
    { id: 'c018', name: 'Pandey Book Store', gstin: '27AACFP9012T1Z7', email: 'pandey.books@email.com', phone: '9876543227', status: 'Data Received', lastUpload: '2026-02-28', uploads: [] },
    { id: 'c019', name: 'Saxena Plastics', gstin: '09BBAPS3456U1Z5', email: 'saxena.plastics@email.com', phone: '9876543228', status: 'Data Received', lastUpload: '2026-03-04', uploads: [] },
    { id: 'c020', name: 'Iyer IT Solutions', gstin: '33AADCI7890V1Z3', email: 'iyer.itsolutions@email.com', phone: '9876543229', status: 'Data Received', lastUpload: '2026-03-02', uploads: [] },
    { id: 'c021', name: 'Bansal Rice Mill', gstin: '06AABFB1234W1Z1', email: 'bansal.ricemill@email.com', phone: '9876543230', status: 'Data Received', lastUpload: '2026-03-01', uploads: [] },
    { id: 'c022', name: 'Choudhary Ceramics', gstin: '08AACDC5678X1Z8', email: 'choudhary.ceramics@email.com', phone: '9876543231', status: 'Data Received', lastUpload: '2026-03-05', uploads: [] },
    { id: 'c023', name: 'Kapoor Cosmetics', gstin: '27BBBPK9012Y1Z6', email: 'kapoor.cosmetics@email.com', phone: '9876543232', status: 'Data Received', lastUpload: '2026-03-03', uploads: [] },
    { id: 'c024', name: 'Malhotra Imports', gstin: '07AADCM3456Z1Z4', email: 'malhotra.imports@email.com', phone: '9876543233', status: 'Data Received', lastUpload: '2026-02-27', uploads: [] },
    { id: 'c025', name: 'Bhatia Medical', gstin: '27AABFB7890A2Z2', email: 'bhatia.medical@email.com', phone: '9876543234', status: 'Data Received', lastUpload: '2026-03-04', uploads: [] },
    { id: 'c026', name: 'Pillai Fisheries', gstin: '32AACFP1234B2Z9', email: 'pillai.fisheries@email.com', phone: '9876543235', status: 'Data Received', lastUpload: '2026-03-01', uploads: [] },
    { id: 'c027', name: 'Dutta Tea Estate', gstin: '19BBAPD5678C2Z7', email: 'dutta.tea@email.com', phone: '9876543236', status: 'Data Received', lastUpload: '2026-03-02', uploads: [] },
    { id: 'c028', name: 'Oberoi Hospitality', gstin: '07AADCO9012D2Z5', email: 'oberoi.hospitality@email.com', phone: '9876543237', status: 'Data Received', lastUpload: '2026-03-05', uploads: [] },
    { id: 'c029', name: 'Sethi Logistics', gstin: '06AABFS3456E2Z3', email: 'sethi.logistics@email.com', phone: '9876543238', status: 'Data Received', lastUpload: '2026-02-26', uploads: [] },
    { id: 'c030', name: 'Rathi Cotton Mills', gstin: '08BBBPR7890F2Z1', email: 'rathi.cotton@email.com', phone: '9876543239', status: 'Data Received', lastUpload: '2026-03-03', uploads: [] },
    { id: 'c031', name: 'Mukherjee Printing', gstin: '19AADCM1234G2Z8', email: 'mukherjee.printing@email.com', phone: '9876543240', status: 'Data Received', lastUpload: '2026-03-04', uploads: [] },
    { id: 'c032', name: 'Chauhan Agro', gstin: '08AABFC5678H2Z6', email: 'chauhan.agro@email.com', phone: '9876543241', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c033', name: 'Bhatt Electricals', gstin: '24AACFB9012J2Z4', email: 'bhatt.electricals@email.com', phone: '9876543242', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c034', name: 'Kulkarni Engineering', gstin: '27BBAPK3456K2Z2', email: 'kulkarni.engg@email.com', phone: '9876543243', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c035', name: 'Jain Optical', gstin: '08AADCJ7890L2Z9', email: 'jain.optical@email.com', phone: '9876543244', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c036', name: 'Menon Rubber Works', gstin: '32AABFM1234M2Z7', email: 'menon.rubber@email.com', phone: '9876543245', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c037', name: 'Sengupta Exports', gstin: '19AACFS5678N2Z5', email: 'sengupta.exports@email.com', phone: '9876543246', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c038', name: 'Thakur Handicrafts', gstin: '02BBAPS9012P2Z3', email: 'thakur.handicrafts@email.com', phone: '9876543247', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c039', name: 'Bajaj Automobiles', gstin: '27AADCB3456Q2Z1', email: 'bajaj.automobiles@email.com', phone: '9876543248', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c040', name: 'Goyal Stationery', gstin: '06AABFG7890R2Z8', email: 'goyal.stationery@email.com', phone: '9876543249', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c041', name: 'Rastogi Paints', gstin: '09AACFR1234S2Z6', email: 'rastogi.paints@email.com', phone: '9876543250', status: 'Pending', lastUpload: null, uploads: [] },
    { id: 'c042', name: 'Maheshwari Fabrics', gstin: '08BBAPM5678T2Z4', email: 'maheshwari.fabrics@email.com', phone: '9876543251', status: 'Overdue', lastUpload: null, uploads: [] },
    { id: 'c043', name: 'Srinivasan Silks', gstin: '33AADCS9012U2Z2', email: 'srinivasan.silks@email.com', phone: '9876543252', status: 'Overdue', lastUpload: null, uploads: [] },
    { id: 'c044', name: 'Kashyap General Store', gstin: '02AABFK3456V2Z9', email: 'kashyap.store@email.com', phone: '9876543253', status: 'Overdue', lastUpload: null, uploads: [] },
    { id: 'c045', name: 'Bose Instruments', gstin: '19AACFB7890W2Z7', email: 'bose.instruments@email.com', phone: '9876543254', status: 'Overdue', lastUpload: null, uploads: [] },
    { id: 'c046', name: 'Ahuja Electronics', gstin: '06BBAQA1234X2Z5', email: 'ahuja.electronics@email.com', phone: '9876543255', status: 'Overdue', lastUpload: null, uploads: [] },
    { id: 'c047', name: 'Khandelwal Marbles', gstin: '08AADCK5678Y2Z3', email: 'khandelwal.marbles@email.com', phone: '9876543256', status: 'Overdue', lastUpload: null, uploads: [] },
];

// Submission chart data
export const submissionData = [
    { month: 'Jan', submitted: 28, complete: true },
    { month: 'Feb', submitted: 35, complete: true },
    { month: 'Mar', submitted: 31, complete: false },
];

// Current filing period
export const currentFilingPeriod = {
    returnType: 'GSTR-1',
    month: 'March',
    year: 2026,
    deadlineDate: '2026-03-11',
};
