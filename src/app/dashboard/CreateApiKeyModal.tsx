import React from "react";

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
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-1">Key Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
            placeholder="A unique name to identify this key"
            value={keyName}
            onChange={e => setKeyName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-1">Key Type <span className="text-gray-500 font-normal">— Choose the environment for this key</span></label>
          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 cursor-not-allowed opacity-60">
              <input type="radio" name="keyType" value="prod" disabled className="accent-blue-600" />
              <span className="font-semibold text-gray-800">Production</span>
              <span className="text-xs text-gray-500">Rate limited to 1,000 requests/minute</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-lg border border-blue-200 bg-blue-50 cursor-pointer">
              <input
                type="radio"
                name="keyType"
                value="dev"
                checked={keyType === "dev"}
                onChange={() => setKeyType("dev")}
                className="accent-blue-600"
              />
              <span className="font-semibold text-gray-800">Development</span>
              <span className="text-xs text-gray-500">Rate limited to 100 requests/minute</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
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
        <p className="text-xs text-gray-500 mb-6">* If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.</p>
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