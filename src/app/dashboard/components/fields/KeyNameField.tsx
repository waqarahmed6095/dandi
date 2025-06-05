import React from 'react';

interface KeyNameFieldProps {
  value: string;
  onChange: (v: string) => void;
}

const KeyNameField: React.FC<KeyNameFieldProps> = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-800 mb-1">
      Key Name <span className="text-gray-500 font-normal">— A unique name to identify this key</span>
    </label>
    <input
      type="text"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
      placeholder="A unique name to identify this key"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default KeyNameField; 