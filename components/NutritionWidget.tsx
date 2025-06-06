import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NutritionWidgetProps } from '../types';

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

const CALORIE_INCREMENT_DEFAULT = 300; 

const NutritionWidgetComponent: React.FC<NutritionWidgetProps> = ({
  currentCalories,
  dailyCalorieGoal,
  onAddCalories,
  onClose,
  isVisible,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  const [hasInitializedPosition, setHasInitializedPosition] = useState(false);

  const radius = 46; 
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 8; 
  const svgCenter = 55; 

  useEffect(() => {
    if (widgetRef.current && !hasInitializedPosition && isVisible) {
        const { offsetWidth, offsetHeight } = widgetRef.current;
        if (offsetWidth > 0 && offsetHeight > 0) {
            setPosition({
                top: Math.max(10, window.innerHeight - offsetHeight - 90), 
                left: Math.max(10, window.innerWidth - offsetWidth - 20),
            });
            setHasInitializedPosition(true);
        }
    }
  }, [hasInitializedPosition, isVisible, widgetRef.current?.offsetWidth, widgetRef.current?.offsetHeight]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isVisible) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isVisible, onClose]);


  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStartOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
  }, [position]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setDragStartOffset({
      x: e.touches[0].clientX - position.left,
      y: e.touches[0].clientY - position.top,
    });
  }, [position]);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !widgetRef.current) return;
    const { offsetWidth, offsetHeight } = widgetRef.current;
    let newLeft = clientX - dragStartOffset.x;
    let newTop = clientY - dragStartOffset.y;

    newLeft = Math.max(10, Math.min(newLeft, window.innerWidth - offsetWidth - 10));
    newTop = Math.max(10, Math.min(newTop, window.innerHeight - offsetHeight - 10));
    setPosition({ top: newTop, left: newLeft });
  }, [isDragging, dragStartOffset]);

  const handleMouseMove = useCallback((e: MouseEvent) => handleDragMove(e.clientX, e.clientY), [handleDragMove]);
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) { e.preventDefault(); handleDragMove(e.touches[0].clientX, e.touches[0].clientY); }
  }, [isDragging, handleDragMove]);
  const handleDragEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  if (!isVisible) return null;

  const progress = dailyCalorieGoal > 0 ? Math.min(currentCalories / dailyCalorieGoal, 1) : 0;
  const offset = circumference - progress * circumference;
  const widgetCursor = isDragging ? 'grabbing' : 'grab';

  return (
    <div
      ref={widgetRef}
      className="fixed z-50 flex flex-col items-stretch justify-start p-3 pt-2.5 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-xl shadow-xl text-neutral-800 dark:text-neutral-100 animate-ios-widget-enter"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        cursor: widgetCursor,
        touchAction: 'none',
        width: '180px', 
        height: '180px',
        borderRadius: '24px', 
        overflow: 'hidden',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="dialog"
      aria-labelledby="nutrition-widget-title"
      aria-describedby="nutrition-widget-description"
    >
      <div className="flex items-center justify-between w-full mb-1.5 flex-shrink-0 h-7" style={{ cursor: 'inherit' }}>
         <h3 id="nutrition-widget-title" className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 ml-0.5">
          Nutrition
        </h3>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          aria-label="Close nutrition widget"
          className="p-1.5 bg-black/20 hover:bg-black/40 dark:bg-white/20 dark:hover:bg-white/40 rounded-full text-neutral-700 dark:text-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-offset-neutral-800"
        >
          <XMarkIconWidget className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center w-full overflow-hidden space-y-2 pt-1" style={{ cursor: 'inherit' }}>
        <div className="relative w-[110px] h-[110px] flex items-center justify-center">
          <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 110 110">
            <circle
              cx={svgCenter} cy={svgCenter} r={radius}
              fill="transparent"
              stroke="rgba(0,0,0,0.1)"
              className="dark:stroke-[rgba(255,255,255,0.1)]" 
              strokeWidth={strokeWidth}
            />
            { progress > 0 && ( 
              <circle
                cx={svgCenter} cy={svgCenter} r={radius}
                fill="transparent"
                stroke="rgb(34, 197, 94)" 
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 leading-tight">
              {currentCalories}
            </span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 leading-tight">kcal</span>
          </div>
        </div>
        
        <p id="nutrition-widget-description" className="text-xs text-neutral-500 dark:text-neutral-400">
          Goal: {dailyCalorieGoal} kcal
        </p>
        
        <button
          onClick={() => onAddCalories(CALORIE_INCREMENT_DEFAULT)}
          className="w-full max-w-[130px] flex items-center justify-center py-2 px-3 rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 dark:focus:ring-offset-neutral-800"
          aria-label={`Log meal, add ${CALORIE_INCREMENT_DEFAULT} calories`}
        >
          <PlusIcon className="w-4 h-4 mr-1.5" /> Log Meal
        </button>
      </div>
      
      <div className="flex-shrink-0 h-3.5"></div> 
    </div>
  );
};

const NutritionWidget = React.memo(NutritionWidgetComponent);
export default NutritionWidget;