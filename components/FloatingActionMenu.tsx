

import React, { useState, useRef } from 'react';

// StopwatchIcon component is defined but not used in reactionItems, this is fine.
const StopwatchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    {/* Clock face */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    {/* Top button part 1: stem */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L12 4.5" />
    {/* Top button part 2: cap */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3.75L13.5 3.75" />
  </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM15 15h.008v.008H15V15zm0 2.25h.008v.008H15v-.008z" />
  </svg>
);

// HeartIcon removed as it's no longer used in reactionItems

interface ReactionItem {
  id: string;
  label: string;
  emoji?: string;
  iconComponent?: React.FC<{ className?: string }>;
  imageUrl?: string;
}

const reactionItems: ReactionItem[] = [
  { id: 'countdownWidget', label: 'Stopwatch Timer', imageUrl: 'https://img.icons8.com/color/48/timer--v1.png' },
  // { id: 'youtubeSearch', label: 'YouTube Search', imageUrl: 'https://img.icons8.com/color/48/youtube-play.png' }, // Removed
  // Hydration item removed
  { id: 'schedule', label: 'Workout schedule', iconComponent: CalendarIcon },
  // Health stats item removed
  // Smile item removed
];

interface FloatingActionMenuProps {
  onToggleCountdownWidget: () => void;
  // onHydrationClick prop removed
  onScheduleClick: () => void; 
  // onHealthStatsClick prop removed
  // onToggleYouTubeSearchWidget: () => void; // Removed prop
}

const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({ 
  onToggleCountdownWidget, 
  // onHydrationClick, // Removed
  onScheduleClick,
  // onHealthStatsClick, // Removed
  // onToggleYouTubeSearchWidget // Removed prop
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isToggledOpen, setIsToggledOpen] = useState(false);
  const menuWrapperRef = useRef<HTMLDivElement>(null);

  const menuIsOpen = isHovered || isToggledOpen;

  const handleActionClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (id === 'countdownWidget') {
      onToggleCountdownWidget(); 
    } else if (id === 'schedule') {
      onScheduleClick();
    } 
    // Removed hydration and health stats conditions
    else {
      console.log(`Action: ${id} selected`);
    }
    if (isToggledOpen) {
        setIsToggledOpen(false);
    }
  };

  const handleContainerClick = () => {
    setIsToggledOpen(prev => !prev);
  };

  return (
    <div
      ref={menuWrapperRef}
      className="fixed top-1/2 right-3 sm:right-4 transform -translate-y-1/2 z-40"
      role="toolbar"
      aria-label="Quick actions"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleContainerClick} 
    >
      <div
        className={`bg-white/40 dark:bg-black/30 backdrop-blur-sm
                    rounded-full shadow-lg p-1.5 sm:p-2
                    flex flex-col items-center
                    transition-all duration-200 ease-in-out`}
      >
        {reactionItems.map((item, index) => (
          <div
            key={item.id}
            className={`
              relative group w-full flex justify-center
              transition-all duration-200 ease-in-out
              ${menuIsOpen || index < 2 // Show first 2 items by default, rest on hover/toggle
                ? 'opacity-100 scale-100 max-h-16 pointer-events-auto my-0.5 sm:my-1'
                : 'opacity-0 scale-90 max-h-0 pointer-events-none my-0 overflow-hidden'
              }
            `}
            style={{
              transitionDelay: (menuIsOpen && index >=2) ? `${(index - 1) * 30}ms` : '0ms',
            }}
          >
            <button
              onClick={(e) => handleActionClick(item.id, e)}
              aria-label={item.label}
              className={`
                         w-10 h-10
                         sm:w-11 sm:h-11
                         md:w-12 md:h-12
                         bg-white dark:bg-neutral-700 
                         shadow-md hover:shadow-lg dark:shadow-black/30
                         rounded-full flex items-center justify-center
                         transform transition-all duration-200 ease-in-out
                         group-hover:scale-110 focus-visible:scale-105
                         focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900
                        `}
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={`${item.label} icon`} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
              ) : item.iconComponent ? (
                <item.iconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700 dark:text-neutral-200" />
              ) : (
                <span className="text-xl sm:text-2xl" role="img" aria-hidden="true">{item.emoji}</span>
              )}
            </button>
            <div
              className={`absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5
                          bg-black/75 text-white dark:bg-neutral-800/85 dark:text-neutral-100
                          text-xs sm:text-sm font-medium rounded-lg shadow-lg whitespace-nowrap
                          transform transition-all duration-200 ease-in-out
                          opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                          translate-x-[8px] group-hover:translate-x-0 group-focus-within:translate-x-0
                          pointer-events-none z-50
                          ${!(menuIsOpen || index < 2) ? '!hidden' : ''}
                        `}
              role="tooltip"
            >
              {item.label}
              <div className="absolute top-1/2 -translate-y-1/2 -right-[5px] w-[10px] h-[10px]
                              bg-inherit transform rotate-45 -z-10"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingActionMenu;
