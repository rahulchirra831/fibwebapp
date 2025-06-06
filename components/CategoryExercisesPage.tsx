
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { CategoryPageProps, Exercise, WorkoutCategory, AbFocusRegion } from '../types';
import ExerciseCard from './ExerciseCard';
import InteractiveArrowButton from './AbRegionSelector';
import VideoModal from './VideoModal';
import ImagePopupModal from './ImagePopupModal';
import CategorySelectorDropdown from './CategorySelectorDropdown';
import TrainingParametersTable from './TrainingParametersTable'; // New import
import {
  AB_FOCUS_REGIONS_DATA,
  CARDIO_SUB_CATEGORIES_DATA,
  CHEST_SUB_CATEGORIES_DATA,
  BACK_SUB_CATEGORIES_DATA,
  BICEP_SUB_CATEGORIES_DATA,
  SHOULDER_SUB_CATEGORIES_DATA,
  LEG_SUB_CATEGORIES_DATA,
  TRICEP_SUB_CATEGORIES_DATA,
  CATEGORY_ACCENT_COLORS,
  WORKOUT_CATEGORY_ICONS,
  DEMO_EXERCISE_IMAGES,
  BACK_WORKOUTS_DEMO_IMAGES,
  CHEST_WORKOUTS_DEMO_IMAGES,
  BICEP_WORKOUTS_DEMO_IMAGES,
  SHOULDER_WORKOUTS_DEMO_IMAGES,
  LEG_WORKOUTS_DEMO_IMAGES,
  TRICEP_WORKOUTS_DEMO_IMAGES,
  CARDIO_WORKOUTS_DEMO_IMAGES
} from '../constants';

// Styled component for the "View Workouts" button
const SymbolStreamContainer = styled.span`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  span {
    position: absolute;
    color: var(--symbol-color-hover);
    font-size: var(--symbol-font-size, 0.9em);
    opacity: 0;
    animation-name: streamSymbolsAnimation;
    animation-duration: var(--symbol-animation-duration, 1.8s);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    top: 110%; /* Start below */
  }
`;

const StyledViewWorkoutsButton = styled.button`
  --button-font-family: 'Inter', sans-serif;
  --button-font-size: 1.1rem;
  --button-padding: 0.8rem 1.8rem;
  --button-border-radius: 8px;
  --button-shadow-normal: 0 4px 10px rgba(0, 0, 0, 0.2);
  --button-shadow-hover: 0 6px 15px rgba(0, 0, 0, 0.3);
  
  --button-bg-normal: #2C2C2C; /* Dark gray */
  --button-text-normal: #EAEAEA; /* Light gray */
  
  --button-bg-hover: #FFD700; /* Yellow */
  --button-text-hover: #222222; /* Dark text for yellow bg */
  
  --symbol-color-hover: var(--button-text-hover);
  --symbol-font-size: 0.9em;
  --symbol-animation-duration: 1.5s;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--button-font-family);
  font-size: var(--button-font-size);
  font-weight: 600;
  padding: var(--button-padding);
  border-radius: var(--button-border-radius);
  border: none;
  cursor: pointer;
  background-color: var(--button-bg-normal);
  color: var(--button-text-normal);
  box-shadow: var(--button-shadow-normal);
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden; /* To clip symbols */
  z-index: 1; /* Ensure button content is above symbol stream if symbols are also z-indexed */

  .button-text-content {
    position: relative;
    z-index: 2; /* Text above symbols */
  }

  &:hover {
    background-color: var(--button-bg-hover);
    color: var(--button-text-hover);
    box-shadow: var(--button-shadow-hover);

    ${SymbolStreamContainer} span {
      animation-play-state: running;
    }
  }

  /* Individual symbol animations */
  ${SymbolStreamContainer} span:nth-of-type(1) { left: 15%; animation-delay: 0s; }
  ${SymbolStreamContainer} span:nth-of-type(2) { left: 35%; animation-delay: 0.25s; }
  ${SymbolStreamContainer} span:nth-of-type(3) { left: 55%; animation-delay: 0.5s; }
  ${SymbolStreamContainer} span:nth-of-type(4) { left: 75%; animation-delay: 0.75s; }
  ${SymbolStreamContainer} span:nth-of-type(5) { left: 45%; animation-delay: 1s; }


  @keyframes streamSymbolsAnimation {
    0% { top: 100%; opacity: 0; transform: scale(0.8); }
    10% { opacity: 1; transform: scale(1); }
    90% { opacity: 1; transform: scale(1); }
    100% { top: -10%; opacity: 0; transform: scale(0.8); }
  }

  @media (max-width: 640px) { /* sm breakpoint or adjust as needed */
    font-size: 1rem;
    padding: 0.7rem 1.5rem;
  }
`;


