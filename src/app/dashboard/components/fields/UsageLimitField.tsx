import React from 'react';

interface UsageLimitFieldProps {
  limitUsage: boolean;
  setLimitUsage: (v: boolean) => void;
  usageLimit: string;
  setUsageLimit: (v: string) => void;
}

const UsageLimitField: React.FC<UsageLimitFieldProps> = ({ limitUsage, setLimitUsage, usageLimit, setUsageLimit }) => (
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
);

export default UsageLimitField; 