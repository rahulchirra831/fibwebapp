import React, {
  // useState, useEffect, useRef, useCallback // No longer needed
} from 'react';
// import { HydrationWidgetProps } from '../types'; // REMOVED

const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const XMarkIconWidget: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// const WATER_INCREMENT_ML = 250; // No longer used

const HydrationWidgetComponent: React.FC = () => {
  // All logic related to currentIntake, dailyGoal, onAddWater, onClose, isVisible
  // position, dragging, etc., is removed as the component is now a stub.
  // useEffects, useCallback, useState for these are removed.

  // The component is no longer rendered or functional as per App.tsx changes.
  // Returning null to make it a valid component that does nothing.
  return null;
};

const HydrationWidget = React.memo(HydrationWidgetComponent);
export default HydrationWidget;