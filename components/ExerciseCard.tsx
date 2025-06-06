import React from 'react';
import { Exercise } from '../types';
import Loader from './Loader'; // Import the new Loader component

interface ExerciseCardProps {
  exercise: Exercise;
  onWatchVideo: (videoSrc: string, videoTitle: string, exerciseId: string) => void;
  onShowImages?: (exerciseId: string, exerciseName: string) => void; // New prop for image popup
  hideImageForCategory?: boolean;
  hideExerciseIconOnCard?: boolean;
  isLoading?: boolean;
}

const VideoPlaceholderIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16 text-neutral-400 dark:text-neutral-500" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);

const PlayIconSolid: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
  </svg>
);

const ImageIconSolid: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M1.5 3A1.5 1.5 0 000 4.5v11A1.5 1.5 0 001.5 17h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0018.5 3h-17zm0 1.5h17V10H12a2 2 0 00-2 2v1.5H1.5V4.5zM5 7a1 1 0 011-1h8a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1V7zm13-1a.5.5 0 00-.5-.5h-2a.5.5 0 000 1h2a.5.5 0 00.5-.5zM1.5 11.5H10V12a1 1 0 011-1h1.5v-2a.5.5 0 00-.5-.5H3a.5.5 0 00-.5.5v2.5A1.5 1.5 0 004 14h6v1.5H1.5v-4z" clipRule="evenodd" />
  </svg>
);


const MetadataItem: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="text-center px-2">
      <p className="text-xs uppercase text-neutral-500 dark:text-neutral-400 font-medium tracking-wider">{label}</p>
      <p className="text-sm text-neutral-700 dark:text-neutral-200 capitalize">{value}</p>
    </div>
  );
};

