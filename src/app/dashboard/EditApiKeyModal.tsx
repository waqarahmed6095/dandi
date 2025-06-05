import React from "react";
import { EditApiKeyModalProps } from './types';

const EditApiKeyModal: React.FC<EditApiKeyModalProps> = ({
  open,
  onClose,
  onSave,
  keyName,
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
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-1">Key Name <span className="text-gray-500 font-normal">— A unique name to identify this key</span></label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            value={keyName}
            disabled
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-1">Key Type <span className="text-gray-500 font-normal">— Environment for this key</span></label>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 p-3 rounded-lg border border-blue-200 bg-blue-50">
              <span className="font-semibold text-gray-800">&lt;/&gt; {keyType === 'dev' ? 'Development' : 'Production'}</span>
              <span className="text-xs text-gray-500">{keyType === 'dev' ? 'Rate limited to 100 requests/minute' : 'Rate limited to 1,000 requests/minute'}</span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <input
              type="checkbox"
              checked={limitUsage}
              onChange={e => setLimitUsage(e.target.checked)}
              className="accent-blue-600"
            />
            Limit monthly usage*
          </label>
          <input
            type="number"
            min="1"
            disabled={!limitUsage}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-gray-800 placeholder-gray-400"
            placeholder="1000"
            value={usageLimit}
            onChange={e => setUsageLimit(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <input
              type="checkbox"
              checked={pii}
              onChange={e => setPii(e.target.checked)}
              className="accent-blue-600"
            />
            Enable PII Restrictions
            <span className="text-gray-500 font-normal">— Configure how to handle Personal Identifiable Information (PII) in user queries</span>
          </label>
        </div>
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