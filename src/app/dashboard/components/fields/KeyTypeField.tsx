import React from 'react';

interface KeyTypeFieldProps {
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
}

const KeyTypeField: React.FC<KeyTypeFieldProps> = ({ value, onChange, readOnly }) => {
  if (readOnly) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800 mb-1">Key Type <span className="text-gray-500 font-normal">— Environment for this key</span></label>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2 p-3 rounded-lg border border-blue-200 bg-blue-50">
            <span className="font-semibold text-gray-800">&lt;/&gt; {value === 'dev' ? 'Development' : 'Production'}</span>
            <span className="text-xs text-gray-500">{value === 'dev' ? 'Rate limited to 100 requests/minute' : 'Rate limited to 1,000 requests/minute'}</span>
          </div>
        </div>
      </div>
    );
  }
  return (
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
            checked={value === "dev"}
            onChange={() => onChange && onChange("dev")}
            className="accent-blue-600"
          />
          <span className="font-semibold text-gray-800">Development</span>
          <span className="text-xs text-gray-500">Rate limited to 100 requests/minute</span>
        </label>
      </div>
    </div>
  );
};

export default KeyTypeField; 