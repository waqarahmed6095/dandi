import React from "react";
import { FiEye, FiCopy, FiEdit2, FiTrash2, FiEyeOff } from 'react-icons/fi';
import { ApiKey } from '../../types/index';

interface ApiKeyActionsProps {
  apiKey: ApiKey;
  showKey: boolean;
  onToggleShowKey: (id: string) => void;
  onCopyKey: (key: string) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
}

const ApiKeyActions: React.FC<ApiKeyActionsProps> = ({ apiKey, showKey, onToggleShowKey, onCopyKey, onEdit, onDelete }) => (
  <>
    <button
      className="text-gray-500 hover:text-blue-600 transition-colors"
      title={showKey ? "Hide" : "Show"}
      onClick={() => onToggleShowKey(apiKey.id)}
    >
      {showKey ? <FiEyeOff /> : <FiEye />}
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
  </>
);

export default ApiKeyActions; 