const ExerciseCardComponent: React.FC<ExerciseCardProps> = ({ exercise, onWatchVideo, onShowImages, hideImageForCategory, hideExerciseIconOnCard, isLoading }) => {
  const isDemoExercise = exercise.name.toLowerCase() === 'view workouts' && !!onShowImages;
  const hasVideo = !!exercise.videoSrc && exercise.videoSrc.trim() !== '';

  const handleInteraction = () => {
    if (isLoading) return;
    if (isDemoExercise && onShowImages) {
      onShowImages(exercise.id, exercise.name);
    } else if (hasVideo && exercise.videoSrc) {
      onWatchVideo(exercise.videoSrc, exercise.name, exercise.id);
    }
  };
  
  const handleKeyDownInteraction = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleInteraction();
    }
  };

  if (hideImageForCategory) {
    const showIcon = !hideExerciseIconOnCard;
    if (isLoading) {
      return (
        <div className="exercise-card-wrapper bg-white dark:bg-neutral-700 rounded-lg shadow-md dark:shadow-neutral-900/50 flex flex-col items-center justify-center p-4 h-40 transition-all duration-300 ease-out hover:shadow-xl dark:hover:shadow-primary-dark/40 hover:scale-[1.015]" style={{fontSize: '6px'}}>
          <Loader />
        </div>
      );
    }
    return (
      <div
        className={`exercise-card-wrapper bg-white dark:bg-neutral-700 rounded-lg shadow-md dark:shadow-neutral-900/50 
                   flex flex-col items-center justify-center p-4 min-h-[10rem]
                   transition-all duration-150 ease-in-out
                   hover:shadow-xl dark:hover:shadow-primary-dark/40 hover:scale-[1.015]
                   ${(hasVideo || isDemoExercise) ? 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-neutral-800' : 'select-none'}`}
        onClick={handleInteraction}
        onKeyDown={handleKeyDownInteraction}
        role={(hasVideo || isDemoExercise) ? "button" : "article"} 
        tabIndex={(hasVideo || isDemoExercise) ? 0 : undefined}
        aria-label={isDemoExercise ? `View images for ${exercise.name}` : (hasVideo ? `Watch demo for ${exercise.name}` : exercise.name)}
      >
        <div className="text-center">
          {showIcon && exercise.icon && (
            <span className="text-4xl block mb-2" aria-hidden="true">
              {exercise.icon}
            </span>
          )}
          <h3 className="text-md font-semibold text-neutral-darker dark:text-neutral-100 leading-tight">
            {exercise.name}
          </h3>
        </div>
      </div>
    );
  }

  const showCustomAnimatedButton = (hasVideo && exercise.videoSrc) || isDemoExercise;
  const anyButtonAboveViews = showCustomAnimatedButton;

  const imageType = exercise.imageSrc.endsWith('.png') ? 'image/png' : 'image/jpeg';


  return (
    <div className="exercise-card-wrapper bg-white dark:bg-neutral-700 rounded-lg shadow-md dark:shadow-neutral-900/50 overflow-hidden flex flex-col h-full transition-all duration-300 ease-out hover:shadow-xl dark:hover:shadow-primary-dark/40 hover:scale-[1.015]">
      <div 
        className={`relative aspect-w-16 aspect-h-9 w-full bg-neutral-200 dark:bg-neutral-600 group ${(hasVideo || isDemoExercise) && !isLoading ? 'cursor-pointer' : ''}`}
        onClick={!isLoading ? handleInteraction : undefined}
        onKeyDown={!isLoading ? handleKeyDownInteraction : undefined}
        role={(hasVideo || isDemoExercise) && !isLoading ? "button" : undefined}
        tabIndex={(hasVideo || isDemoExercise) && !isLoading ? 0 : undefined}
        aria-label={!isLoading ? (isDemoExercise ? `View images for ${exercise.name}` : (hasVideo ? `Play video demo for ${exercise.name}` : (exercise.imageAlt || `Image for ${exercise.name}`))) : (exercise.imageAlt || `Image for ${exercise.name}`)}

      >
        {isLoading ? (
           <div className="w-full h-full flex items-center justify-center" style={{fontSize: '8px'}}>
             <Loader />
           </div>
        ) : (
          <picture>
            {exercise.imageWebPSrc && <source srcSet={exercise.imageWebPSrc} type="image/webp" />}
            {exercise.imageSrc && <source srcSet={exercise.imageSrc} type={imageType} />}
            {exercise.imageSrc ? (
              <img
                src={exercise.imageSrc}
                alt={exercise.imageAlt || `Image for ${exercise.name}`}
                className="w-full h-full object-cover"
                width="320" 
                height="180"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                 <VideoPlaceholderIcon />
              </div>
            )}
          </picture>
        )}
        {((hasVideo && !isDemoExercise) || isDemoExercise) && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 ease-in-out">
            {isDemoExercise ? 
              <ImageIconSolid className="w-12 h-12 text-white opacity-0 group-hover:opacity-90 transform scale-75 group-hover:scale-100 transition-all duration-200 ease-in-out" />
              :
              <PlayIconSolid className="w-12 h-12 text-white opacity-0 group-hover:opacity-90 transform scale-75 group-hover:scale-100 transition-all duration-200 ease-in-out" />
            }
          </div>
        )}
      </div>
      
      <div className={`py-3 px-4 border-b border-gray-200 dark:border-neutral-600`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <MetadataItem label="Type" value={exercise.exerciseType} />
          <MetadataItem label="Equipment" value={exercise.equipment} />
          <MetadataItem label="Mechanics" value={exercise.mechanics} />
          <MetadataItem label="Exp. Level" value={exercise.experienceLevel} />
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-md font-semibold text-neutral-darker dark:text-neutral-50 mb-2 text-left leading-tight flex items-center">
          {exercise.icon && <span className="mr-2 text-xl" aria-hidden="true">{exercise.icon}</span>}
          {exercise.name}
        </h3>
        
        {exercise.description && (
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-3 text-left leading-snug">
                {exercise.description.length > 100 ? exercise.description.substring(0, 97) + "..." : exercise.description}
            </p>
        )}
        
        {showCustomAnimatedButton && (
          <div className={`mt-3 text-left`}>
            <button
              className="button" 
              onClick={(e) => {
                e.stopPropagation(); 
                handleInteraction();
              }}
              disabled={isLoading || !(hasVideo || isDemoExercise)} 
              aria-label={isDemoExercise ? `View images for ${exercise.name}` : `Watch demo for ${exercise.name}`}
            >
              {isLoading ? 'Loading...' : (isDemoExercise ? 'View Images' : 'Watch Demo')}
            </button>
          </div>
        )}
        
        <div className="flex-grow"></div> 

        <div className={`text-left ${anyButtonAboveViews ? 'mt-2' : 'mt-auto pt-2'}`}>
          {(exercise.views || exercise.comments) && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {exercise.views}{exercise.views && exercise.comments ? ' • ' : ''}{exercise.comments}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ExerciseCard = React.memo(ExerciseCardComponent);
export default ExerciseCard;