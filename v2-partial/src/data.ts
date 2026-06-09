import type { PermitRecord, TimelineStage, FormData, Document, AIFlag } from './types';

export const CURRENT_USER = {
  name: 'Alex Brown',
  initials: 'AB',
  role: 'Applicant',
};

export const PERMIT_RECORDS: PermitRecord[] = [
  {
    id: '1',
    createdDate: '10/1/2025',
    recordNumber: '25TMP-270798',
    recordType: 'Reroofing Permit',
    status: 'In Review',
    isActive: true,
  },
  {
    id: '2',
    createdDate: '8/18/2020',
    recordNumber: 'SDOT-RPZ-01-11594',
    recordType: 'RPZ - Residential License',
    status: 'Completed',
  },
  {
    id: '3',
    createdDate: '7/30/2020',
    recordNumber: 'SDOT-RPZ-01-08703',
    recordType: 'Restricted Parking Zone - RPZ Residential Application',
    status: 'Completed',
  },
];

export const TIMELINE_STAGES: TimelineStage[] = [
  {
    id: 'intake',
    label: 'Application Intake',
    estimatedDays: 3,
    startDate: 'Oct 1, 2025',
    endDate: 'Oct 4, 2025',
    status: 'completed',
  },
  {
    id: 'screening',
    label: 'Completeness Screening',
    estimatedDays: 7,
    startDate: 'Oct 4, 2025',
    endDate: 'Oct 11, 2025',
    status: 'completed',
  },
  {
    id: 'plan_review',
    label: 'Plan Review (SDCI)',
    estimatedDays: 78,
    startDate: 'Oct 11, 2025',
    endDate: 'Dec 28, 2025',
    status: 'active',
  },
  {
    id: 'correction',
    label: 'Applicant Corrections',
    estimatedDays: 13,
    startDate: 'Dec 28, 2025',
    endDate: 'Jan 10, 2026',
    status: 'upcoming',
  },
  {
    id: 'final_review',
    label: 'Final Review',
    estimatedDays: 14,
    startDate: 'Jan 10, 2026',
    endDate: 'Jan 24, 2026',
    status: 'upcoming',
  },
  {
    id: 'issuance',
    label: 'Permit Issuance',
    estimatedDays: 5,
    startDate: 'Jan 24, 2026',
    endDate: 'Jan 29, 2026',
    status: 'upcoming',
  },
];

export const AI_TIMELINE_METRICS = {
  planReviewDays: 78,
  correctionDays: 13,
  totalIssueDays: 92,
  permitType: 'Reroofing Permit',
  basisFactors: [
    'Similar MR(M) zoning reroofing permits filed in Q4 2025',
    'Current SDCI plan review queue: 234 active applications',
    'Contractor license status: valid through 06/30/2026',
    'Your application completeness score: 94%',
  ],
};

export const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  ssn: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  respFirstName: '',
  respLastName: '',
  respStreetAddress: '',
  respCity: '',
  respState: '',
  respZip: '',
  projectAddress: '',
  projectDescription: '',
  permitType: '',
  estimatedCost: '',
  contractorName: '',
  contractorLicense: '',
};

export const AI_FILLED_FORM: FormData = {
  firstName: 'Alex',
  lastName: 'Brown',
  email: 'alexbrown@gmail.com',
  phone: '(612) 123-4567',
  dob: '06/01/1982',
  ssn: '•••-••-••••',
  streetAddress: '2529 Yale Ave. E.',
  city: 'Seattle',
  state: 'WA',
  zip: '98102',
  respFirstName: 'Alex',
  respLastName: 'Brown',
  respStreetAddress: '2529 Yale Ave. E.',
  respCity: 'Seattle',
  respState: 'WA',
  respZip: '98102',
  projectAddress: '111 12th Ave, Apt 701, Seattle, WA 98105',
  projectDescription: 'Full replacement of existing asphalt shingle roofing on 7-story multifamily residential building. New Class A fire-rated TPO membrane system.',
  permitType: 'Reroofing Permit',
  estimatedCost: '$184,500',
  contractorName: 'Northwest RoofWorks LLC',
  contractorLicense: 'SEAT-ROOF-234987',
};

