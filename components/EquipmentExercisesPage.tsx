
import React, { useState, useEffect } from 'react';
import { EquipmentPageProps, Exercise } from '../types'; 
import VideoModal from './VideoModal';
import IOSNotificationStyleExerciseList from './IOSNotificationStyleExerciseList'; // New Import
import InteractiveArrowButton from './AbRegionSelector'; 
// Button import removed as it's not used for the primary list display anymore

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 mr-2" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const EquipmentExercisesPage: React.FC<EquipmentPageProps> = ({ equipment, exercises, onNavigateHome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState('');
  const [modalVideoTitle, setModalVideoTitle] = useState('');
  // loadingVideoForExerciseId state removed as IOSNotificationStyleExerciseList handles its own display without individual item loaders visible to this parent.

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [equipment]);


  const handleOpenVideoModal = (videoSrc: string, videoTitle: string) => {
    setModalVideoSrc(videoSrc);
    setModalVideoTitle(videoTitle);
    setIsModalOpen(true);
  };
  
  const handleExerciseSelectionFromList = (exercise: Exercise) => {
    if (exercise.videoSrc) {
        handleOpenVideoModal(exercise.videoSrc, exercise.name);
    } else {
        // Optionally, handle exercises without videos, e.g., show details or an alert
        alert(`Details for ${exercise.name} (no video available).`);
    }
  };

  const handleCloseVideoModal = () => {
    setIsModalOpen(false);
    setModalVideoSrc('');
    setModalVideoTitle('');
  };

  const listTitle = `${equipment.name} Exercises`;
  const accentColor = "text-green-600 dark:text-green-400";

  return (
    <>
      <div className="bg-neutral-light dark:bg-neutral-800 min-h-screen">
        <div className="bg-green-500 dark:bg-green-400 h-2"></div> 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="mb-6"> {/* Wrapper for the button to ensure proper layout */}
            <InteractiveArrowButton
                onClick={onNavigateHome}
                ariaLabel="Back to home or previous selection"
             />
          </div>
          

          <header className="text-center mb-10">
            <h1 className={`text-4xl sm:text-5xl font-bold text-neutral-darker dark:text-neutral-50 mb-2 ${accentColor}`}>
              {equipment.icon && <span className="mr-3 text-4xl sm:text-5xl align-middle" aria-hidden="true">{equipment.icon}</span>}
              {listTitle}
            </h1>
            <p className="text-lg text-neutral-dark dark:text-neutral-300 max-w-2xl mx-auto">
              {`Explore effective exercises for ${equipment.name.toLowerCase()}. Tap to expand the list below.`}
            </p>
          </header>

          <section className="mt-6">
            {exercises.length > 0 ? (
              <IOSNotificationStyleExerciseList
                listTitle={listTitle}
                exercises={exercises}
                onExerciseSelect={handleExerciseSelectionFromList}
                accentColorClass={accentColor}
              />
            ) : (
              <div className="w-full max-w-md mx-auto p-4">
                <div className="text-neutral-dark dark:text-neutral-300 text-center py-10 bg-white/60 dark:bg-neutral-800/70 backdrop-blur-sm rounded-lg shadow">
                  No exercises found for {equipment.name} yet. Please check back later.
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

export default EquipmentExercisesPage;
