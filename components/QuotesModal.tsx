import React, { useEffect, useRef } from 'react';

// Heroicons XMarkIcon
const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface QuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  title?: string;
}

const QuotesModal: React.FC<QuotesModalProps> = ({
  isOpen,
  onClose,
  quote,
  title = "Motivational Quote"
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = 'quotes-modal-title';

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      modalRef.current?.focus(); // Focus the modal for accessibility
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      // Ensure body scroll is restored if component unmounts while open,
      // or if it was already open when another modal caused body overflow to be hidden.
      if (document.body.style.overflow === 'hidden' && !document.querySelector('[role="dialog"][aria-modal="true"]:not([hidden])')) {
         document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 animate-fadeIn" // Semi-transparent overlay
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1} // Make the overlay focusable for Esc key
      ref={modalRef}
    >
      <div
        className="relative m-4 p-6 w-full max-w-md transform transition-all
                   bg-white/80 dark:bg-neutral-800/85 backdrop-blur-md
                   rounded-2xl shadow-2xl dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)]
                   animate-subtlePopIn" // Animation for modal appearance
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id={titleId} className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200
                       focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:ring-offset-2 dark:focus:ring-offset-neutral-700 dark:focus:ring-offset-opacity-80
                       transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-neutral-700 dark:text-neutral-200 text-lg leading-relaxed text-center">
          "{quote}"
        </p>
      </div>
    </div>
  );
};

export default QuotesModal;
