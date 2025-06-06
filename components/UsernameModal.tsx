
import React, { useState, useEffect, useRef } from 'react';
import { UsernameModalProps } from '../types';
import Button from './Button';

const UserCircleIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => ( // Reduced icon size
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UsernameModal: React.FC<UsernameModalProps> = ({ isOpen, onSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = "username-modal-title";
  const descriptionId = "username-modal-description"; // Kept for aria-describedby if needed, though visual element is removed

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Delay focus slightly to ensure modal animation completes and input is visible
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      // Prevent closing via Escape key as per original behavior (modal is for initial setup)
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault(); 
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setError('Please enter a name (at least 2 characters).');
      inputRef.current?.focus();
      return;
    }
    if (trimmedName.length > 20) {
        setError('Name cannot exceed 20 characters.');
        inputRef.current?.focus();
        return;
    }
    setError(null);
    onSubmit(trimmedName);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-neutral-900/75 dark:bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId} // descriptionId is still used for aria, though the visual <p> is removed
    >
      <div
        ref={modalRef}
        className="bg-white/10 dark:bg-neutral-800/20 backdrop-filter backdrop-blur-lg 
                   p-4 sm:p-6 rounded-3xl shadow-2xl 
                   border border-white/20 dark:border-neutral-700/60
                   w-full max-w-xs mx-4 animate-ios-widget-modal-enter" // Reduced max-w and padding
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div 
            className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 
                       bg-primary dark:bg-primary-light" // Updated background, removed pulse animation
          >
            <UserCircleIcon className="w-8 h-8 text-white" /> {/* Icon color changed to white */}
          </div>
          {/* Removed h2:
          <h2 id={titleId} className="text-xl sm:text-2xl font-bold text-neutral-darker dark:text-neutral-50">
            Welcome to FitShark!
          </h2>
          */}
          {/* An invisible element to satisfy aria-labelledby if no visible title is present */}
          <h2 id={titleId} className="sr-only">Enter Your Name</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4"> {/* Reduced margin and spacing */}
          <div>
            <label htmlFor="username-input" className="sr-only"> 
              Your Name
            </label>
            <input
              ref={inputRef}
              type="text"
              name="username"
              id="username-input" // Changed ID to avoid conflict with form name
              className={`w-full px-3 py-2.5 border rounded-xl text-sm
                          text-neutral-800 dark:text-neutral-100 
                          bg-white/90 dark:bg-neutral-700/80 
                          placeholder-neutral-500 dark:placeholder-neutral-400
                          transition-all duration-200 ease-in-out
                          focus:outline-none 
                          focus:ring-2 focus:ring-opacity-50
                          focus:shadow-[0_0_8px_2px_rgba(var(--color-primary-glow-rgb),0.3)]
                          ${error 
                            ? 'border-red-500/70 dark:border-red-400/70 focus:ring-red-500/50 dark:focus:ring-red-400/50 focus:shadow-[0_0_8px_2px_rgba(239,68,68,0.3)]' 
                            : 'border-neutral-300/70 dark:border-neutral-600/70 focus:border-primary dark:focus:border-primary-light focus:ring-primary/50 dark:focus:ring-primary-light/50'
                          }`}
              placeholder="Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              aria-invalid={!!error}
              aria-describedby={error ? "username-error" : undefined}
            />
            {error && (
              <p id="username-error" className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert"> {/* Reduced error margin */}
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md" // Changed button size to md
            className="w-full !rounded-full !py-2.5 !text-sm" // Adjusted custom styles for md button
            disabled={name.trim().length < 2 || name.trim().length > 20}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
