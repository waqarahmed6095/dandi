import React from 'react';
import CreateApiKeyModal from '../components/CreateApiKeyModal';
import EditApiKeyModal from '../components/EditApiKeyModal';
import { CreateApiKeyModalProps, EditApiKeyModalProps, ApiKey } from '../types';

interface ApiKeyModalsProps {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  createModal: Omit<CreateApiKeyModalProps, 'open' | 'onClose' | 'onCreate'>;
  showEditModal: boolean;
  setShowEditModal: (v: boolean) => void;
  editModal: Omit<EditApiKeyModalProps, 'open' | 'onClose' | 'onSave'> & { key?: ApiKey };
  handleModalCreate: () => void;
  handleEditModalSave: () => void;
}

const ApiKeyModals: React.FC<ApiKeyModalsProps> = ({
  showModal,
  setShowModal,
  createModal,
  showEditModal,
  setShowEditModal,
  editModal,
  handleModalCreate,
  handleEditModalSave,
}) => (
  <>
    <CreateApiKeyModal
      open={showModal}
      onClose={() => setShowModal(false)}
      onCreate={handleModalCreate}
      {...createModal}
    />
    <EditApiKeyModal
      open={showEditModal && !!editModal.key}
      onClose={() => setShowEditModal(false)}
      onSave={handleEditModalSave}
      keyName={editModal.keyName}
      setKeyName={editModal.setKeyName}
      keyType={editModal.key?.type || ''}
      limitUsage={editModal.limitUsage}
      setLimitUsage={editModal.setLimitUsage}
      usageLimit={editModal.usageLimit}
      setUsageLimit={editModal.setUsageLimit}
      pii={editModal.pii}
      setPii={editModal.setPii}
    />
  </>
);

export default ApiKeyModals; 