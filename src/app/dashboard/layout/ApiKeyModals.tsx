import React from 'react';
import CreateApiKeyModal from '../components/CreateApiKeyModal';
import EditApiKeyModal from '../components/EditApiKeyModal';
import { CreateApiKeyModalProps, EditApiKeyModalProps } from '../types';

interface ApiKeyModalsProps {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  createModal: Omit<CreateApiKeyModalProps, 'open' | 'onClose' | 'onCreate'>;
  setCreateModal: (v: Omit<CreateApiKeyModalProps, 'open' | 'onClose' | 'onCreate'>) => void;
  showEditModal: boolean;
  setShowEditModal: (v: boolean) => void;
  editModal: Omit<EditApiKeyModalProps, 'open' | 'onClose' | 'onSave'> & { key?: { type?: string } };
  setEditModal: (v: Omit<EditApiKeyModalProps, 'open' | 'onClose' | 'onSave'> & { key?: { type?: string } }) => void;
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
  handleModalCreate,
  handleEditModalSave,
}) => (
  <>
    <CreateApiKeyModal
      open={showModal}
      onClose={() => setShowModal(false)}
      onCreate={handleModalCreate}
      keyName={createModal.keyName}
      setKeyName={v => setCreateModal({ ...createModal, keyName: v })}
      keyType={createModal.keyType}
      setKeyType={v => setCreateModal({ ...createModal, keyType: v })}
      limitUsage={createModal.limitUsage}
      setLimitUsage={v => setCreateModal({ ...createModal, limitUsage: v })}
      usageLimit={createModal.usageLimit}
      setUsageLimit={v => setCreateModal({ ...createModal, usageLimit: v })}
    />
    <EditApiKeyModal
      open={showEditModal && !!editModal.key}
      onClose={() => setShowEditModal(false)}
      onSave={handleEditModalSave}
      keyName={editModal.keyName}
      setKeyName={v => setEditModal({ ...editModal, keyName: v })}
      keyType={editModal.key?.type || ''}
      limitUsage={editModal.limitUsage}
      setLimitUsage={v => setEditModal({ ...editModal, limitUsage: v })}
      usageLimit={editModal.usageLimit}
      setUsageLimit={v => setEditModal({ ...editModal, usageLimit: v })}
      pii={editModal.pii}
      setPii={v => setEditModal({ ...editModal, pii: v })}
    />
  </>
);

export default ApiKeyModals; 