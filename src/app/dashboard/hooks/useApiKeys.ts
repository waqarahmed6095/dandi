import { useState, useEffect } from 'react';
import { ApiKey, EditApiKeyModalProps, CreateApiKeyModalProps } from '../types/index';
import toast from 'react-hot-toast';

export function useApiKeys() {
  // API keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKeyIds, setShowKeyIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create modal state
  const [showModal, setShowModal] = useState(false);
  const [createModal, setCreateModal] = useState<Omit<CreateApiKeyModalProps, 'open' | 'onClose' | 'onCreate'>>({
    keyName: '',
    setKeyName: (v: string) => setCreateModal(prev => ({ ...prev, keyName: v })),
    keyType: 'dev',
    setKeyType: (v: string) => setCreateModal(prev => ({ ...prev, keyType: v })),
    limitUsage: false,
    setLimitUsage: (v: boolean) => setCreateModal(prev => ({ ...prev, limitUsage: v })),
    usageLimit: '',
    setUsageLimit: (v: string) => setCreateModal(prev => ({ ...prev, usageLimit: v }))
  });

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModal, setEditModal] = useState<Omit<EditApiKeyModalProps, 'open' | 'onClose' | 'onSave'> & { key?: ApiKey }>({
    key: undefined,
    keyName: '',
    setKeyName: (v: string) => setEditModal(prev => ({ ...prev, keyName: v })),
    keyType: '',
    limitUsage: false,
    setLimitUsage: (v: boolean) => setEditModal(prev => ({ ...prev, limitUsage: v })),
    usageLimit: '',
    setUsageLimit: (v: string) => setEditModal(prev => ({ ...prev, usageLimit: v })),
    pii: false,
    setPii: (v: boolean) => setEditModal(prev => ({ ...prev, pii: v }))
  });

  // Fetch API keys from the API on mount
  useEffect(() => {
    const fetchApiKeys = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/keys', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Failed to fetch API keys');
        }
        const data = await response.json();
        setApiKeys(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
      setLoading(false);
    };
    fetchApiKeys();
  }, []);

  // CRUD handlers
  const handleCreateModal = () => {
    setShowModal(true);
    setCreateModal({
      keyName: '',
      setKeyName: (v: string) => setCreateModal(prev => ({ ...prev, keyName: v })),
      keyType: 'dev',
      setKeyType: (v: string) => setCreateModal(prev => ({ ...prev, keyType: v })),
      limitUsage: false,
      setLimitUsage: (v: boolean) => setCreateModal(prev => ({ ...prev, limitUsage: v })),
      usageLimit: '',
      setUsageLimit: (v: string) => setCreateModal(prev => ({ ...prev, usageLimit: v }))
    });
  };

  const handleModalCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: createModal.keyName || 'default',
          type: createModal.keyType
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to create API key');
      }

      const data = await response.json();
      setApiKeys(prev => [data, ...prev]);
      setShowModal(false);
      toast.success('API Key created!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to create API key');
    }
    setLoading(false);
  };

  const deleteApiKey = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete API key');
      }

      setApiKeys(apiKeys.filter(key => key.id !== id));
      toast.error('API Key deleted!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to delete API key');
    }
    setLoading(false);
  };

  const openEditModal = (apiKey: ApiKey) => {
    setEditModal({
      key: apiKey,
      keyName: apiKey.name,
      setKeyName: (v: string) => setEditModal(prev => ({ ...prev, keyName: v })),
      keyType: apiKey.type,
      limitUsage: false,
      setLimitUsage: (v: boolean) => setEditModal(prev => ({ ...prev, limitUsage: v })),
      usageLimit: '',
      setUsageLimit: (v: string) => setEditModal(prev => ({ ...prev, usageLimit: v })),
      pii: false,
      setPii: (v: boolean) => setEditModal(prev => ({ ...prev, pii: v }))
    });
    setShowEditModal(true);
  };

  const handleEditModalSave = async () => {
    if (editModal.key) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/keys/${editModal.key.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: editModal.keyName,
            type: editModal.keyType
          }),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to update API key');
        }

        const data = await response.json();
        setApiKeys(apiKeys.map(key =>
          key.id === editModal.key!.id ? data : key
        ));
        setShowEditModal(false);
        toast.success('API Key updated!');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error('Failed to update API key');
      }
      setLoading(false);
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

  const handleCopyKey = (key: string) => {
    copyKey(key);
    toast.success('Copied API Key to clipboard');
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
    handleCopyKey,
    loading,
    error,
  };
} 