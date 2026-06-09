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
