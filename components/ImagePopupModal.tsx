
import React, { useEffect, useRef, useState } from 'react';
// import styled, { keyframes } from 'styled-components'; // CarouselCard specific styles removed
import LoaderComponent from './Loader'; 

const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

interface ImagePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

const SWIPE_THRESHOLD = 50; 

const ImagePopupModalComponent: React.FC<ImagePopupModalProps> = ({ isOpen, onClose, images, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [transitionAnimationClass, setTransitionAnimationClass] = useState('animate-enlargedImageEnterInitial');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  
  const touchStartXRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen && images && images.length > 0) {
      setCurrentImageIndex(0);
      setTransitionAnimationClass('animate-enlargedImageEnterInitial');
      setIsImageLoading(true); 
    }
  }, [isOpen, images]);
  
  useEffect(() => {
    if (isOpen && images && images.length > 0 && images[currentImageIndex]) {
        setIsImageLoading(true);
    } else {
        setIsImageLoading(false);
    }
  }, [isOpen, currentImageIndex, images]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || !(images && images.length > 0)) return;

      if (event.key === 'Escape') {
        onClose(); 
      } else if (images.length > 1) {
        if (event.key === 'ArrowLeft') {
          showPrevImage();
        } else if (event.key === 'ArrowRight') {
          showNextImage();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (isOpen) { 
          document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose, images, currentImageIndex]); // Added currentImageIndex to dependencies for nav functions


  const showNextImage = () => {
    if (!(images && images.length > 1) || currentImageIndex >= images.length - 1) return;
    setTransitionAnimationClass('animate-enlargedImageEnterNext');
    setCurrentImageIndex(currentImageIndex + 1);
  };

  const showPrevImage = () => {
     if (!(images && images.length > 1) || currentImageIndex <= 0) return;
    setTransitionAnimationClass('animate-enlargedImageEnterPrev');
    setCurrentImageIndex(currentImageIndex - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!(images && images.length > 1)) return;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!(images && images.length > 1) || touchStartXRef.current === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) { 
        showNextImage();
      } else { 
        showPrevImage();
      }
    }
    touchStartXRef.current = 0; 
  };
  
  const currentImageSrc = (images && images.length > 0) ? images[currentImageIndex] : null;

  if (!isOpen) return null;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || "Image viewer"}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn" 
        onClick={onClose} 
        style={{ perspective: '1000px' }}
      >
        <div
          ref={modalRef}
          className="relative"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
            <button
                onClick={onClose}
                aria-label="Close image viewer"
                className="absolute top-2 right-2 z-[112] text-white bg-neutral-800/60 hover:bg-neutral-800/90 dark:bg-black/60 dark:hover:bg-black/80 rounded-full p-1.5 sm:p-2 shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {images && images.length > 1 && (
                <button
                onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
                disabled={currentImageIndex === 0}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 bg-neutral-800/60 hover:bg-neutral-800/90 dark:bg-black/60 dark:hover:bg-black/80 text-white rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:scale-110 transition-transform" />
                </button>
            )}
            
            {images && images.length > 0 ? (
                <div
                    key={currentImageIndex} 
                    className={`aspect-square w-auto h-auto max-w-2xl max-h-[80vh] bg-black rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden ${transitionAnimationClass}`}
                >
                {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10" style={{fontSize: '10px'}}> {/* Slightly smaller loader for compact view */}
                    <LoaderComponent />
                    </div>
                )}
                {currentImageSrc && (
                    <img
                        src={currentImageSrc}
                        alt={`${title} - Image ${currentImageIndex + 1}`}
                        className={`block w-full h-full object-contain rounded-md transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => {
                        setIsImageLoading(false);
                        console.error(`Failed to load image: ${currentImageSrc}`);
                        }}
                    />
                )}
                </div>
            ) : (
                <div className="p-10 bg-neutral-800 rounded-xl text-center text-neutral-300 max-w-sm"> {/* Max width for no image message */}
                    No images to display.
                </div>
            )}

            {images && images.length > 1 && (
                <button
                onClick={(e) => { e.stopPropagation(); showNextImage(); }}
                disabled={currentImageIndex === images.length - 1}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 bg-neutral-800/60 hover:bg-neutral-800/90 dark:bg-black/60 dark:hover:bg-black/80 text-white rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:scale-110 transition-transform" />
                </button>
            )}
        </div>
      </div>

      <style>{`
        /* Removed custom scrollbar styles as the scrollable container is gone */
        
        @keyframes enlargedImageEnterInitial {
          from { opacity: 0; transform: translateY(20px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-enlargedImageEnterInitial {
          animation: enlargedImageEnterInitial 0.3s ease-out forwards;
        }

        @keyframes enlargedImageEnterNext {
          from { opacity: 0; transform: translateX(30%) scale(0.9) rotateY(-15deg); } /* Adjusted transform */
          to { opacity: 1; transform: translateX(0) scale(1) rotateY(0deg); }
        }
        .animate-enlargedImageEnterNext {
          animation: enlargedImageEnterNext 0.3s ease-out forwards;
        }

        @keyframes enlargedImageEnterPrev {
          from { opacity: 0; transform: translateX(-30%) scale(0.9) rotateY(15deg); } /* Adjusted transform */
          to { opacity: 1; transform: translateX(0) scale(1) rotateY(0deg); }
        }
        .animate-enlargedImageEnterPrev {
          animation: enlargedImageEnterPrev 0.3s ease-out forwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-enlargedImageEnterInitial,
          .animate-enlargedImageEnterNext,
          .animate-enlargedImageEnterPrev {
            animation-name: fadeIn; 
            animation-duration: 0.2s;
          }
        }
      `}</style>
    </>
  );
};

const ImagePopupModal = React.memo(ImagePopupModalComponent);
export default ImagePopupModal;