const getSubCategoryData = (categoryId: string): WorkoutCategory[] | AbFocusRegion[] => {
  switch (categoryId) {
    case 'ab-workouts': return AB_FOCUS_REGIONS_DATA;
    case 'cardio': return CARDIO_SUB_CATEGORIES_DATA;
    case 'chest-workouts': return CHEST_SUB_CATEGORIES_DATA;
    case 'back-workouts': return BACK_SUB_CATEGORIES_DATA;
    case 'bicep-workouts': return BICEP_SUB_CATEGORIES_DATA;
    case 'shoulder-workouts': return SHOULDER_SUB_CATEGORIES_DATA;
    case 'leg-workouts': return LEG_SUB_CATEGORIES_DATA;
    case 'tricep-workouts': return TRICEP_SUB_CATEGORIES_DATA;
    default: return [];
  }
};

const DIRECT_VIEW_CATEGORIES = [
  'cardio', 'chest-workouts', 'back-workouts', 
  'bicep-workouts', 'shoulder-workouts', 'leg-workouts', 
  'tricep-workouts', 'ab-workouts'
];


const CATEGORIES_TO_HIDE_PAGE_AND_EXERCISE_ICONS = [
  'cardio',
  'chest-workouts',
  'back-workouts',
  'bicep-workouts',
  'shoulder-workouts',
  'leg-workouts',
  'tricep-workouts',
];

const CATEGORIES_FOR_CLICK_OUTSIDE_HIDE = [
  'cardio',
  'chest-workouts', 'back-workouts',
  'bicep-workouts', 'shoulder-workouts', 'leg-workouts',
  'tricep-workouts',
];

const addImageKitTransformations = (url: string): string => {
  if (!url || !url.includes('ik.imagekit.io')) return url;
  const transformations = 'tr=f-auto,q-auto:good';
  if (url.includes('?')) {
    return `${url}&${transformations}`;
  }
  return `${url}?${transformations}`;
};

const INFERNO_BACKGROUND_CATEGORIES = [
  'cardio',
  'back-workouts',
  'bicep-workouts',
  'leg-workouts',
  'tricep-workouts',
  'ab-workouts',
  'shoulder-workouts',
  'chest-workouts' // Added chest-workouts
];