export const INITIAL_DOCUMENTS: Document[] = [
  { id: 'id_proof', name: 'ID Proof', filename: 'drivers_license.pdf', size: '1.2 MB', required: true, uploaded: false },
  { id: 'income', name: 'Income Verification', filename: 'income_verification.pdf', size: '3.6 MB', required: true, uploaded: false },
  { id: 'bank', name: 'Bank Statement', filename: 'bank_statement.pdf', size: '2.5 MB', required: true, uploaded: false },
  { id: 'plans', name: 'Building Plans & Elevations', filename: 'F1_plan.pdf', size: '1.6 GB', required: true, uploaded: false },
  { id: 'site', name: 'Site Plan', filename: 'site_plan.pdf', size: '4.2 MB', required: true, uploaded: false },
  { id: 'energy', name: 'Energy Compliance Form', filename: 'energy_form.pdf', size: '890 KB', required: true, uploaded: false },
  { id: 'plumbing', name: 'Plumbing Plans', filename: 'plumbing.pdf', size: '2.1 MB', required: true, uploaded: false },
  { id: 'electrical', name: 'Electrical Plans', filename: 'electrical.pdf', size: '3.3 MB', required: false, uploaded: false },
];

export const UPLOADED_DOCUMENTS: Document[] = INITIAL_DOCUMENTS.map(d => ({
  ...d,
  uploaded: true,
}));

export const BAR_CHART_DATA = [
  { label: 'Single Family', value: 162 },
  { label: 'Duplex', value: 158 },
  { label: 'Commercial', value: 148 },
  { label: 'Institutional', value: 138 },
  { label: 'Institutional II', value: 128 },
  { label: 'Vacant', value: 120 },
  { label: 'Vacant Land', value: 110 },
];

export const LINE_CHART_DATA = [
  { year: '2014', value: 13.4 },
  { year: '2016', value: 12.8 },
  { year: '2018', value: 12.5 },
  { year: '2019', value: 12.2 },
  { year: '2022a', value: 11.9 },
  { year: '2022b', value: 12.1 },
];

export const AI_FLAGS: AIFlag[] = [
  {
    id: 'f1',
    severity: 'error',
    field: 'WA License Number',
    issue: 'Contractor license expires before estimated permit issuance',
    detail: 'License SEAT-ROOF-234987 expires 06/30/2026, but the estimated permit issuance date is Jan 29, 2026. Verify contractor maintains an active license through project completion.',
    codeRef: 'SMC 22.900A.010(C)(2)',
    codeTitle: 'Seattle Municipal Code — Contractor Licensing Requirements',
    codeText: 'All contractors performing work under a Seattle building permit must hold a valid Washington State contractor license for the full duration of the permitted work, including all inspections. A lapsed license will result in permit suspension.',
    pageRef: 'Section 3 — Contractor Information',
    expanded: false,
    status: 'open',
  },
  {
    id: 'f2',
    severity: 'warning',
    field: 'Permit Type / Zoning',
    issue: 'MR(M) zoning requires Design Review Board notification for roof replacements over $150,000',
    detail: 'Project estimated cost of $184,500 exceeds the $150,000 threshold for MR(M) midrise multifamily zones. A Design Review notification form (DR-1) must be attached prior to plan review.',
    codeRef: 'SMC 23.41.004(D)',
    codeTitle: 'Seattle Municipal Code — Design Review Thresholds',
    codeText: 'In MR(M) zones, all exterior alterations or replacements with a total estimated project value exceeding $150,000 are subject to Design Review Board notification. Applicant must submit form DR-1 and attach to the permit record prior to plan review assignment.',
    pageRef: 'Section 1 — Project Information',
    expanded: false,
    status: 'open',
  },
  {
    id: 'f3',
    severity: 'warning',
    field: 'Building Use',
    issue: 'Energy code compliance form may require 2021 Seattle Energy Code version',
    detail: 'Applications submitted after Oct 1, 2025 must use the 2021 Seattle Energy Code (SEC) for commercial/multifamily buildings. Confirm the attached energy compliance form references SEC 2021, not SEC 2018.',
    codeRef: 'SEC 2021 §C101.1',
    codeTitle: '2021 Seattle Energy Code — Scope and Application',
    codeText: 'The 2021 Seattle Energy Code applies to all commercial and multifamily residential building permit applications submitted on or after October 1, 2025. Permits using forms referencing prior code editions will be returned for correction.',
    pageRef: 'Section 4 — Supporting Documents',
    expanded: false,
    status: 'open',
  },
  {
    id: 'f4',
    severity: 'info',
    field: 'Project Description',
    issue: 'TPO membrane specification — confirm fire rating documentation',
    detail: 'The project description references a "Class A fire-rated TPO membrane system." SDCI reviewers typically request the manufacturer\'s ICC or UL listing sheet. Attaching it now can prevent a correction cycle.',
    codeRef: 'IBC §1505.1 (adopted by SMC 22.100)',
    codeTitle: 'International Building Code — Fire Classification of Roof Assemblies',
    codeText: 'Roof assemblies shall be listed and labeled. The roof covering classification shall be provided by the manufacturer\'s listing and labeling in accordance with ASTM E108 or UL 790. Documentation must be submitted with the permit application.',
    pageRef: 'Section 2 — Project Description',
    expanded: false,
    status: 'open',
  },
];

