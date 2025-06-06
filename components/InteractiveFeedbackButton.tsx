
import React from 'react';

interface InteractiveFeedbackButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

const InteractiveFeedbackButton: React.FC<InteractiveFeedbackButtonProps> = ({
  onClick,
  className = '',
  children = 'Feedback',
  ariaLabel = 'Submit feedback'
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold text-white
                  bg-primary hover:bg-primary-dark dark:bg-primary-light dark:text-neutral-900 dark:hover:bg-primary
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-neutral-800 dark:focus:ring-primary-light
                  transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95
                  ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default InteractiveFeedbackButton;