const CategoryExercisesPage: React.FC<CategoryPageProps> = ({ category, exercises, onNavigateHome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState('');
  const [modalVideoTitle, setModalVideoTitle] = useState('');
  
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [imagePopupImages, setImagePopupImages] = useState<string[]>([]);
  const [imagePopupTitle, setImagePopupTitle] = useState('');

  const [selectedSubCategory, setSelectedSubCategory] = useState<WorkoutCategory | AbFocusRegion | null>(null);
  const [loadingInteractionForExerciseId, setLoadingInteractionForExerciseId] = useState<string | null>(null);
  const [showExerciseGrid, setShowExerciseGrid] = useState<boolean>(true);
  const [showTrainingParamsWidget, setShowTrainingParamsWidget] = useState<boolean>(false); 

  const subCategoryDataSource = getSubCategoryData(category.id);
  const accents = CATEGORY_ACCENT_COLORS[category.id] || CATEGORY_ACCENT_COLORS['default'];
  const categoryIcon = WORKOUT_CATEGORY_ICONS[category.id] || '';
  const shouldHideImage = true;


  const handleOpenImagePopup = useCallback((exerciseId: string, exerciseName: string, customImages?: string[]) => {
    setLoadingInteractionForExerciseId(exerciseId);
  
    const shouldShowParams = exerciseId.endsWith('-direct-view') ||
                           (selectedSubCategory && exercises.find(ex => ex.id === exerciseId && ex.name.toLowerCase() === 'view workouts')) ||
                           customImages;
  
    if (shouldShowParams) {
        setShowTrainingParamsWidget(true);
    } else {
        setShowTrainingParamsWidget(false);
    }
  
    setTimeout(() => {
        let imagesToShow = customImages || [];
        let titleToShow = exerciseName; // This will be "{Category Name} Overview" for direct views
  
        if (!customImages && !exerciseId.endsWith('-direct-view')) {
            const currentExercise = exercises.find(ex => ex.id === exerciseId);
            titleToShow = currentExercise ? `${currentExercise.name} - Image Gallery` : `${exerciseName} - Image Gallery`;
            if (currentExercise && currentExercise.name.toLowerCase() === 'view workouts') {
                 // This logic remains for "View Workouts" button clicks if not a direct view category
                switch(category.id) { // This category.id might be from a non-direct view context if button is shown
                    case 'ab-workouts': imagesToShow = DEMO_EXERCISE_IMAGES; break;
                    case 'back-workouts': imagesToShow = BACK_WORKOUTS_DEMO_IMAGES; break;
                    case 'chest-workouts': imagesToShow = CHEST_WORKOUTS_DEMO_IMAGES; break;
                    case 'bicep-workouts': imagesToShow = BICEP_WORKOUTS_DEMO_IMAGES; break;
                    case 'shoulder-workouts': imagesToShow = SHOULDER_WORKOUTS_DEMO_IMAGES; break;
                    case 'leg-workouts': imagesToShow = LEG_WORKOUTS_DEMO_IMAGES; break;
                    case 'tricep-workouts': imagesToShow = TRICEP_WORKOUTS_DEMO_IMAGES; break;
                    case 'cardio': imagesToShow = CARDIO_WORKOUTS_DEMO_IMAGES; break; 
                    default: imagesToShow = DEMO_EXERCISE_IMAGES; 
                }
            }
        }
        
        setImagePopupImages(imagesToShow.map(addImageKitTransformations));
        setImagePopupTitle(titleToShow);
        setIsImagePopupOpen(true);
        // setLoadingInteractionForExerciseId(null); // Keep loading until modal is closed or interaction ends
    }, 100); 
  }, [exercises, selectedSubCategory, category.id]);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadingInteractionForExerciseId(null); 
    setShowTrainingParamsWidget(false); 
    setShowExerciseGrid(true); 

    if (DIRECT_VIEW_CATEGORIES.includes(category.id)) {
      let subCategoriesToUse: WorkoutCategory[] | AbFocusRegion[] = [];
      let demoImagesToUse: string[] = [];
      // Standardized title for direct view galleries
      let galleryPopupTitle = `${category.name} Overview`; 

      switch (category.id) {
        case 'ab-workouts':
          subCategoriesToUse = AB_FOCUS_REGIONS_DATA;
          demoImagesToUse = DEMO_EXERCISE_IMAGES;
          break;
        case 'cardio':
          subCategoriesToUse = CARDIO_SUB_CATEGORIES_DATA;
          demoImagesToUse = CARDIO_WORKOUTS_DEMO_IMAGES;
          break;
        case 'chest-workouts':
          subCategoriesToUse = CHEST_SUB_CATEGORIES_DATA;
          demoImagesToUse = CHEST_WORKOUTS_DEMO_IMAGES;
          break;
        case 'back-workouts':
          subCategoriesToUse = BACK_SUB_CATEGORIES_DATA;
          demoImagesToUse = BACK_WORKOUTS_DEMO_IMAGES;
          break;
        case 'bicep-workouts':
          subCategoriesToUse = BICEP_SUB_CATEGORIES_DATA;
          demoImagesToUse = BICEP_WORKOUTS_DEMO_IMAGES;
          break;
        case 'shoulder-workouts':
          subCategoriesToUse = SHOULDER_SUB_CATEGORIES_DATA;
          demoImagesToUse = SHOULDER_WORKOUTS_DEMO_IMAGES;
          break;
        case 'leg-workouts':
          subCategoriesToUse = LEG_SUB_CATEGORIES_DATA;
          demoImagesToUse = LEG_WORKOUTS_DEMO_IMAGES;
          break;
        case 'tricep-workouts':
          subCategoriesToUse = TRICEP_SUB_CATEGORIES_DATA;
          demoImagesToUse = TRICEP_WORKOUTS_DEMO_IMAGES;
          break;
        default:
          // Fallback if a category is in DIRECT_VIEW_CATEGORIES but not handled in switch
          demoImagesToUse = DEMO_EXERCISE_IMAGES; 
      }

      if (subCategoriesToUse.length > 0) {
        const defaultSubCategory = subCategoriesToUse[0];
        setSelectedSubCategory(defaultSubCategory);
        const directViewId = `${category.id}-direct-view`;
        handleOpenImagePopup(directViewId, galleryPopupTitle, demoImagesToUse);
        setShowExerciseGrid(false);
      } else {
         // If no subcategories, but it's a direct view category, still show general overview
        const directViewId = `${category.id}-direct-view`;
        handleOpenImagePopup(directViewId, galleryPopupTitle, demoImagesToUse);
        setShowExerciseGrid(false);
        setSelectedSubCategory(null); // No specific sub-category if data source is empty
      }
      document.title = `${category.name} - FitShark`;
    } else {
      setSelectedSubCategory(null);
      document.title = `${category.name} - FitShark`;
    }
  }, [category, handleOpenImagePopup]); 
  
  useEffect(() => {
    return () => {
        setShowTrainingParamsWidget(false);
    };
  }, [onNavigateHome]);


  useEffect(() => {
    if (!DIRECT_VIEW_CATEGORIES.includes(category.id)) { // Only update for non-direct view based on subcat
      if (selectedSubCategory) {
        document.title = `${category.name} - ${selectedSubCategory.name} - FitShark`;
      } else {
        document.title = `${category.name} - FitShark`;
      }
    }
  }, [category, selectedSubCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (DIRECT_VIEW_CATEGORIES.includes(category.id)) return; 

      const targetIsExerciseCard = (event.target as HTMLElement).closest('.exercise-card-wrapper');
      const targetIsWidget = (event.target as HTMLElement).closest('.ios-training-widget'); 
      const targetIsStyledButton = (event.target as HTMLElement).closest(StyledViewWorkoutsButton.toString());
      const targetIsImagePopup = (event.target as HTMLElement).closest('[role="dialog"][aria-labelledby="imagePopupModalTitle"]');
      const targetIsEnlargedImagePopup = (event.target as HTMLElement).closest('[role="dialog"][aria-label="Enlarged image view"]');

      if (!targetIsExerciseCard && !targetIsWidget && !targetIsStyledButton && !targetIsImagePopup && !targetIsEnlargedImagePopup) {
        if (showExerciseGrid) { 
             setShowExerciseGrid(false);
        }
      }
    };

    const isAbCompleteActive = category.id === 'ab-workouts' && selectedSubCategory?.id === 'complete-abs';
    const isGenericCategoryActive = CATEGORIES_FOR_CLICK_OUTSIDE_HIDE.includes(category.id) &&
                                    (selectedSubCategory || subCategoryDataSource.length === 0);

    if (showExerciseGrid && (isAbCompleteActive || isGenericCategoryActive) && !DIRECT_VIEW_CATEGORIES.includes(category.id)) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [category, selectedSubCategory, showExerciseGrid, subCategoryDataSource]);


  const handleOpenVideoModal = (videoSrc: string, videoTitle: string, exerciseId: string) => {
    setLoadingInteractionForExerciseId(exerciseId);
    setShowTrainingParamsWidget(false); 
    setTimeout(() => {
        setModalVideoSrc(videoSrc);
        setModalVideoTitle(videoTitle);
        setIsModalOpen(true);
    }, 500);
  };

  const handleCloseVideoModal = () => {
    setIsModalOpen(false);
    setModalVideoSrc('');
    setModalVideoTitle('');
    setLoadingInteractionForExerciseId(null);
  };

  const handleCloseImagePopup = () => {
    setIsImagePopupOpen(false);
    setImagePopupImages([]);
    setImagePopupTitle('');
    setLoadingInteractionForExerciseId(null);
  };

  const handleSelectSubCategory = (subCategory: WorkoutCategory | AbFocusRegion) => {
    setSelectedSubCategory(subCategory);
    setLoadingInteractionForExerciseId(null);
    setShowExerciseGrid(true);
    setShowTrainingParamsWidget(false); 
  };
  
  const placeholderExerciseForSelectedSubCategory = selectedSubCategory 
    ? exercises.find(ex => 
        ex.categoryId === category.id && 
        ex.subCategoryId === selectedSubCategory.id && 
        ex.name.toLowerCase() === 'view workouts'
      ) 
    : undefined;
  
  const showStyledViewWorkoutsButton = !!placeholderExerciseForSelectedSubCategory && !DIRECT_VIEW_CATEGORIES.includes(category.id);


  let exercisesToDisplay = selectedSubCategory && subCategoryDataSource.length > 0
    ? exercises.filter(ex => ex.subCategoryId === selectedSubCategory.id)
    : subCategoryDataSource.length === 0 && !DIRECT_VIEW_CATEGORIES.includes(category.id) // Show all if no subcategories AND not direct view
    ? exercises 
    : []; 

  if (showStyledViewWorkoutsButton && placeholderExerciseForSelectedSubCategory) {
    exercisesToDisplay = exercisesToDisplay.filter(ex => ex.id !== placeholderExerciseForSelectedSubCategory.id);
  }

  const subCategoryIcon = selectedSubCategory && 'icon' in selectedSubCategory ? selectedSubCategory.icon : null;

  const hidePageAndExerciseIcons = 
    CATEGORIES_TO_HIDE_PAGE_AND_EXERCISE_ICONS.includes(category.id) ||
    (category.id === 'ab-workouts');

  const pageStyle: React.CSSProperties = {};
  let pageClassName = "min-h-screen";

  if (INFERNO_BACKGROUND_CATEGORIES.includes(category.id)) {
    pageStyle.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${addImageKitTransformations('https://ik.imagekit.io/coxftihos/inferno-queen-power-unleashed-an-2160x3840.jpg?updatedAt=1749199910182')}')`;
    pageStyle.backgroundSize = 'cover';
    pageStyle.backgroundPosition = 'center';
    pageStyle.backgroundRepeat = 'no-repeat';
    pageStyle.backgroundAttachment = 'fixed';
  } else {
    // Default background logic for other categories
    pageStyle.backgroundImage = `url('${addImageKitTransformations('https://ik.imagekit.io/coxftihos/main%20images/wallpaperflare.com_wallpaper%20(4).jpg?updatedAt=1749124862132')}')`;
    pageStyle.backgroundSize = 'cover';
    pageStyle.backgroundPosition = 'center';
    pageStyle.backgroundAttachment = 'fixed'; 
  }
  
  const handleStyledButtonClick = useCallback(() => {
    if (placeholderExerciseForSelectedSubCategory) {
        const exerciseNameToPass = placeholderExerciseForSelectedSubCategory.name;
        handleOpenImagePopup(
            placeholderExerciseForSelectedSubCategory.id, 
            exerciseNameToPass
        );
    }
  }, [placeholderExerciseForSelectedSubCategory, handleOpenImagePopup]);

  const isAbCompleteContext = category.id === 'ab-workouts' && selectedSubCategory?.id === 'complete-abs';
  const isGenericHideContext = CATEGORIES_FOR_CLICK_OUTSIDE_HIDE.includes(category.id) && (selectedSubCategory || subCategoryDataSource.length === 0);
  
  const shouldShowOriginalTable = !showTrainingParamsWidget && 
                                  !showExerciseGrid && 
                                  (isAbCompleteContext || isGenericHideContext) && 
                                  !showStyledViewWorkoutsButton &&
                                  !DIRECT_VIEW_CATEGORIES.includes(category.id);

  const handleTrainingTableClick = () => {
    if (
        DIRECT_VIEW_CATEGORIES.includes(category.id) &&
        !isImagePopupOpen &&
        showTrainingParamsWidget &&
        !showExerciseGrid
    ) {
        let demoImagesToUse: string[] = [];
        const galleryPopupTitle = `${category.name} Overview`;

        switch (category.id) {
            case 'ab-workouts':
                demoImagesToUse = DEMO_EXERCISE_IMAGES;
                break;
            case 'cardio':
                demoImagesToUse = CARDIO_WORKOUTS_DEMO_IMAGES;
                break;
            case 'chest-workouts':
                demoImagesToUse = CHEST_WORKOUTS_DEMO_IMAGES;
                break;
            case 'back-workouts':
                demoImagesToUse = BACK_WORKOUTS_DEMO_IMAGES;
                break;
            case 'bicep-workouts':
                demoImagesToUse = BICEP_WORKOUTS_DEMO_IMAGES;
                break;
            case 'shoulder-workouts':
                demoImagesToUse = SHOULDER_WORKOUTS_DEMO_IMAGES;
                break;
            case 'leg-workouts':
                demoImagesToUse = LEG_WORKOUTS_DEMO_IMAGES;
                break;
            case 'tricep-workouts':
                demoImagesToUse = TRICEP_WORKOUTS_DEMO_IMAGES;
                break;
            default:
                // Fallback if a category is in DIRECT_VIEW_CATEGORIES but not explicitly handled
                // This should ideally not be reached if DIRECT_VIEW_CATEGORIES and the switch are synced.
                console.warn(`No specific demo images found for direct view category: ${category.id}. Using default.`);
                demoImagesToUse = DEMO_EXERCISE_IMAGES; // A generic fallback
        }

        handleOpenImagePopup(
            `${category.id}-direct-view`,
            galleryPopupTitle,
            demoImagesToUse
        );
    }
  };

  return (
    <>
      <div 
        className={pageClassName}
        style={pageStyle}
      >
        <div className={`${accents.bar} h-2`}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <InteractiveArrowButton
            onClick={() => {
                onNavigateHome();
                setShowTrainingParamsWidget(false); 
            }}
            ariaLabel="Back to All Categories"
            className="mb-6" 
          />

          <header className={`text-center mb-10 bg-black/40 dark:bg-neutral-900/50 backdrop-blur-sm p-4 rounded-lg`}>
            <h1 className={`text-4xl sm:text-5xl font-bold text-white dark:text-neutral-50 mb-2`}>
              {(() => {
                if (hidePageAndExerciseIcons && category.id !== 'ab-workouts') return null; 
                if (subCategoryIcon && selectedSubCategory && !DIRECT_VIEW_CATEGORIES.includes(category.id)) return <span className="mr-3 text-4xl sm:text-5xl" aria-hidden="true">{subCategoryIcon}</span>;
                if (categoryIcon && !DIRECT_VIEW_CATEGORIES.includes(category.id)) return <span className="mr-3 text-4xl sm:text-5xl" aria-hidden="true">{categoryIcon}</span>;
                if (DIRECT_VIEW_CATEGORIES.includes(category.id) && categoryIcon) return <span className="mr-3 text-4xl sm:text-5xl" aria-hidden="true">{categoryIcon}</span>; 
                return null;
              })()}
              {selectedSubCategory && !DIRECT_VIEW_CATEGORIES.includes(category.id) ? `${category.name} - ${selectedSubCategory.name}` : category.name}
            </h1>
            <p className={`text-lg text-neutral-100 dark:text-neutral-200 max-w-2xl mx-auto`}>
              {selectedSubCategory && !DIRECT_VIEW_CATEGORIES.includes(category.id) ? selectedSubCategory.description : category.description || `Explore exercises for ${category.name}.`}
            </p>
          </header>

          {!DIRECT_VIEW_CATEGORIES.includes(category.id) && subCategoryDataSource.length > 0 && (
            <section className="my-10 max-w-md mx-auto bg-white/70 dark:bg-neutral-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-center">
              <h2 className="text-xl font-semibold text-neutral-darker dark:text-neutral-100 mb-1">
                Focus on: <span className={accents.text}>{selectedSubCategory ? selectedSubCategory.name : 'All Areas'}</span>
              </h2>
              {selectedSubCategory && selectedSubCategory.description && (
                 <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{selectedSubCategory.description}</p>
              )}
              <CategorySelectorDropdown
                categories={subCategoryDataSource as WorkoutCategory[]} 
                onCategorySelect={handleSelectSubCategory as (cat: WorkoutCategory) => void}
                value={selectedSubCategory as WorkoutCategory | null}
                placeholder={`Select a ${category.name.replace(' Workouts','').replace(' Exercises','')} Type`}
              />
              {showStyledViewWorkoutsButton && placeholderExerciseForSelectedSubCategory && (
                <div className="mt-6">
                  <StyledViewWorkoutsButton 
                    onClick={handleStyledButtonClick}
                    disabled={loadingInteractionForExerciseId === `styled-button-${category.id}-${selectedSubCategory?.id || 'all'}`}
                  >
                    <span className="button-text-content">
                      {loadingInteractionForExerciseId === `styled-button-${category.id}-${selectedSubCategory?.id || 'all'}` || loadingInteractionForExerciseId === placeholderExerciseForSelectedSubCategory.id
                        ? 'Loading...'
                        : `View Workouts`}
                    </span>
                    <SymbolStreamContainer aria-hidden="true">
                      <span>+</span><span>*</span><span>°</span><span>·</span><span>.</span>
                    </SymbolStreamContainer>
                  </StyledViewWorkoutsButton>
                </div>
              )}
            </section>
          )}
          
          {showTrainingParamsWidget && (
            <div 
                className="mt-0 mb-8" 
                onClick={handleTrainingTableClick} 
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTrainingTableClick();}} 
                role="button" 
                tabIndex={0} 
                aria-label={`Training parameters table. Click to ensure the ${category.name} overview image gallery is visible if closed.`}
             > 
              <TrainingParametersTable />
            </div>
          )}
           
          <section id="exercise-grid-section" className={`mt-${showTrainingParamsWidget ? '4' : '10'}`}>
            {(() => {
              if (DIRECT_VIEW_CATEGORIES.includes(category.id) && showTrainingParamsWidget) {
                return null; // Grid is hidden for direct views
              }

              if (shouldShowOriginalTable) { 
                 return <TrainingParametersTable />; 
              }

              if (showExerciseGrid && ((selectedSubCategory && subCategoryDataSource.length > 0) || (subCategoryDataSource.length === 0 && !DIRECT_VIEW_CATEGORIES.includes(category.id)))) {
                if (exercisesToDisplay.length > 0) {
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {exercisesToDisplay.map(exercise => (
                         <div key={exercise.id} className="exercise-card-wrapper">
                          <ExerciseCard
                            exercise={exercise}
                            onWatchVideo={handleOpenVideoModal}
                            onShowImages={handleOpenImagePopup} 
                            hideImageForCategory={shouldHideImage}
                            hideExerciseIconOnCard={hidePageAndExerciseIcons} 
                            isLoading={loadingInteractionForExerciseId === exercise.id} 
                          />
                        </div>
                      ))}
                    </div>
                  );
                } else if (!showStyledViewWorkoutsButton && !showTrainingParamsWidget ) { 
                  return (
                    <p className="text-neutral-dark dark:text-neutral-300 text-center py-10 bg-white/50 dark:bg-neutral-800/60 backdrop-blur-sm rounded-md">
                      {subCategoryDataSource.length > 0 && !selectedSubCategory 
                          ? `Please select a ${category.name.replace(' Workouts','').replace(' Exercises','').toLowerCase()} type above to view exercises.` 
                          : "No exercises found for this selection yet. Check back soon!" }
                    </p>
                  );
                }
              } else if (!showExerciseGrid && !shouldShowOriginalTable && !showTrainingParamsWidget && !showStyledViewWorkoutsButton && !DIRECT_VIEW_CATEGORIES.includes(category.id)) {
                  return (
                    <p className="text-neutral-dark dark:text-neutral-300 text-center py-10 bg-white/50 dark:bg-neutral-800/60 backdrop-blur-sm rounded-md">
                        Click on a sub-category or "View Workouts" to see exercises.
                    </p>
                  );
              }
              return null;
            })()}
          </section>
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseVideoModal}
        videoSrc={modalVideoSrc}
        videoTitle={modalVideoTitle}
      />
      <ImagePopupModal
        isOpen={isImagePopupOpen}
        onClose={handleCloseImagePopup}
        images={imagePopupImages}
        title={imagePopupTitle}
      />
    </>
  );
};

export default CategoryExercisesPage;
