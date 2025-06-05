import React from "react";
import { ApiKey } from '../../types/index';
import ApiKeyActions from './ApiKeyActions';

interface ApiKeyRowProps {
  apiKey: ApiKey;
  showKey: boolean;
  maskKey: (key: string) => string;
  onToggleShowKey: (id: string) => void;
  onCopyKey: (key: string) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
}

const ApiKeyRow: React.FC<ApiKeyRowProps> = ({ apiKey, showKey, maskKey, onToggleShowKey, onCopyKey, onEdit, onDelete }) => (
  <tr className="bg-[#f3f6fa] rounded-lg text-[#1a2233]">
    <td className="px-4 py-3 rounded-l-lg font-medium text-base">{apiKey.name}</td>
    <td className="px-4 py-3">
      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold border border-blue-200">
        {apiKey.type}
      </span>
    </td>
    <td className="px-4 py-3 text-center font-semibold text-gray-700">{apiKey.usage}</td>
    <td className="px-4 py-3 font-mono">
      <input
        type="text"
        value={showKey ? apiKey.key : maskKey(apiKey.key)}
        readOnly
        className="w-full bg-[#e9eef5] border border-[#d1d5db] rounded px-2 py-1 text-sm font-mono text-[#1a2233]"
      />
    </td>
    <td className="px-4 py-3 flex items-center gap-3 justify-center rounded-r-lg">
      <ApiKeyActions
        apiKey={apiKey}
        showKey={showKey}
        onToggleShowKey={onToggleShowKey}
        onCopyKey={onCopyKey}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </td>
  </tr>
);

export default ApiKeyRow; 