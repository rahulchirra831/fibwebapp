
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CountdownTimerPageProps } from '../types';
import InteractiveArrowButton from './AbRegionSelector'; // Using this for styled back button

// Icons (similar to StopwatchPage)
const PlayCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
  </svg>
);

const PauseCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zM6.25 7.25A.75.75 0 017 6.5h1.5a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75H7a.75.75 0 01-.75-.75v-6.5zm5 0A.75.75 0 0112 6.5h1.5a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-6.5z" clipRule="evenodd" />
    </svg>
  );

const ArrowUturnLeftIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.56l2.72 2.72a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L5.56 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
  </svg>
);

const INITIAL_DURATION = 3 * 60; // 3 minutes in seconds

const formatCountdownTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const CountdownTimerPage: React.FC<CountdownTimerPageProps> = ({ onNavigateHome }) => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 12;

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

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
      if (timeLeft === 0 && !isFinished) { // Handle case where timer is reset before finishing naturally
        setIsFinished(true); // Ensure finished state is set if reset at 0
      }
    }
    return () => clearTimerInterval();
  }, [isRunning, timeLeft, clearTimerInterval, isFinished]);

  const handleStartPause = () => {
    if (isFinished) {
      handleReset(); // If finished, the main button acts as a reset
      return;
    }
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    clearTimerInterval();
    setIsRunning(false);
    setTimeLeft(INITIAL_DURATION);
    setIsFinished(false);
  };

  const progress = timeLeft / INITIAL_DURATION;
  const offset = circumference - progress * circumference;
  const displayedTime = formatCountdownTime(timeLeft);

  let rightButtonIcon = <PlayCircleIcon className="w-6 h-6 mr-2" />;
  let rightButtonText = "Start";
  let rightButtonColor = "bg-orange-500 hover:bg-orange-400 active:bg-orange-600";
  let rightButtonAction = handleStartPause;

  if (isFinished) {
    rightButtonIcon = <ArrowUturnLeftIcon className="w-6 h-6 mr-2" />;
    rightButtonText = "Reset";
    rightButtonColor = "bg-orange-500 hover:bg-orange-400 active:bg-orange-600";
  } else if (isRunning) {
    rightButtonIcon = <PauseCircleIcon className="w-6 h-6 mr-2" />;
    rightButtonText = "Pause";
    rightButtonColor = "bg-red-600 hover:bg-red-500 active:bg-red-700";
  } else if (!isRunning && timeLeft < INITIAL_DURATION) { // Paused
    rightButtonText = "Resume";
  }

  const leftButtonDisabled = (!isRunning && timeLeft === INITIAL_DURATION) || isFinished;


  return (
    <div className="flex flex-col items-center justify-start pt-4 pb-8 bg-black min-h-full text-white px-4">
      <div className="absolute top-4 left-4 z-10">
        <InteractiveArrowButton
            onClick={onNavigateHome}
            ariaLabel="Back to Home"
        />
      </div>
      
      <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] my-8 flex items-center justify-center">
        <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 300 300">
          <circle 
            cx="150" cy="150" r={radius} 
            fill="#222222" // Fill the dial background
            stroke="#333" 
            strokeWidth={strokeWidth} 
          />
          {timeLeft > 0 && (
            <circle
              cx="150" cy="150" r={radius}
              fill="transparent"
              stroke="rgb(249, 115, 22)" 
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="butt" // Changed from round to butt
              className={`transition-strokeDashoffset duration-1000 ease-linear ${isFinished && timeLeft === 0 ? 'animate-pulseOrange' : ''}`}
            />
          )}
           {/* Tick marks (optional, can be less prominent than stopwatch) */}
           {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            const x1 = 150 + (radius - strokeWidth / 2 - 1) * Math.cos(angle * Math.PI / 180);
            const y1 = 150 + (radius - strokeWidth / 2 - 1) * Math.sin(angle * Math.PI / 180);
            const x2 = 150 + (radius + strokeWidth / 2 + 1) * Math.cos(angle * Math.PI / 180);
            const y2 = 150 + (radius + strokeWidth / 2 + 1) * Math.sin(angle * Math.PI / 180);
            return <line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#444" strokeWidth="1.5" />;
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-6xl sm:text-7xl font-mono tracking-tighter text-white ${isFinished && timeLeft === 0 ? 'animate-flashText' : ''}`}>
            {displayedTime}
          </span>
        </div>
      </div>

      {isFinished && (
        <p className="text-2xl font-semibold text-center text-orange-400 mb-8 animate-pulse">
          Rest Over! Back to Workout!
        </p>
      )}

      <div className="flex justify-around w-full max-w-xs mb-8">
        {!isFinished && (
            <button 
            onClick={handleReset}
            disabled={leftButtonDisabled}
            className={`flex items-center justify-center w-28 h-14 rounded-lg bg-neutral-700 text-neutral-200 hover:bg-neutral-600 active:bg-neutral-800 transition-colors
                        ${leftButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Reset timer"
            >
            <ArrowUturnLeftIcon className="w-6 h-6 mr-2" /> Reset
            </button>
        )}
        
        <button 
          onClick={rightButtonAction}
          className={`flex items-center justify-center w-28 h-14 rounded-lg text-white transition-colors ${rightButtonColor} ${isFinished ? 'w-full max-w-[180px]' : ''}`}
          aria-label={`${rightButtonText} timer`}
        >
          {rightButtonIcon} {rightButtonText}
        </button>
      </div>
      <style>{`
        @keyframes pulseOrange {
          0%, 100% { stroke: rgb(249, 115, 22); opacity: 1; }
          50% { stroke: rgb(239, 68, 68); opacity: 0.7; } /* red-500 */
        }
        .animate-pulseOrange {
          animation: pulseOrange 1s infinite;
        }
        @keyframes flashText {
          0%, 100% { color: white; transform: scale(1); }
          50% { color: rgb(251, 146, 60); transform: scale(1.05); } /* orange-400 */
        }
        .animate-flashText {
          animation: flashText 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default CountdownTimerPage;
