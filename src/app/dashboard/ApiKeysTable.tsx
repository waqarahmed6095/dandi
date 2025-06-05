import React from "react";
import { FiEye, FiCopy, FiEdit2, FiTrash2, FiEyeOff } from 'react-icons/fi';
import { ApiKey } from './types';

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
          <tr key={apiKey.id} className="bg-[#f3f6fa] rounded-lg text-[#1a2233]">
            <td className="px-4 py-3 rounded-l-lg font-medium text-base">{apiKey.name}</td>
            <td className="px-4 py-3">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold border border-blue-200">
                {apiKey.type}
              </span>
            </td>
            <td className="px-4 py-3 text-center font-semibold text-gray-700">{apiKey.usage}</td>
            <td className="px-4 py-3 font-mono">
              <input
                type={showKeyIds.includes(apiKey.id) ? "text" : "text"}
                value={showKeyIds.includes(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                readOnly
                className="w-full bg-[#e9eef5] border border-[#d1d5db] rounded px-2 py-1 text-sm font-mono text-[#1a2233]"
              />
            </td>
            <td className="px-4 py-3 flex items-center gap-3 justify-center rounded-r-lg">
              <button
                className="text-gray-500 hover:text-blue-600 transition-colors"
                title={showKeyIds.includes(apiKey.id) ? "Hide" : "Show"}
                onClick={() => onToggleShowKey(apiKey.id)}
              >
                {showKeyIds.includes(apiKey.id) ? <FiEyeOff /> : <FiEye />}
              </button>
              <button
                className="text-gray-500 hover:text-blue-600 transition-colors"
                title="Copy"
                onClick={() => onCopyKey(apiKey.key)}
              >
                <FiCopy />
              </button>
              <button
                className="text-gray-500 hover:text-blue-600 transition-colors"
                title="Edit"
                onClick={() => onEdit(apiKey)}
              >
                <FiEdit2 />
              </button>
              <button
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Delete"
                onClick={() => onDelete(apiKey.id)}
              >
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ApiKeysTable; 