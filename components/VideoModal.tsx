import React, { useEffect, useRef } from 'react';

const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  videoTitle: string;
}

const VideoModalComponent: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc, videoTitle }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoSrc) return null;

  const getAutoplayVideoSrc = (src: string) => {
    try {
      const url = new URL(src);
      url.searchParams.set('autoplay', '1');
      url.searchParams.set('mute', '1'); 
      url.searchParams.set('rel', '0'); 
      return url.toString();
    } catch (error) {
      console.error("Invalid video URL for modal:", src, error);
      return src; // Fallback to original src if URL parsing fails
    }
  };
  
  const finalVideoSrc = getAutoplayVideoSrc(videoSrc);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="videoModalTitle"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"
      onClick={onClose} 
    >
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-4 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow" 
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
          <h2 id="videoModalTitle" className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 truncate pr-4">
            {videoTitle}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close video player"
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="aspect-square bg-black">
          <iframe
            src={finalVideoSrc}
            title={videoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
      <style>{`
        @keyframes modalShow {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalShow {
          animation: modalShow 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

const VideoModal = React.memo(VideoModalComponent);
export default VideoModal;