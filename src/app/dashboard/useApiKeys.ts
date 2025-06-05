import { useState } from 'react';
import { ApiKey } from './types';

export function useApiKeys() {
  // API keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKeyIds, setShowKeyIds] = useState<string[]>([]);

  // Create modal state
  const [showModal, setShowModal] = useState(false);
  const [createModal, setCreateModal] = useState({
    keyName: '',
    keyType: 'dev',
    limitUsage: false,
    usageLimit: '',
  });

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModal, setEditModal] = useState({
    key: null as ApiKey | null,
    limitUsage: false,
    usageLimit: '',
    pii: false,
  });

  // CRUD handlers
  const handleCreateModal = () => {
    setShowModal(true);
    setCreateModal({ keyName: '', keyType: 'dev', limitUsage: false, usageLimit: '' });
  };
  const handleModalCreate = () => {
    const newKey: ApiKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: createModal.keyName || 'default',
      type: createModal.keyType,
      usage: 0,
      key: `sk-e-${Math.random().toString(36).substr(2, 8)}n6t9`,
      createdAt: new Date().toISOString(),
    };
    setApiKeys([...apiKeys, newKey]);
    setShowModal(false);
  };
  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };
  const openEditModal = (apiKey: ApiKey) => {
    setEditModal({ key: apiKey, limitUsage: false, usageLimit: '', pii: false });
    setShowEditModal(true);
  };
  const handleEditModalSave = () => {
    if (editModal.key) {
      setApiKeys(apiKeys.map(key =>
        key.id === editModal.key!.id
          ? { ...key /* add limit/PII fields if you want to persist them */ }
          : key
      ));
      setShowEditModal(false);
    }
  };
  const toggleShowKey = (id: string) => {
    setShowKeyIds(prev =>
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    );
  };
  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  return {
    apiKeys,
    setApiKeys,
    showKeyIds,
    setShowKeyIds,
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
  };
} 