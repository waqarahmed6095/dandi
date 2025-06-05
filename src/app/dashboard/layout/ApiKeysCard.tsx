import React from 'react';
import PlanSummaryCard from '../components/PlanSummaryCard';
import ApiKeysTable from '../components/ApiKeysTable';
import { FiPlus } from 'react-icons/fi';
import { ApiKey } from '../types/index';

interface ApiKeysCardProps {
  currentPlan: string;
  usage: number;
  usageLimit: number;
  usagePercent: number;
  apiKeys: ApiKey[];
  showKeyIds: string[];
  maskKey: (key: string) => string;
  toggleShowKey: (id: string) => void;
  handleCopyKey: (key: string) => void;
  openEditModal: (apiKey: ApiKey) => void;
  deleteApiKey: (id: string) => void;
  handleCreateModal: () => void;
}

const ApiKeysCard: React.FC<ApiKeysCardProps> = ({
  currentPlan,
  usage,
  usageLimit,
  usagePercent,
  apiKeys,
  showKeyIds,
  maskKey,
  toggleShowKey,
  handleCopyKey,
  openEditModal,
  deleteApiKey,
  handleCreateModal,
}) => (
  <>
    <PlanSummaryCard
      currentPlan={currentPlan}
      usage={usage}
      usageLimit={usageLimit}
      usagePercent={usagePercent}
    />
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700 opacity-80">API Keys</h2>
        <button
          onClick={handleCreateModal}
          className="flex items-center gap-2 bg-[#f3f6fa] hover:bg-[#e2e8f0] text-[#1a2233] px-4 py-2 rounded-lg font-medium shadow border border-[#e2e8f0] transition-colors"
        >
          <FiPlus />
          New Key
        </button>
      </div>
      <ApiKeysTable
        apiKeys={apiKeys}
        showKeyIds={showKeyIds}
        maskKey={maskKey}
        onToggleShowKey={toggleShowKey}
        onCopyKey={handleCopyKey}
        onEdit={openEditModal}
        onDelete={deleteApiKey}
      />
    </div>
  </>
);

export default ApiKeysCard; 