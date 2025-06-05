import React from "react";
import { FiEye, FiCopy, FiEdit2, FiTrash2, FiEyeOff } from 'react-icons/fi';
import { ApiKey } from '../types/index';
import ApiKeyRow from './rows/ApiKeyRow';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  showKeyIds: string[];
  maskKey: (key: string) => string;
  onToggleShowKey: (id: string) => void;
  onCopyKey: (key: string) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
}

const ApiKeysTable: React.FC<ApiKeysTableProps> = ({ apiKeys, showKeyIds, maskKey, onToggleShowKey, onCopyKey, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-separate border-spacing-y-2">
      <thead>
        <tr className="text-gray-500 text-sm">
          <th className="px-4 py-2 font-semibold">NAME</th>
          <th className="px-4 py-2 font-semibold">TYPE</th>
          <th className="px-4 py-2 font-semibold">USAGE</th>
          <th className="px-4 py-2 font-semibold">KEY</th>
          <th className="px-4 py-2 font-semibold text-center">OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {apiKeys.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center text-gray-400 py-8 bg-[#f6f8fa] rounded-lg">
              No API keys found. Create your first API key to get started.
            </td>
          </tr>
        )}
        {apiKeys.map((apiKey) => (
          <ApiKeyRow
            key={apiKey.id}
            apiKey={apiKey}
            showKey={showKeyIds.includes(apiKey.id)}
            maskKey={maskKey}
            onToggleShowKey={onToggleShowKey}
            onCopyKey={onCopyKey}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default ApiKeysTable; 