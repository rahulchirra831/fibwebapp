import React, { useState, useEffect, useRef, useCallback } from 'react';

// Icons
const PlayCircleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
  </svg>
);

const PauseCircleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zM6.25 7.25A.75.75 0 017 6.5h1.5a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75H7a.75.75 0 01-.75-.75v-6.5zm5 0A.75.75 0 0112 6.5h1.5a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-6.5z" clipRule="evenodd" />
    </svg>
  );

const ArrowUturnLeftIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.56l2.72 2.72a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L5.56 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
  </svg>
);

const XMarkIconWidget: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface CountdownWidgetProps {
  onClose: () => void;
}

const INITIAL_DURATION_SECONDS = 3 * 60; 

const formatCountdownDisplayTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


const CountdownWidgetComponent: React.FC<CountdownWidgetProps> = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_DURATION_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const widgetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  const [hasInitializedPosition, setHasInitializedPosition] = useState(false);

  const radius = 48; 
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 8; 
  const svgCenter = 55; 
  
  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (widgetRef.current && !hasInitializedPosition) {
      const { offsetWidth, offsetHeight } = widgetRef.current;
       if (offsetWidth > 50 && offsetHeight > 50) { 
            setPosition({
                top: Math.max(0, window.innerHeight - offsetHeight - 20), 
                left: Math.max(0, window.innerWidth - offsetWidth - 20),
            });
            setHasInitializedPosition(true);
        }
    }
  }, [hasInitializedPosition, widgetRef.current?.offsetWidth, widgetRef.current?.offsetHeight]);


  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button.close-button')) return; 
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStartOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
  }, [position]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button.close-button')) return;
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

    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - offsetWidth));
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - offsetHeight));

    setPosition({ top: newTop, left: newLeft });
  }, [isDragging, dragStartOffset]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  }, [handleDragMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) { 
        e.preventDefault();
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [isDragging, handleDragMove]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

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


  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearTimerInterval();
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning || timeLeft === 0) {
      clearTimerInterval();
      if (timeLeft === 0 && !isFinished && !isRunning) { 
        setIsFinished(true);
      }
    }
    return () => clearTimerInterval();
  }, [isRunning, timeLeft, clearTimerInterval, isFinished]);


  const handleStartPause = () => {
    if (isFinished) { 
      handleReset();
      return;
    }
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    clearTimerInterval();
    setIsRunning(false);
    setTimeLeft(INITIAL_DURATION_SECONDS);
    setIsFinished(false);
  };

  const progress = timeLeft / INITIAL_DURATION_SECONDS;
  const offset = circumference - progress * circumference;
  const displayedTime = formatCountdownDisplayTime(timeLeft);

  const widgetCursor = isDragging ? 'grabbing' : 'grab';

  let mainButtonIcon = <PlayCircleIcon className="w-3.5 h-3.5 mr-1" />; 
  let mainButtonText = "Start";
  let mainButtonAriaLabel = "Start countdown timer";
  let mainButtonColor = "bg-orange-500 hover:bg-orange-400 active:bg-orange-600";
  let mainButtonExtraClass = "";

  if (isFinished) {
    mainButtonIcon = <ArrowUturnLeftIcon className="w-3.5 h-3.5 mr-1" />;
    mainButtonText = "Reset";
    mainButtonAriaLabel = "Reset countdown timer";
    mainButtonColor = "bg-orange-500 hover:bg-orange-400 active:bg-orange-600";
  } else if (isRunning) {
    mainButtonIcon = <PauseCircleIcon className="w-3.5 h-3.5 mr-1" />;
    mainButtonText = "Pause";
    mainButtonAriaLabel = "Pause countdown timer";
    mainButtonColor = "bg-red-600 hover:bg-red-500 active:bg-red-700";
  } else if (!isRunning && timeLeft < INITIAL_DURATION_SECONDS) { 
    mainButtonText = "Resume";
    mainButtonAriaLabel = "Resume countdown timer";
    mainButtonExtraClass = "animate-pulseResumeButton";
  }
  
  const showResetButton = !isFinished && (!isRunning && timeLeft < INITIAL_DURATION_SECONDS || isRunning);


  return (
    <div
      ref={widgetRef}
      className="fixed z-50 flex flex-col items-center justify-start p-3 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl shadow-lg text-white animate-ios-widget-enter"
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
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onMouseDown={(e) => e.stopPropagation()} 
        onTouchStart={(e) => e.stopPropagation()} 
        aria-label="Close countdown widget"
        className="close-button absolute top-2 right-2 z-10 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <XMarkIconWidget className="w-4 h-4" /> 
      </button>

      <div className="relative w-[110px] h-[110px] my-1.5 flex items-center justify-center" style={{ cursor: 'inherit' }}>
        <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 110 110">
          <circle
            cx={svgCenter} cy={svgCenter} r={radius}
            fill="rgba(0,0,0,0.2)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
          />
          {timeLeft > 0 && (
            <circle
                cx={svgCenter} cy={svgCenter} r={radius}
                fill="transparent"
                stroke="rgb(249, 115, 22)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="butt"
                className={`transition-strokeDashoffset duration-1000 ease-linear ${isFinished && timeLeft === 0 ? 'animate-pulseOrangeStroke' : ''}`}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center" style={{ cursor: 'inherit' }}>
          <span className={`text-3xl font-mono tracking-tight text-white ${isFinished && timeLeft === 0 ? 'animate-flashWhiteText' : ''}`}>
            {displayedTime}
          </span>
        </div>
      </div>
      
      {isFinished && (
         <p className="text-sm font-semibold text-center text-orange-400 animate-flashOrangeText h-5 leading-tight">
           Time's Up!
         </p>
      )}

      <div className={`flex justify-around w-full max-w-[140px] ${isFinished ? 'mt-1.5' : 'mb-1.5'}`}>
        {showResetButton && (
          <button
            onClick={handleReset}
            className="flex items-center justify-center w-[60px] h-9 rounded-lg bg-neutral-600/80 text-neutral-100 hover:bg-neutral-500/80 active:bg-neutral-700/80 transition-colors text-xs"
            aria-label="Reset countdown timer"
          >
            <ArrowUturnLeftIcon className="w-3.5 h-3.5 mr-1" /> Reset
          </button>
        )}
        <button
          onClick={handleStartPause}
          className={`flex items-center justify-center h-9 rounded-lg text-white transition-colors text-xs ${mainButtonColor} ${isFinished || !showResetButton ? 'w-full' : 'w-[60px]'} ${mainButtonExtraClass}`}
          aria-label={mainButtonAriaLabel}
        >
          {mainButtonIcon} {mainButtonText}
        </button>
      </div>
       {!isFinished && <div className="h-5"></div>} 

      <p 
        className="text-neutral-400 dark:text-neutral-500 text-center text-[0.7rem] italic mt-auto leading-tight"
        style={{ cursor: 'inherit' }}
      >
        drag anywhere
      </p>
      <style>{`
        @keyframes pulseOrangeStroke {
          0%, 100% { stroke: rgb(249, 115, 22); opacity: 1; }
          50% { stroke: rgb(239, 68, 68); opacity: 0.7; } 
        }
        .animate-pulseOrangeStroke {
          animation: pulseOrangeStroke 1.2s infinite;
        }
        @keyframes flashWhiteText {
          0%, 100% { color: white; transform: scale(1.05); }
          50% { color: rgb(251, 146, 60); transform: scale(1.1); }
        }
        .animate-flashWhiteText {
          animation: flashWhiteText 1.2s infinite;
        }
         @keyframes flashOrangeText {
          0%, 100% { color: rgb(251, 146, 60); opacity: 1; }
          50% { color: rgb(253, 186, 116); opacity: 0.7; } 
        }
        .animate-flashOrangeText {
          animation: flashOrangeText 1.2s infinite;
        }
        @keyframes pulseResumeButton {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.5); }
          50% { box-shadow: 0 0 0 6px rgba(249, 115, 22, 0); }
        }
        .animate-pulseResumeButton {
          animation: pulseResumeButton 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

const CountdownWidget = React.memo(CountdownWidgetComponent);
export default CountdownWidget;