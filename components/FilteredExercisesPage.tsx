

import React, { useState, useEffect } from 'react';
import { FilteredExercisesPageProps } from '../types';
// ExerciseCard import removed as it's no longer directly used here
import VideoModal from './VideoModal';
import InteractiveArrowButton from './AbRegionSelector'; 
import { CATEGORY_ACCENT_COLORS, WORKOUT_CATEGORY_ICONS } from '../constants';
import IOSNotificationStyleExerciseList from './IOSNotificationStyleExerciseList'; // New Import

const addImageKitTransformations = (url: string): string => {
  if (!url || !url.includes('ik.imagekit.io')) return url;
  const transformations = 'tr=f-auto,q-auto:good';
  if (url.includes('?')) {
    return `${url}&${transformations}`;
  }
  return `${url}?${transformations}`;
};

const FilteredExercisesPage: React.FC<FilteredExercisesPageProps> = ({ equipment, muscleGroup, exercises, onNavigateHome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState('');
  const [modalVideoTitle, setModalVideoTitle] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [equipment, muscleGroup]);

  const handleOpenVideoModal = (videoSrc: string, videoTitle: string) => {
    setModalVideoSrc(videoSrc);
    setModalVideoTitle(videoTitle);
    setIsModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsModalOpen(false);
    setModalVideoSrc('');
    setModalVideoTitle('');
  };

  const accents = CATEGORY_ACCENT_COLORS[muscleGroup.id] || CATEGORY_ACCENT_COLORS['default'];
  const categoryIcon = WORKOUT_CATEGORY_ICONS[muscleGroup.id] || equipment.icon; 

  const pageStyle: React.CSSProperties = {}; 
  let pageClassName = "min-h-screen dark:bg-neutral-900"; 

  const muscleGroupBackgrounds: { [key: string]: string } = {
    'ab-workouts': addImageKitTransformations('https://ik.imagekit.io/coxftihos/back%20workouts%20/bgimages/abs.jpg?updatedAt=1748606628772'),
    'cardio': addImageKitTransformations('https://ik.imagekit.io/coxftihos/back%20workouts%20/bgimages/cardio.jpg?updatedAt=1748606628840'),
    'chest-workouts': addImageKitTransformations('https://ik.imagekit.io/coxftihos/back%20workouts%20/bgimages/chest.jpg?updatedAt=1748606631949'),
    'back-workouts': addImageKitTransformations('https://ik.imagekit.io/coxftihos/back%20workouts%20/bgimages/cardo.jpg?updatedAt=1748606988183'),
    'bicep-workouts': addImageKitTransformations('https://ik.imagekit.io/coxftihos/back%20workouts%20/bgimages/bicep3.jpg?updatedAt=1748606959513'),
    'shoulder-workouts': addImageKitTransformations('https://ik.imagekit.io/coxftihos/back%20workouts%20/bgimages/shoulder.jpg?updatedAt=1748606637074'),
    'leg-workouts': addImageKitTransformations('https://ik.imagekit.io/coxftihos/back%20workouts%20/bgimages/legs.jpg?updatedAt=1748606632018'),
    'tricep-workouts': addImageKitTransformations('https://ik.imagekit.io/coxftihos/back%20workouts%20/bgimages/tricep.jpg?updatedAt=1748606638178'),
  };

  const isDumbbellTargetMuscleGroupPage = equipment.id === 'dumbbell' &&
    ['chest-workouts', 'back-workouts', 'shoulder-workouts', 'leg-workouts', 'bicep-workouts', 'tricep-workouts', 'ab-workouts'].includes(muscleGroup.id);
  
  const isBarbellTargetMuscleGroupPage = equipment.id === 'barbell' &&
    ['chest-workouts', 'back-workouts', 'shoulder-workouts', 'leg-workouts', 'bicep-workouts', 'tricep-workouts', 'ab-workouts'].includes(muscleGroup.id);

  let specificBackgroundImageUrl = null;

  if (isBarbellTargetMuscleGroupPage) {
    specificBackgroundImageUrl = addImageKitTransformations('https://ik.imagekit.io/coxftihos/gravity-defying-wonders-bf-2160x3840.jpg?updatedAt=1749196226338');
    pageStyle.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('${specificBackgroundImageUrl}')`;
  } else if (isDumbbellTargetMuscleGroupPage) {
    specificBackgroundImageUrl = addImageKitTransformations('https://ik.imagekit.io/coxftihos/ghost-of-tsushima-4k-2025-game-hw-2160x3840.jpg?updatedAt=1749203099348');
    pageStyle.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('${specificBackgroundImageUrl}')`;
  } else if (equipment.id === 'barbell') { // General barbell fallback for muscle groups NOT in the target list
    specificBackgroundImageUrl = addImageKitTransformations('https://ik.imagekit.io/coxftihos/main%20images/the-dark-wanderer-hv-5120x2880.jpg?updatedAt=1749122865255');
    pageStyle.backgroundImage = `url('${specificBackgroundImageUrl}')`;
  } else if (equipment.id === 'dumbbell') { // General dumbbell fallback for muscle groups NOT in the target list
    specificBackgroundImageUrl = addImageKitTransformations('https://ik.imagekit.io/coxftihos/main%20images/the-lunar-guardian-1g-3840x2400.jpg?updatedAt=1749121991238');
    pageStyle.backgroundImage = `url('${specificBackgroundImageUrl}')`;
  } else if (muscleGroupBackgrounds[muscleGroup.id]) {
    specificBackgroundImageUrl = muscleGroupBackgrounds[muscleGroup.id]; 
    pageStyle.backgroundImage = `url('${specificBackgroundImageUrl}')`;
  }


  if (specificBackgroundImageUrl) {
    pageStyle.backgroundSize = 'cover';
    pageStyle.backgroundPosition = 'center';
    pageStyle.backgroundRepeat = 'no-repeat';
    pageStyle.backgroundAttachment = 'fixed';
    pageClassName = "min-h-screen"; 
  } else {
     pageClassName += " bg-neutral-100 dark:bg-neutral-800"; 
  }

  const listTitle = `${equipment.name} ${muscleGroup.name} Exercises`;

  const handleExerciseSelection = (exercise: import('../types').Exercise) => {
    if (exercise.videoSrc) {
        handleOpenVideoModal(exercise.videoSrc, exercise.name);
    } else {
        alert(`Details for ${exercise.name} (no video available). Consider adding a video source or specific image gallery for this exercise.`);
    }
  };
  
  const headerHasDarkBg = !!pageStyle.backgroundImage;

  const headerTextColorClass = headerHasDarkBg
    ? 'text-white'
    : (accents.pageTitleColor || 'text-neutral-darker dark:text-neutral-50');

  const headerSubtitleColorClass = headerHasDarkBg
    ? 'text-neutral-100 dark:text-neutral-200'
    : 'text-neutral-dark dark:text-neutral-300';
    
  const noExercisesTextColorClass = headerHasDarkBg
    ? 'text-neutral-100 dark:text-neutral-200'
    : 'text-neutral-dark dark:text-neutral-300';

  return (
    <>
      <div className={pageClassName} style={pageStyle}>
        <div className={`${accents.bar} h-2`}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <InteractiveArrowButton
            onClick={onNavigateHome}
            ariaLabel="Back to home or previous selection"
            className="mb-6"
          />

          <header className={`text-center mb-10 ${headerHasDarkBg ? 'bg-black/40 dark:bg-neutral-900/50 backdrop-blur-sm p-4 rounded-lg' : ''}`}>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${headerTextColorClass} mb-2`}>
              {categoryIcon && <span className="mr-2 sm:mr-3 text-3xl sm:text-4xl md:text-5xl align-middle" aria-hidden="true">{categoryIcon}</span>}
              {listTitle}
            </h1>
            <p className={`text-md sm:text-lg ${headerSubtitleColorClass} max-w-2xl mx-auto`}>
              {`Tap to expand and see exercises for ${muscleGroup.name.toLowerCase()} using ${equipment.name.toLowerCase()}.`}
            </p>
          </header>

          <section className="mt-6">
            {exercises.length > 0 ? (
              <IOSNotificationStyleExerciseList
                listTitle={listTitle}
                exercises={exercises}
                onExerciseSelect={handleExerciseSelection}
                accentColorClass={accents.text || 'text-primary dark:text-primary-light'}
              />
            ) : (
              <div className="w-full max-w-md mx-auto p-4">
                <div className={`${noExercisesTextColorClass} text-center py-10 bg-white/60 dark:bg-neutral-800/70 backdrop-blur-sm rounded-lg shadow`}>
                  No exercises found for this specific combination. Try other selections!
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseVideoModal}
        videoSrc={modalVideoSrc}
        videoTitle={modalVideoTitle}
      />
    </>
  );
};

export default FilteredExercisesPage;