// ── Partial-mode data ────────────────────────────────────────────────────────

export const PARTIAL_PERMIT_CLASSES = [
  'Single Family / Duplex',
  'Commercial',
  'Institutional',
  'Multifamily Residential',
  'Vacant / Land',
];

export const PARTIAL_PERMIT_TYPES: Record<string, string[]> = {
  'Single Family / Duplex': ['Residential Addition', 'Deck', 'Detached ADU', 'Reroofing Permit', 'Window/Door Replacement'],
  'Commercial': ['Commercial Tenant Improvement', 'Change of Use', 'Commercial Addition', 'Reroofing Permit'],
  'Institutional': ['Institutional Addition', 'Interior Remodel', 'Accessibility Upgrade'],
  'Multifamily Residential': ['Reroofing Permit', 'Multifamily Addition', 'Interior Remodel', 'Commercial Tenant Improvement'],
  'Vacant / Land': ['New Single Family', 'New Multifamily', 'Grading Permit'],
};

export const PARTIAL_CASE_TIMELINES: Record<string, { planReview: number; correction: number; totalIssue: number; sampleSize: number }> = {
  'Reroofing Permit':             { planReview: 65, correction: 10, totalIssue: 82,  sampleSize: 312 },
  'Residential Addition':         { planReview: 95, correction: 18, totalIssue: 124, sampleSize: 189 },
  'Deck':                         { planReview: 42, correction: 8,  totalIssue: 58,  sampleSize: 247 },
  'Detached ADU':                 { planReview: 110, correction: 22, totalIssue: 145, sampleSize: 98 },
  'Commercial Tenant Improvement':{ planReview: 88, correction: 15, totalIssue: 116, sampleSize: 203 },
  'Change of Use':                { planReview: 75, correction: 12, totalIssue: 98,  sampleSize: 134 },
  'Commercial Addition':          { planReview: 130, correction: 25, totalIssue: 168, sampleSize: 67 },
  'Multifamily Addition':         { planReview: 142, correction: 28, totalIssue: 185, sampleSize: 55 },
  'Interior Remodel':             { planReview: 55, correction: 9,  totalIssue: 72,  sampleSize: 418 },
  'Window/Door Replacement':      { planReview: 30, correction: 5,  totalIssue: 41,  sampleSize: 562 },
  'New Single Family':            { planReview: 120, correction: 24, totalIssue: 158, sampleSize: 143 },
  'New Multifamily':              { planReview: 160, correction: 35, totalIssue: 210, sampleSize: 41 },
  'Grading Permit':               { planReview: 45, correction: 7,  totalIssue: 60,  sampleSize: 176 },
  'Accessibility Upgrade':        { planReview: 38, correction: 6,  totalIssue: 50,  sampleSize: 89 },
  'Institutional Addition':       { planReview: 118, correction: 20, totalIssue: 152, sampleSize: 72 },
};

export const PARTIAL_TIMELINE_STAGES_TEMPLATE = [
  { id: 'intake',       label: 'Application Intake',        estimatedDays: 3 },
  { id: 'screening',    label: 'Completeness Screening',    estimatedDays: 7 },
  { id: 'plan_review',  label: 'Plan Review (SDCI)',        estimatedDays: 0 },
  { id: 'correction',   label: 'Applicant Corrections',     estimatedDays: 0 },
  { id: 'final_review', label: 'Final Review',              estimatedDays: 14 },
  { id: 'issuance',     label: 'Permit Issuance',           estimatedDays: 5 },
];

