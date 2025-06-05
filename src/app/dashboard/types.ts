export interface ApiKey {
  id: string;
  name: string;
  type: string;
  usage: number;
  key: string;
  createdAt: string;
}

export interface PlanSummaryCardProps {
  currentPlan: string;
  usage: number;
  usageLimit: number;
  usagePercent: number;
}

export interface CreateApiKeyModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  keyName: string;
  setKeyName: (v: string) => void;
  keyType: string;
  setKeyType: (v: string) => void;
  limitUsage: boolean;
  setLimitUsage: (v: boolean) => void;
  usageLimit: string;
  setUsageLimit: (v: string) => void;
}

export interface EditApiKeyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  keyName: string;
  keyType: string;
  limitUsage: boolean;
  setLimitUsage: (v: boolean) => void;
  usageLimit: string;
  setUsageLimit: (v: string) => void;
  pii: boolean;
  setPii: (v: boolean) => void;
} 