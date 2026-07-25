import type { LeadStatus } from './types';

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  DEMO_SCHEDULED: 'Demo Scheduled',
  DEMO_COMPLETED: 'Demo Completed',
  PROPOSAL_SENT: 'Proposal Sent',
  NEGOTIATION: 'Negotiation',
  CONTRACT_SENT: 'Contract Sent',
  WON: 'Won',
  LOST: 'Lost',
  ON_HOLD: 'On Hold',
};

export const ALL_STATUSES = Object.keys(STATUS_LABELS) as LeadStatus[];
