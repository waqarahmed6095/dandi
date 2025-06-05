import React from "react";
import { EditApiKeyModalProps } from '../types/index';
import { KeyNameField, KeyTypeField, UsageLimitField, PiiRestrictionField } from "./fields";

const EditApiKeyModal: React.FC<EditApiKeyModalProps> = ({
  open,
  onClose,
  onSave,
  keyName,
  setKeyName,
  keyType,
  limitUsage,
  setLimitUsage,
  usageLimit,
  setUsageLimit,
  pii,
  setPii,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-10 relative animate-fade-in">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Edit API key</h2>
        <p className="text-gray-600 text-center mb-8">Enter a new limit for the API key and configure PII restrictions.</p>
        <KeyNameField value={keyName} onChange={setKeyName} />
        <KeyTypeField value={keyType} readOnly />
        <UsageLimitField limitUsage={limitUsage} setLimitUsage={setLimitUsage} usageLimit={usageLimit} setUsageLimit={setUsageLimit} />
        <PiiRestrictionField value={pii} onChange={setPii} />
        <div className="flex gap-4 justify-center">
          <button
            className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={onSave}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-100 text-gray-800 px-8 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditApiKeyModal; 