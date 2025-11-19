export interface Policy {
  name: string;
  title: string;
  description: string;
  category: string;
  version: number;
  attachment?: string;
  active_from: string;
}

export interface PolicyRequest {
  name: string;
  policy: string;
  employee: string;
  status: string;
  approver?: string;
  approver_remarks?: string;
  query: string;
  modified: string;
}

export interface ActivityLogEntry {
  name: string;
  reference_type: string;
  reference_name: string;
  event_type: string;
  details: string;
  changed_by: string;
  modified: string;
}

export interface AuthUser {
  email: string;
  fullName: string;
  role: 'Employee' | 'Policy Manager' | 'Admin';
}
