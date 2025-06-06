
import React from 'react';
import NotificationCard from './NotificationCard';
import { AppNotificationItem } from '../types';
// SparklesIcon import removed as it's no longer used

interface NotificationSectionProps {
  notifications: AppNotificationItem[];
  onAddNotification: () => void;
  onRemoveNotification: (id: string) => void;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  notifications,
  onAddNotification,
  onRemoveNotification,
}) => {
  return (
    <>
      <div className="fixed top-4 right-4 z-[100] flex flex-col items-end space-y-0 pointer-events-none">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <NotificationCard
              notification={notification}
              onClose={onRemoveNotification}
            />
          </div>
        ))}
      </div>

      <button
        onClick={onAddNotification}
        className="fixed bottom-4 left-4 z-[100]
                   w-14 h-14 rounded-full
                   flex items-center justify-center
                   bg-neutral-100/70 hover:bg-neutral-200/80 
                   dark:bg-neutral-700/70 dark:hover:bg-neutral-600/80
                   backdrop-blur-sm
                   text-amber-500 dark:text-amber-400 
                   shadow-lg dark:shadow-lg dark:shadow-black/30
                   transition-all duration-200 ease-in-out 
                   transform hover:scale-110 active:scale-95 
                   focus:outline-none focus:ring-2 
                   focus:ring-transparent dark:focus:ring-transparent 
                   focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800"
        aria-label="Show motivational quote"
      >
        {/* SparklesIcon removed */}
        <span className="text-2xl sm:text-3xl" role="img" aria-hidden="true">🔥</span>
      </button>
    </>
  );
};

export default NotificationSection;