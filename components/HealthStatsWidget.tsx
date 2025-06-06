import React, {
  // useState, useEffect, useRef, useCallback // No longer needed
} from 'react';
// import { HealthStatsWidgetProps } from '../types'; // REMOVED

const XMarkIconWidget: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const HeartIconSolid: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10 3.5a1.563 1.563 0 00-1.342.722A4.51 4.51 0 005 7.75C5 12.552 10 16.5 10 16.5s5-3.948 5-8.75a4.51 4.51 0 00-3.658-3.528A1.563 1.563 0 0010 3.5z" />
  </svg>
);

const FootstepsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21H3v-5.25A2.25 2.25 0 015.25 13.5h0A2.25 2.25 0 017.5 15.75V21m3.75-9A2.25 2.25 0 009 14.25v2.25M15 12A2.25 2.25 0 0117.25 14.25v5.25h-3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12L12 7.5m0 0l4.5 4.5M12 7.5V3M3.75 9A2.25 2.25 0 001.5 6.75V4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 21h3.75V15A2.25 2.25 0 0014.25 12.75h0A2.25 2.25 0 0012 15V21m-3.75-9A2.25 2.25 0 0110.5 9.75v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12l4.5-4.5m0 0L15 3m4.5 4.5H21m-3.75 9A2.25 2.25 0 0015 14.25V12" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

interface CompactStatItemProps { // This interface is local, so it's fine.
  icon: React.ReactElement<{ className?: string }>;
  value: string | number;
  unit?: string;
  label: string;
  iconColorClass?: string;
}
const CompactStatItemComponent: React.FC<CompactStatItemProps> = ({ icon, value, label, unit, iconColorClass }) => (
  <div className="flex items-center space-x-2 p-2 bg-white/10 dark:bg-neutral-700/40 rounded-xl w-full">
    <div className={`flex-shrink-0 p-1.5 rounded-full bg-black/10 dark:bg-white/10 ${iconColorClass}`}>
      {React.cloneElement(icon, { className: "w-4 h-4" })}
    </div>
    <div className="flex-grow overflow-hidden">
      <p className="text-base font-semibold text-neutral-800 dark:text-neutral-100 truncate leading-tight">
        {value} {unit && <span className="text-xs">{unit}</span>}
      </p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate leading-tight">{label}</p>
    </div>
  </div>
);
const CompactStatItem = React.memo(CompactStatItemComponent);


const HealthStatsWidgetComponent: React.FC = () => { // Changed props to none
  // All logic related to isVisible, onClose, heartRate, stepsTaken, sleepHours,
  // position, dragging, etc., is removed as the component is now a stub.
  return null;
};

const HealthStatsWidget = React.memo(HealthStatsWidgetComponent);
export default HealthStatsWidget;