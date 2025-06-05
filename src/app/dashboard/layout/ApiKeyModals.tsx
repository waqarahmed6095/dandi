import React from 'react';
import CreateApiKeyModal from '../components/CreateApiKeyModal';
import EditApiKeyModal from '../components/EditApiKeyModal';

interface ApiKeyModalsProps {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  createModal: any;
  setCreateModal: (v: any) => void;
  showEditModal: boolean;
  setShowEditModal: (v: boolean) => void;
  editModal: any;
  setEditModal: (v: any) => void;
  handleCreateModal: () => void;
  handleModalCreate: () => void;
  handleEditModalSave: () => void;
}

const ApiKeyModals: React.FC<ApiKeyModalsProps> = ({
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
  handleEditModalSave,
}) => (
  <>
    <CreateApiKeyModal
      open={showModal}
      onClose={() => setShowModal(false)}
      onCreate={handleModalCreate}
      keyName={createModal.keyName}
      setKeyName={v => setCreateModal((m: any) => ({ ...m, keyName: v }))}
      keyType={createModal.keyType}
      setKeyType={v => setCreateModal((m: any) => ({ ...m, keyType: v }))}
      limitUsage={createModal.limitUsage}
      setLimitUsage={v => setCreateModal((m: any) => ({ ...m, limitUsage: v }))}
      usageLimit={createModal.usageLimit}
      setUsageLimit={v => setCreateModal((m: any) => ({ ...m, usageLimit: v }))}
    />
    <EditApiKeyModal
      open={showEditModal && !!editModal.key}
      onClose={() => setShowEditModal(false)}
      onSave={handleEditModalSave}
      keyName={editModal.keyName}
      setKeyName={v => setEditModal((m: any) => ({ ...m, keyName: v }))}
      keyType={editModal.key?.type || ''}
      limitUsage={editModal.limitUsage}
      setLimitUsage={v => setEditModal((m: any) => ({ ...m, limitUsage: v }))}
      usageLimit={editModal.usageLimit}
      setUsageLimit={v => setEditModal((m: any) => ({ ...m, usageLimit: v }))}
      pii={editModal.pii}
      setPii={v => setEditModal((m: any) => ({ ...m, pii: v }))}
    />
  </>
);

export default ApiKeyModals; 