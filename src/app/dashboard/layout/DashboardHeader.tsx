import React from 'react';

const DashboardHeader: React.FC = () => (
  <div className="mb-10">
    <h1 className="text-3xl font-bold text-[#1a2233] mb-2">API Keys</h1>
    <p className="text-gray-600 text-base">
      The key is used to authenticate your requests. To learn more, see the documentation page.
    </p>
  </div>
);

export default DashboardHeader; 