'use client';

import PlanSummaryCard from './components/PlanSummaryCard';
import ApiKeysTable from './components/ApiKeysTable';
import { maskKey } from './lib/utils';
import CreateApiKeyModal from './components/CreateApiKeyModal';
import EditApiKeyModal from './components/EditApiKeyModal';
import { useApiKeys } from './hooks/useApiKeys';
import { FiPlus } from 'react-icons/fi';

export default function Dashboard() {
  // Replace all local state/handlers with the hook
  const {
    apiKeys,
    showKeyIds,
    showModal,
    setShowModal,
    createModal,
    setCreateModal,
    showEditModal,
    setShowEditModal,
    editModal,
    setEditModal,
    handleCreateModal,
    handleModalCreate,
    deleteApiKey,
    openEditModal,
    handleEditModalSave,
    toggleShowKey,
    copyKey,
  } = useApiKeys();

  // Demo plan/usage data
  const currentPlan = "Researcher";
  const usage = 2;
  const usageLimit = 1000;
  const usagePercent = Math.min((usage / usageLimit) * 100, 100);

  return (
    <div className="min-h-screen bg-[#f6f8fa] p-8">
      <CreateApiKeyModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleModalCreate}
        keyName={createModal.keyName}
        setKeyName={v => setCreateModal(m => ({ ...m, keyName: v }))}
        keyType={createModal.keyType}
        setKeyType={v => setCreateModal(m => ({ ...m, keyType: v }))}
        limitUsage={createModal.limitUsage}
        setLimitUsage={v => setCreateModal(m => ({ ...m, limitUsage: v }))}
        usageLimit={createModal.usageLimit}
        setUsageLimit={v => setCreateModal(m => ({ ...m, usageLimit: v }))}
      />
      <EditApiKeyModal
        open={showEditModal && !!editModal.key}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditModalSave}
        keyName={editModal.keyName}
        setKeyName={v => setEditModal(m => ({ ...m, keyName: v }))}
        keyType={editModal.key?.type || ''}
        limitUsage={editModal.limitUsage}
        setLimitUsage={v => setEditModal(m => ({ ...m, limitUsage: v }))}
        usageLimit={editModal.usageLimit}
        setUsageLimit={v => setEditModal(m => ({ ...m, usageLimit: v }))}
        pii={editModal.pii}
        setPii={v => setEditModal(m => ({ ...m, pii: v }))}
      />
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1a2233] mb-2">API Keys</h1>
          <p className="text-gray-600 text-base">
            The key is used to authenticate your requests. To learn more, see the documentation page.
          </p>
        </div>

        {/* Plan summary card */}
        <PlanSummaryCard
          currentPlan={currentPlan}
          usage={usage}
          usageLimit={usageLimit}
          usagePercent={usagePercent}
        />

        {/* API Keys Table Card */}
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
            onCopyKey={copyKey}
            onEdit={openEditModal}
            onDelete={deleteApiKey}
          />
        </div>
      </div>
    </div>
  );
} 