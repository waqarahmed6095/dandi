import { useState, useEffect } from 'react';
import { ApiKey } from '../types/index';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export function useApiKeys() {
  // API keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKeyIds, setShowKeyIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create modal state
  const [showModal, setShowModal] = useState(false);
  const [createModal, setCreateModal] = useState({
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
  const [editModal, setEditModal] = useState({
    key: null as ApiKey | null,
    keyName: '',
    limitUsage: false,
    usageLimit: '',
    pii: false,
  });

  // Fetch API keys from Supabase on mount
  useEffect(() => {
    const fetchApiKeys = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setApiKeys(data as ApiKey[]);
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
    const newKey: Omit<ApiKey, 'id'> = {
      name: createModal.keyName || 'default',
      type: createModal.keyType,
      usage: 0,
      key: `dandi-${Math.random().toString(36).substr(2, 8)}n6t9`,
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from('api_keys')
      .insert([newKey])
      .select();
    if (error) {
      setError(error.message);
    } else if (data && data.length > 0) {
      setApiKeys(prev => [data[0] as ApiKey, ...prev]);
      setShowModal(false);
    }
    toast.success('API Key created!');
    setLoading(false);
  };
  const deleteApiKey = async (id: string) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      setApiKeys(apiKeys.filter(key => key.id !== id));
      toast.error('API Key deleted!');
    }
    setLoading(false);
  };
  const openEditModal = (apiKey: ApiKey) => {
    setEditModal({ key: apiKey, keyName: apiKey.name, limitUsage: false, usageLimit: '', pii: false });
    setShowEditModal(true);
  };
  const handleEditModalSave = async () => {
    if (editModal.key) {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('api_keys')
        .update({ name: editModal.keyName })
        .eq('id', editModal.key.id)
        .select();
      if (error) {
        setError(error.message);
      } else if (data && data.length > 0) {
        setApiKeys(apiKeys.map(key =>
          key.id === editModal.key!.id ? { ...key, name: editModal.keyName } : key
        ));
        setShowEditModal(false);
        toast.success('API Key updated!');
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