import React from "react";
import { KeyNameField, KeyTypeField, UsageLimitField } from "./fields";

interface CreateApiKeyModalProps {
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

const CreateApiKeyModal: React.FC<CreateApiKeyModalProps> = ({
  open,
  onClose,
  onCreate,
  keyName,
  setKeyName,
  keyType,
  setKeyType,
  limitUsage,
  setLimitUsage,
  usageLimit,
  setUsageLimit,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-8 relative animate-fade-in">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Create a new API key</h2>
        <p className="text-gray-600 text-center mb-6">Enter a name and limit for the new API key.</p>
        <KeyNameField value={keyName} onChange={setKeyName} />
        <KeyTypeField value={keyType} onChange={setKeyType} />
        <UsageLimitField limitUsage={limitUsage} setLimitUsage={setLimitUsage} usageLimit={usageLimit} setUsageLimit={setUsageLimit} />
        <p className="text-xs text-gray-500 mb-6">* If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.</p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={onCreate}
          >
            Create
          </button>
          <button
            className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateApiKeyModal; 