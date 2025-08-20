export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales' | 'agronomy' | 'success' | 'finance' | 'read_only';
  locale: string;
  timeZone: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'farmer' | 'distributor' | 'NGO' | 'municipality';
  region?: string;
  segment?: string;
  size?: string;
  website?: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    contacts: number;
    opportunities: number;
    tickets: number;
  };
}

export interface Contact {
  id: string;
  accountId: string;
  account?: Account;
  firstName: string;
  lastName: string;
  title?: string;
  email?: string;
  phone?: string;
  locale?: string;
  consentEmail: boolean;
  consentDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  source: 'inbound' | 'event' | 'referral' | 'distributor';
  firstName: string;
  lastName: string;
  company?: string;
  email?: string;
  phone?: string;
  region?: string;
  segment?: string;
  score: number;
  status: 'new' | 'working' | 'qualified' | 'disqualified';
  ownerId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  accountId: string;
  account?: Account;
  name: string;
  stage: 'prospecting' | 'discovery' | 'trial_planned' | 'trial_running' | 'trial_result' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost' | 'on_hold';
  currency: string;
  amount?: number;
  probability?: number;
  expectedClose?: string;
  competitor?: string;
  decisionProcess?: string;
  ownerId?: string;
  useCase?: string;
  efpSoilType?: string;
  efpClimateZone?: string;
  efpCrop?: string;
  efpIrrigation?: string;
  efpApplication?: string;
  efpDosageKgHa?: number;
  efpExpectedWaterSavingsPct?: number;
  efpExpectedYieldUpliftPct?: number;
  efpExpectedROI?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Trial {
  id: string;
  opportunityId: string;
  opportunity?: Opportunity;
  siteName: string;
  locationLat?: number;
  locationLng?: number;
  startDate: string;
  endDate?: string;
  protocolVersion?: string;
  hasControl: boolean;
  status: 'planned' | 'running' | 'completed' | 'canceled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  measurements?: TrialMeasurement[];
}

export interface TrialMeasurement {
  id: string;
  trialId: string;
  date: string;
  soilMoisturePct?: number;
  irrigationVolumeL?: number;
  rainfallMm?: number;
  temperatureC?: number;
  yieldEstimate?: number;
  sampleNotes?: string;
  attachmentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  relatedType: 'account' | 'contact' | 'opportunity' | 'trial';
  relatedId: string;
  type: 'call' | 'meeting' | 'visit' | 'followup' | 'task';
  subject: string;
  dueAt?: string;
  completedAt?: string;
  ownerId?: string;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalCount: number;
    offset: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}