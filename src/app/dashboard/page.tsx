'use client';

import { useState } from 'react';
import { maskKey } from './lib/utils';
import { useApiKeys } from './hooks/useApiKeys';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import DashboardHeader from './layout/DashboardHeader';
import ApiKeyModals from './layout/ApiKeyModals';
import ApiKeysCard from './layout/ApiKeysCard';

export default function Dashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const {
    apiKeys,
    showKeyIds,
    showModal,
    setShowModal,
    createModal,
    showEditModal,
    setShowEditModal,
    editModal,
    handleCreateModal,
    handleModalCreate,
    deleteApiKey,
    openEditModal,
    handleEditModalSave,
    toggleShowKey,
    handleCopyKey,
  } = useApiKeys();

  // Demo plan/usage data
  const currentPlan = "Researcher";
  const usage = 2;
  const usageLimit = 1000;
  const usagePercent = Math.min((usage / usageLimit) * 100, 100);

  return (
    <div className="flex">
      <Sidebar isVisible={sidebarVisible} setIsVisible={setSidebarVisible} />
      <main className={`${sidebarVisible ? 'ml-64' : ''} flex-1 transition-all duration-300`}>
        <div className="min-h-screen bg-[#f6f8fa] p-8">
          <Toaster position="top-center" />
          <ApiKeyModals
            showModal={showModal}
            setShowModal={setShowModal}
            createModal={createModal}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            editModal={editModal}
            handleModalCreate={handleModalCreate}
            handleEditModalSave={handleEditModalSave}
          />
          <div className="max-w-5xl mx-auto">
            <DashboardHeader />
            <ApiKeysCard
              currentPlan={currentPlan}
              usage={usage}
              usageLimit={usageLimit}
              usagePercent={usagePercent}
              apiKeys={apiKeys}
              showKeyIds={showKeyIds}
              maskKey={maskKey}
              toggleShowKey={toggleShowKey}
              handleCopyKey={handleCopyKey}
              openEditModal={openEditModal}
              deleteApiKey={deleteApiKey}
              handleCreateModal={handleCreateModal}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 