
import React from 'react';
import { AppNotificationItem } from '../types';

const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface NotificationCardProps {
  notification: AppNotificationItem;
  onClose: (id: string) => void;
}

const NotificationCardComponent: React.FC<NotificationCardProps> = ({ notification, onClose }) => {
  const animationClass = notification.isExiting ? 'animate-notification-exit' : 'animate-notification-enter';
  const titleId = `notification-title-${notification.id}`;
  const messageId = `notification-message-${notification.id}`;

  return (
    <div
      className={`mb-3 ${animationClass} transition-all duration-300 ease-out
                  bg-slate-700/90 backdrop-blur-lg dark:bg-slate-800/90 dark:backdrop-blur-lg 
                  rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/40 p-4
                  w-full max-w-[calc(100vw-32px)] sm:max-w-xs md:w-72`}
      role="alert"
      aria-labelledby={titleId}
      aria-describedby={messageId}
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex justify-between items-start mb-1.5">
        <h4 id={titleId} className="text-md font-semibold text-white truncate flex-grow mr-2">
          {notification.title}
        </h4>
        <button
          onClick={() => onClose(notification.id)}
          className="text-slate-300 hover:text-white 
                     bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 
                     transition-colors p-1 rounded-full 
                     focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-700 dark:focus:ring-offset-slate-800 
                     flex-shrink-0 -mr-1 -mt-1"
          aria-label={`Close notification: ${notification.title}`}
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
      <p id={messageId} className="text-sm text-slate-200 dark:text-slate-300 break-words leading-relaxed">
        {notification.message}
      </p>
    </div>
  );
};

const NotificationCard = React.memo(NotificationCardComponent);
export default NotificationCard;
