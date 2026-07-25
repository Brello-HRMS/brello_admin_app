import { ChevronDown } from 'lucide-react';

import { ALL_STATUSES, STATUS_LABELS } from '../constants';

import styles from './LeadStatusSelect.module.scss';

import type { LeadStatus } from '../types';

const STATUS_CLASS: Record<LeadStatus, string> = {
  NEW: styles.new,
  CONTACTED: styles.contacted,
  DEMO_SCHEDULED: styles.demoScheduled,
  DEMO_COMPLETED: styles.demoCompleted,
  PROPOSAL_SENT: styles.proposalSent,
  NEGOTIATION: styles.negotiation,
  CONTRACT_SENT: styles.contractSent,
  WON: styles.won,
  LOST: styles.lost,
  ON_HOLD: styles.onHold,
};

interface LeadStatusSelectProps {
  value: LeadStatus;
  onChange: (status: LeadStatus) => void;
  disabled?: boolean;
}

/**
 * Status pill that matches the app's badge design language (pill + dot + token
 * colors) while remaining editable. A transparent native <select> overlays the
 * whole pill so the entire chip is the click target and the option list renders
 * in the browser's native layer (never clipped by the table's scroll overflow).
 */
export const LeadStatusSelect = ({ value, onChange, disabled = false }: LeadStatusSelectProps) => (
  <span className={`${styles.pill} ${STATUS_CLASS[value]} ${disabled ? styles.disabled : ''}`}>
    <span className={styles.dot} />
    <span className={styles.label}>{STATUS_LABELS[value]}</span>
    <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
    <select
      className={styles.nativeSelect}
      value={value}
      disabled={disabled}
      aria-label="Lead status"
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => onChange(e.target.value as LeadStatus)}
    >
      {ALL_STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  </span>
);
