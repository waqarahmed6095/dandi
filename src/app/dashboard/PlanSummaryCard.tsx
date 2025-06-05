import React from "react";
import { PlanSummaryCardProps } from './types';

const PlanSummaryCard: React.FC<PlanSummaryCardProps> = ({ currentPlan, usage, usageLimit, usagePercent }) => (
  <div className="mb-8 rounded-2xl shadow-lg p-6 relative overflow-hidden" style={{background: 'linear-gradient(90deg, #f7bfa5 0%, #b6c6f7 100%)'}}>
    <button className="absolute top-6 right-6 bg-white/80 hover:bg-white text-[#1a2233] font-semibold px-5 py-2 rounded-lg shadow transition-colors border border-white/50 z-10">
      Manage Plan
    </button>
    <div className="flex flex-col gap-2 max-w-full">
      <span className="bg-white/30 text-xs font-semibold px-3 py-1 rounded-full text-white tracking-wide w-fit mb-2">CURRENT PLAN</span>
      <span className="text-3xl font-bold text-white drop-shadow-sm mb-2">{currentPlan}</span>
      <div className="flex items-center gap-2 text-white font-medium mb-1">
        <span>API Usage</span>
        <span className="text-white/80 text-xs" title="API usage info">&#9432;</span>
      </div>
      <div className="w-full">
        <div className="relative h-2 rounded-full bg-white/30 w-full">
          <div
            className="absolute left-0 top-0 h-2 rounded-full bg-white/90 transition-all"
            style={{ width: `${usagePercent}%` }}
          ></div>
        </div>
        <div className="mt-2 text-white font-bold text-sm">
          {usage} / {usageLimit} Credits
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-9 h-5 bg-white/40 peer-focus:outline-none rounded-full peer peer-checked:bg-white/80 transition-colors"></div>
          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform"></div>
        </label>
        <span className="text-white/90 text-sm select-none">Pay as you go</span>
        <span className="text-white/70 text-xs" title="Pay as you go info">&#9432;</span>
      </div>
    </div>
  </div>
);

export default PlanSummaryCard; 