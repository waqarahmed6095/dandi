import React from 'react';

interface PiiRestrictionFieldProps {
  value: boolean;
  onChange: (v: boolean) => void;
}

const PiiRestrictionField: React.FC<PiiRestrictionFieldProps> = ({ value, onChange }) => (
  <div className="mb-8">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
      <input
        type="checkbox"
        checked={value}
        onChange={e => onChange(e.target.checked)}
        className="accent-blue-600"
      />
      Enable PII Restrictions
      <span className="text-gray-500 font-normal">— Configure how to handle Personal Identifiable Information (PII) in user queries</span>
    </label>
  </div>
);

export default PiiRestrictionField; 