export type Screen = 'dashboard' | 'form' | 'review';

export type PermitStatus = 'In Review' | 'Completed' | 'Approved' | 'Pending';

export interface PermitRecord {
  id: string;
  createdDate: string;
  recordNumber: string;
  recordType: string;
  status: PermitStatus;
  isActive?: boolean;
}

export interface TimelineStage {
  id: string;
  label: string;
  estimatedDays: number;
  startDate: string;
  endDate: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  respFirstName: string;
  respLastName: string;
  respStreetAddress: string;
  respCity: string;
  respState: string;
  respZip: string;
  projectAddress: string;
  projectDescription: string;
  permitType: string;
  estimatedCost: string;
  contractorName: string;
  contractorLicense: string;
}

export type AutofillState = 'idle' | 'reading' | 'filling' | 'done';

export interface Document {
  id: string;
  name: string;
  filename: string;
  size: string;
  required: boolean;
  uploaded: boolean;
}

export interface AIFlag {
  id: string;
  severity: 'error' | 'warning' | 'info';
  field: string;
  issue: string;
  detail: string;
  codeRef: string;
  codeTitle: string;
  codeText: string;
  pageRef: string;
  expanded: boolean;
  status: 'open' | 'accepted' | 'dismissed';
}