// Partial document checklist — includes a failed-upload error state to illustrate
export const PARTIAL_DOCUMENTS: Document[] = [
  { id: 'id_proof', name: 'ID Proof', filename: 'drivers_license.pdf', size: '1.2 MB', required: true, uploaded: true },
  { id: 'income', name: 'Income Verification', filename: 'income_verification.pdf', size: '3.6 MB', required: true, uploaded: false },
  { id: 'bank', name: 'Bank Statements', filename: 'tax_return_2024.pdf', size: '28 MB', required: true, uploaded: false },
  { id: 'plans', name: 'Building Plans & Elevations', filename: 'F1_plan.pdf', size: '1.6 GB', required: true, uploaded: false },
  { id: 'site', name: 'Site Plan', filename: 'site_plan.pdf', size: '4.2 MB', required: true, uploaded: false },
  { id: 'energy', name: 'Energy Compliance Form', filename: 'energy_form.pdf', size: '890 KB', required: true, uploaded: false },
  { id: 'plumbing', name: 'Plumbing Plans', filename: 'plumbing.pdf', size: '2.1 MB', required: true, uploaded: false },
  { id: 'electrical', name: 'Electrical Plans', filename: 'electrical.pdf', size: '3.3 MB', required: false, uploaded: false },
];

export const PARTIAL_AI_FLAGS: AIFlag[] = [
  {
    id: 'pf1',
    severity: 'error',
    field: 'WA License Number',
    issue: 'Contractor license may expire before project completion',
    detail: 'License SEAT-ROOF-234987 shows an expiration date that could conflict with the project timeline. Verify the contractor has a valid license through the full duration of permitted work, including all inspections.',
    codeRef: '',
    codeTitle: '',
    codeText: '',
    pageRef: 'Section 3 — Contractor Information',
    expanded: false,
    status: 'open',
  },
  {
    id: 'pf2',
    severity: 'warning',
    field: 'Permit Type / Zoning',
    issue: 'Project cost may trigger additional review requirements for this zone',
    detail: 'The estimated project cost of $184,500 may exceed thresholds that require additional review steps for MR(M) midrise multifamily zoning. Check with SDCI whether a Design Review notification is needed before submitting.',
    codeRef: '',
    codeTitle: '',
    codeText: '',
    pageRef: 'Section 1 — Project Information',
    expanded: false,
    status: 'open',
  },
  {
    id: 'pf3',
    severity: 'warning',
    field: 'Building Use',
    issue: 'Confirm energy compliance form matches the correct code year',
    detail: 'Applications for multifamily buildings submitted recently must use the current Seattle Energy Code version. Confirm the attached energy compliance form references the correct edition — using an outdated form will result in a correction request.',
    codeRef: '',
    codeTitle: '',
    codeText: '',
    pageRef: 'Section 4 — Supporting Documents',
    expanded: false,
    status: 'open',
  },
  {
    id: 'pf4',
    severity: 'info',
    field: 'Project Description',
    issue: 'Consider attaching manufacturer fire-rating documentation for the TPO membrane',
    detail: 'The project description references a Class A fire-rated TPO membrane. Including the manufacturer\'s product listing sheet with your application can help reviewers verify fire classification quickly and may reduce the likelihood of a correction cycle.',
    codeRef: '',
    codeTitle: '',
    codeText: '',
    pageRef: 'Section 2 — Project Description',
    expanded: false,
    status: 'open',
  },
];

// ── End partial-mode data ─────────────────────────────────────────────────────

export const REVIEW_APPLICATION = {
  title: 'Seattle Residential Reroofing Permit Application',
  fields: [
    { label: 'Application Name', value: 'Alex Brown' },
    { label: 'Contractor', value: 'Northwest RoofWorks LLC' },
    { label: 'WA License Number', value: 'SEAT-ROOF-234987 (Expires: 06/30/2026)' },
    { label: 'Project Address', value: '111 12th Ave, Apt 701, Seattle, WA 98105' },
    { label: 'Zoning', value: 'MR(M) - Midrise Multifamily' },
    { label: 'Permit Type', value: 'Reroofing Permit' },
    { label: 'Building Use', value: 'Multifamily Residential (7-story)' },
    { label: 'Estimated Project Cost', value: '$184,500' },
    { label: 'Scope of Work', value: 'Full replacement of existing asphalt shingle roofing. New Class A fire-rated TPO membrane system with R-38 continuous insulation.' },
    { label: 'Energy Code Version', value: '2021 Seattle Energy Code (SEC)' },
    { label: 'SDCI Department', value: 'Seattle Dept. of Construction & Inspections' },
    { label: 'Application Date', value: 'October 1, 2025' },
    { label: 'Record Number', value: '25TMP-270798' },
  ],
};
