// Constants for the Fitness App UI

import React from 'react';
import { NavLink, FeatureItem, Testimonial, WorkoutCategory, Exercise, EquipmentItem, AbFocusRegion, NavAction } from './types'; // Removed PricingPlan, FAQItemData, // Added NavAction

// Heroicons (MIT License) - https://heroicons.com
// Fix: Replaced JSX with React.createElement for CheckCircleIcon definition
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: className,
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    })
  );
};

// Fix: Replaced JSX with React.createElement for SparklesIcon definition
export const SparklesIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: className,
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 01-3.09 3.09L13.125 12l2.846.813a4.5 4.5 0 013.09 3.09L18.25 18.75l.813-2.846a4.5 4.5 0 013.09-3.09l2.846-.813-2.846-.813a4.5 4.5 0 01-3.09-3.09L18.25 7.5z",
    })
  );
};

// Fix: Replaced JSX with React.createElement for ChartBarIcon definition
const ChartBarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: className,
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    })
  );
};

const generateSpecificPlaceholderVideoUrl = (exerciseName: string): string => {
  const slug = exerciseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `https://www.youtube.com/embed/vid_${slug}_demo`;
};

const generatePlaceholderExerciseImageUrl = (exerciseName: string, width: number = 150, height: number = 100): string => {
  const slug = exerciseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `https://picsum.photos/seed/${slug}-exercise/${width}/${height}`;
};


export const NAV_LINKS: NavLink[] = [
  {
    label: 'Solutions',
    href: '#equipment-selector-section',
    dropdown: [
      { label: 'Dumbbell', href: '#equipment-selector-section', action: () => { const el = document.getElementById('equipment-selector-section'); if(el) el.scrollIntoView({behavior: 'smooth'}); } },
      { label: 'Barbell', href: '#equipment-selector-section', action: () => { const el = document.getElementById('equipment-selector-section'); if(el) el.scrollIntoView({behavior: 'smooth'}); } },
      // { label: 'Bench', href: '#equipment-selector-section', action: () => { const el = document.getElementById('equipment-selector-section'); if(el) el.scrollIntoView({behavior: 'smooth'}); } }, // Removed Bench
    ],
  },
  // { label: 'Company', href: '#', dropdown: [ // Removed Company section
  //     { label: 'About Us', href: '#' },
  //     { label: 'Careers', href: '#' },
  //   ]
  // },
];

export const featuresData: FeatureItem[] = [
  // Removed "Discover Your Perfect Workout" feature
  // Removed "Track Your Progress Seamlessly" feature
  // Removed "Personalized Fitness Insights" feature
];

export const testimonialsData: Testimonial[] = [
  {
    quote: "This platform revolutionized how I approach my workouts. The variety of categories and ease of finding routines is incredible, and my fitness level has significantly improved!",
    name: 'Sarah M.',
    role: 'Fitness Enthusiast',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
  },
  {
    quote: "The tracking features are a game-changer. I can focus on my workouts and see my progress, which keeps me motivated. Highly recommended!",
    name: 'John B.',
    role: 'Active User',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
  },
  {
    quote: "Customer support is top-notch. They are always responsive and helpful. The platform itself is intuitive and powerful.",
    name: 'Lisa K.',
    role: 'New Member',
    avatar: 'https://picsum.photos/seed/avatar3/100/100',
  },
];

// Removed faqData export const faqData: FAQItemData[] = [ ... ];

// Removed pricingData export const pricingData: PricingPlan[] = [ ... ];


export const EQUIPMENT_DATA: EquipmentItem[] = [
  { id: 'dumbbell', name: 'Dumbbell', icon: '🏋️', description: "Versatile weights for a wide range of strength exercises." },
  { id: 'barbell', name: 'Barbell', icon: '🏋️‍♂️', description: "Ideal for compound lifts and progressive overload." },
  // { id: 'bench', name: 'Bench', icon: '🪑', description: "Essential for various pressing and support exercises." }, // Removed Bench
];

export const MUSCLE_GROUPS_FOR_FILTERING: WorkoutCategory[] = [
  { id: 'chest-workouts', name: 'Chest' /* icon removed */ },
  { id: 'back-workouts', name: 'Back' /* icon removed */ },
  { id: 'shoulder-workouts', name: 'Shoulders' /* icon removed */ },
  { id: 'leg-workouts', name: 'Legs' /* icon removed */ },
  { id: 'bicep-workouts', name: 'Biceps' /* icon removed */ },
  { id: 'tricep-workouts', name: 'Triceps' /* icon removed */ },
  { id: 'ab-workouts', name: 'Abs' /* icon removed */ },
];


export const SOCIAL_PROOF_LOGOS = [
  { name: "FitBit", src: "https://picsum.photos/seed/logofitbit/120/40?grayscale", alt: "FitBit Logo" },
  { name: "MyFitnessPal", src: "https://picsum.photos/seed/logomyfitnesspal/120/40?grayscale", alt: "MyFitnessPal Logo" },
  { name: "Strava", src: "https://picsum.photos/seed/logostrava/120/40?grayscale", alt: "Strava Logo" },
  { name: "Peloton", src: "https://picsum.photos/seed/logopeloton/120/40?grayscale", alt: "Peloton Logo" },
  { name: "Gymshark", src: "https://picsum.photos/seed/logogymshark/120/40?grayscale", alt: "Gymshark Logo" },
];

export const FOOTER_LINKS = {
  // solutions: [], // Removed as per user request
  resources: [], // Already empty, and its UI was previously removed
  // company: [], // Removed "company" property
  // legal: [], // Removed as per user request
};

const allWorkoutCategories: WorkoutCategory[] = [
  { id: 'ab-workouts', name: 'Ab Workouts', description: 'Target all areas of your core for strength and definition.' },
  { id: 'cardio', name: 'Cardio Workouts', description: 'Improve heart health, endurance, and burn calories.' },
  { id: 'chest-workouts', name: 'Chest Workouts', description: 'Build a powerful and well-defined chest.' },
  { id: 'back-workouts', name: 'Back Workouts', description: 'Develop a strong and sculpted back.' },
  { id: 'bicep-workouts', name: 'Bicep Workouts', description: 'Sculpt and strengthen your bicep muscles.' },
  { id: 'shoulder-workouts', name: 'Shoulder Workouts', description: 'Build strong, broad shoulders.' },
  { id: 'leg-workouts', name: 'Leg Workouts', description: 'Develop strength and definition in your legs.' },
  { id: 'tricep-workouts', name: 'Tricep Workouts', description: 'Target your triceps for arm strength and size.' },
  { id: 'glute-workouts', name: 'Glute Workouts', description: 'Strengthen and shape your gluteal muscles.' },
  { id: 'forearm-workouts', name: 'Forearm Workouts', description: 'Improve grip strength and forearm definition.' },
];

const filteredCategories = allWorkoutCategories.filter(category => !['full-body', 'bodyweight', 'increase-strength', 'sports-performance', 'at-home', 'celebrity', 'glute-workouts', 'forearm-workouts'].includes(category.id));

const abWorkoutsCategory = filteredCategories.find(cat => cat.id === 'ab-workouts');
const otherCategories = filteredCategories.filter(cat => cat.id !== 'ab-workouts');

export const WORKOUT_CATEGORIES_DATA: WorkoutCategory[] = abWorkoutsCategory ? [...otherCategories, abWorkoutsCategory] : otherCategories;


export const WORKOUT_CATEGORY_ICONS: { [key: string]: string } = {
  'increase-strength': '💪',
  // 'ab-workouts': '🔥', // Removed
  'full-body': '🤸',
  'sports-performance': '🏆',
  'bodyweight': '🧍',
  'at-home': '🏠',
  'celebrity': '🌟',
  'cardio': '🏃',
  // 'chest-workouts': '🎯', // Removed
  // 'back-workouts': '🌊', // Removed
  // 'bicep-workouts': '🦾', // Removed
  // 'shoulder-workouts': '⛰️', // Removed
  // 'leg-workouts': '🦵', // Removed
  // 'tricep-workouts': '🛠️', // Removed
};

export const CATEGORY_ACCENT_COLORS: { [key: string]: { bar: string; pageTitleColor?: string; text?: string; } } = {
  'default': { bar: 'bg-primary dark:bg-primary-light', pageTitleColor: 'text-primary dark:text-primary-light', text: 'text-primary dark:text-primary-light' },
  'ab-workouts': { bar: 'bg-amber-500 dark:bg-amber-400', pageTitleColor: 'text-amber-600 dark:text-amber-400', text: 'text-amber-600 dark:text-amber-400' },
  'cardio': { bar: 'bg-sky-500 dark:bg-sky-400', pageTitleColor: 'text-sky-600 dark:text-sky-400', text: 'text-sky-600 dark:text-sky-400' },
  'chest-workouts': { bar: 'bg-red-500 dark:bg-red-400', pageTitleColor: 'text-red-600 dark:text-red-400', text: 'text-red-600 dark:text-red-400' },
  'back-workouts': { bar: 'bg-blue-500 dark:bg-blue-400', pageTitleColor: 'text-blue-600 dark:text-blue-400', text: 'text-blue-600 dark:text-blue-400' },
  'bicep-workouts': { bar: 'bg-purple-500 dark:bg-purple-400', pageTitleColor: 'text-purple-600 dark:text-purple-400', text: 'text-purple-600 dark:text-purple-400' },
  'shoulder-workouts': { bar: 'bg-orange-500 dark:bg-orange-400', pageTitleColor: 'text-orange-600 dark:text-orange-400', text: 'text-orange-600 dark:text-orange-400' },
  'leg-workouts': { bar: 'bg-lime-500 dark:bg-lime-400', pageTitleColor: 'text-lime-600 dark:text-lime-400', text: 'text-lime-600 dark:text-lime-400' },
  'tricep-workouts': { bar: 'bg-pink-500 dark:bg-pink-400', pageTitleColor: 'text-pink-600 dark:text-pink-400', text: 'text-pink-600 dark:text-pink-400' },
};


export const AB_FOCUS_REGIONS_DATA: AbFocusRegion[] = [
  { id: 'complete-abs', name: 'Complete Abs', description: 'Engage multiple ab areas simultaneously.' /* icon removed */ },
];

export const CARDIO_SUB_CATEGORIES_DATA: WorkoutCategory[] = [
  { id: 'cardio-steady-state', name: 'Steady State Cardio', description: 'Maintain a consistent intensity for extended periods.' },
];

export const CHEST_SUB_CATEGORIES_DATA: WorkoutCategory[] = [
  { id: 'chest-middle', name: 'Complete Chest', description: 'Focus on overall chest thickness and width.' },
];

export const BACK_SUB_CATEGORIES_DATA: WorkoutCategory[] = [
  { id: 'back-lower', name: 'Back and Lats', description: 'Comprehensive exercises for overall back and lat development.' },
];

export const BICEP_SUB_CATEGORIES_DATA: WorkoutCategory[] = [
    { id: 'bicep-width', name: 'Biceps', description: 'Comprehensive exercises for complete bicep development, targeting size, peak, and width.'},
];

export const SHOULDER_SUB_CATEGORIES_DATA: WorkoutCategory[] = [
    { id: 'shoulder-lateral', name: 'Shoulders', description: 'Comprehensive exercises for developing all heads of the deltoid for strong, well-rounded shoulders.'},
];

export const LEG_SUB_CATEGORIES_DATA: WorkoutCategory[] = [
    { id: 'leg-quads', name: 'Legs', description: 'Comprehensive exercises for overall leg development, targeting quads, hamstrings, glutes, and calves.'}, // Removed icon here as it's a sub-category
];

const tricepCategoryIcon = WORKOUT_CATEGORY_ICONS['tricep-workouts']; // This will be undefined now

export const TRICEP_SUB_CATEGORIES_DATA: WorkoutCategory[] = [
    { id: 'tricep-overall', name: 'Triceps', description: 'Comprehensive exercises for complete tricep development.', icon: tricepCategoryIcon }, // icon will be undefined
];

export const GLUTE_SUB_CATEGORIES_DATA: WorkoutCategory[] = WORKOUT_CATEGORIES_DATA.find(cat => cat.id === 'glute-workouts') ? [
    { id: 'glute-maximus', name: 'Glutes', description: 'Comprehensive exercises for strengthening and shaping all gluteal muscles.', icon: '🍑⏫'},
] : [];

export const FOREARM_SUB_CATEGORIES_DATA: WorkoutCategory[] = WORKOUT_CATEGORIES_DATA.find(cat => cat.id === 'forearm-workouts') ? [
    { id: 'forearm-grip', name: 'Forearms', description: 'Comprehensive exercises for developing overall forearm size, strength, and endurance.', icon: '✊💥' },
] : [];


const abExercisesRawData = [
  { name: 'Crunches', region: 'complete-abs', videoSlug: 'crunches', equipment: 'Bodyweight' },
  { name: 'Leg Raises', region: 'complete-abs', videoSlug: 'leg-raises', equipment: 'Bodyweight' },
  { name: 'Plank', region: 'complete-abs', videoSlug: 'elbow-plank', equipment: 'Bodyweight' },
  { name: 'Russian Twists', region: 'complete-abs', videoSlug: 'sitting-twists', equipment: 'Bodyweight, Plate' }, // This is the Bodyweight/Plate one
  { name: 'Hanging Leg Raises', region: 'complete-abs', videoSlug: 'hanging-leg-raises', equipment: 'Pull-up bar' },
  { name: 'Cable Crunches', region: 'complete-abs', videoSlug: 'cable-crunches', equipment: 'Cable' },
  { name: 'view workouts', region: 'complete-abs', videoSlug: 'view-workouts', equipment: 'Bodyweight' }, // Keep for demo images
];

const abExercises: Exercise[] = abExercisesRawData.map((ex, index) => ({
  id: `ab-ex-${ex.videoSlug}-${index}`,
  categoryId: 'ab-workouts',
  subCategoryId: ex.region,
  name: ex.name,
  icon: AB_FOCUS_REGIONS_DATA.find(r => r.id === ex.region)?.icon || WORKOUT_CATEGORY_ICONS['ab-workouts'], // This will resolve to undefined
  imageSrc: generatePlaceholderExerciseImageUrl(ex.name, 150, 100),
  imageAlt: `Illustration of ${ex.name}`,
  videoSrc: ex.name.toLowerCase() === 'view workouts' ? undefined : generateSpecificPlaceholderVideoUrl(ex.videoSlug),
  description: `An effective exercise targeting the ${ex.region.replace('-abs','')} abs. Focus on proper form for best results.`,
  exerciseType: 'Bodyweight',
  equipment: ex.equipment || 'Bodyweight',
  mechanics: ex.name.toLowerCase().includes('plank') || ex.name.toLowerCase().includes('hold') || ex.name.toLowerCase().includes('sit') ? 'Isolation (Isometric)' : 'Isolation',
  experienceLevel: 'Beginner',
  views: `${Math.floor(Math.random() * 500) + 50}K views`,
  comments: `${Math.floor(Math.random() * 100) + 10} comments`,
}));

const placeholderCardioExercises: Exercise[] = [
  {
    id: 'cardio-ex-view-workouts', categoryId: 'cardio', subCategoryId: 'cardio-steady-state', name: 'view workouts', icon: WORKOUT_CATEGORY_ICONS['cardio'],
    imageSrc: generatePlaceholderExerciseImageUrl('view workouts'),
    imageAlt: 'Image for view workouts',
    description: 'A demonstration cardio exercise, excellent for general fitness and endurance.',
    exerciseType: 'Cardio', equipment: 'Bodyweight', mechanics: 'Compound', experienceLevel: 'Beginner',
    videoSrc: undefined,
    views: `${Math.floor(Math.random() * 200) + 50}K`, comments: `${Math.floor(Math.random() * 50) + 5}`
  },
];

const placeholderChestExercises: Exercise[] = [
 {
    id: 'chest-ex-view-workouts', categoryId: 'chest-workouts', subCategoryId: 'chest-middle', name: 'view workouts', icon: WORKOUT_CATEGORY_ICONS['chest-workouts'], // Will be undefined
    imageSrc: generatePlaceholderExerciseImageUrl('view workouts'),
    imageAlt: 'Image for view workouts',
    description: 'An effective exercise for developing the chest muscles. Focus on controlled movements.',
    exerciseType: 'Strength', equipment: 'Barbell, Dumbbell, Machine', mechanics: 'Compound', experienceLevel: 'Beginner',
    videoSrc: undefined,
    views: `${Math.floor(Math.random() * 200) + 50}K`, comments: `${Math.floor(Math.random() * 50) + 5}`
  },
];

const placeholderBackExercises: Exercise[] = [
  {
    id: 'back-ex-view-workouts', categoryId: 'back-workouts', subCategoryId: 'back-lower', name: 'view workouts', icon: WORKOUT_CATEGORY_ICONS['back-workouts'], // Will be undefined
    imageSrc: generatePlaceholderExerciseImageUrl('view workouts'),
    imageAlt: 'Image for view workouts',
    description: 'An effective exercise for strengthening and developing the back muscles. Maintain good form.',
    exerciseType: 'Strength', equipment: 'Barbell, Dumbbell, Cable, Machine', mechanics: 'Compound', experienceLevel: 'Beginner',
    videoSrc: undefined,
    views: `${Math.floor(Math.random() * 200) + 50}K`, comments: `${Math.floor(Math.random() * 50) + 5}`
  },
];

const placeholderBicepExercises: Exercise[] = [
  {
    id: 'bicep-ex-view-workouts', categoryId: 'bicep-workouts', subCategoryId: 'bicep-width', name: 'view workouts', icon: WORKOUT_CATEGORY_ICONS['bicep-workouts'], // Will be undefined
    imageSrc: generatePlaceholderExerciseImageUrl('view workouts'),
    imageAlt: 'Image for view workouts',
    description: 'An effective exercise for building bicep strength and size. Ensure full range of motion.',
    exerciseType: 'Strength', equipment: 'Dumbbell, Barbell, Cable', mechanics: 'Isolation', experienceLevel: 'Beginner',
    videoSrc: undefined,
    views: `${Math.floor(Math.random() * 200) + 50}K`, comments: `${Math.floor(Math.random() * 50) + 5}`
  }
];

const placeholderShoulderExercises: Exercise[] = [
  {
    id: 'shoulder-ex-view-workouts', categoryId: 'shoulder-workouts', subCategoryId: 'shoulder-lateral', name: 'view workouts', icon: WORKOUT_CATEGORY_ICONS['shoulder-workouts'], // Will be undefined
    imageSrc: generatePlaceholderExerciseImageUrl('view workouts'),
    imageAlt: 'Image for view workouts',
    description: 'An effective exercise for developing strong and well-rounded shoulders. Control the weight.',
    exerciseType: 'Strength', equipment: 'Dumbbell, Barbell, Machine', mechanics: 'Compound', experienceLevel: 'Beginner',
    videoSrc: undefined,
    views: `${Math.floor(Math.random() * 200) + 50}K`, comments: `${Math.floor(Math.random() * 50) + 5}`
  },
];

const placeholderLegExercises: Exercise[] = [
  {
    id: 'leg-ex-view-workouts', categoryId: 'leg-workouts', subCategoryId: 'leg-quads', name: 'view workouts', icon: WORKOUT_CATEGORY_ICONS['leg-workouts'], // Will be undefined
    imageSrc: generatePlaceholderExerciseImageUrl('view workouts'),
    imageAlt: 'Image for view workouts',
    description: 'An effective exercise for building strength and definition in the legs. Focus on form.',
    exerciseType: 'Strength', equipment: 'Barbell, Dumbbell, Machine', mechanics: 'Compound', experienceLevel: 'Beginner',
    videoSrc: undefined,
    views: `${Math.floor(Math.random() * 200) + 50}K`, comments: `${Math.floor(Math.random() * 50) + 5}`
  }
];

const placeholderTricepExercises: Exercise[] = WORKOUT_CATEGORIES_DATA.find(cat => cat.id === 'tricep-workouts') ? [
  {
    id: 'tricep-ex-view-workouts', categoryId: 'tricep-workouts', subCategoryId: 'tricep-overall', name: 'view workouts', icon: WORKOUT_CATEGORY_ICONS['tricep-workouts'], // Will be undefined
    imageSrc: generatePlaceholderExerciseImageUrl('view workouts'),
    imageAlt: 'Image for view workouts',
    description: 'An effective exercise for targeting the tricep muscles. Ensure proper form for best results.',
    exerciseType: 'Strength', equipment: 'Dumbbell, Barbell, Cable, Machine', mechanics: 'Isolation', experienceLevel: 'Beginner',
    videoSrc: undefined,
    views: `${Math.floor(Math.random() * 200) + 50}K`, comments: `${Math.floor(Math.random() * 50) + 5}`
  }
] : [];


const specificExercises: Exercise[] = [
  // Dumbbell - Chest (Pectorals)
  { id: 'db-bench-press', categoryId: 'chest-workouts', name: 'Dumbbell Bench Press', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Bench Press'), imageAlt: 'Dumbbell Bench Press', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-bench-press'), description: 'Classic chest builder using dumbbells.' },
  { id: 'db-flyes', categoryId: 'chest-workouts', name: 'Dumbbell Flyes', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Flyes'), imageAlt: 'Dumbbell Flyes', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-flyes'), description: 'Isolates chest muscles for a good stretch.' },
  { id: 'db-incline-bench-press-chest', categoryId: 'chest-workouts', name: 'Dumbbell Incline Bench Press', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Incline Bench Press'), imageAlt: 'Dumbbell Incline Bench Press', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-incline-bench-press'), description: 'Targets upper chest with dumbbells.' },

  // Dumbbell - Back (Latissimus dorsi, Trapezius, Rhomboids)
  { id: 'db-one-arm-row', categoryId: 'back-workouts', name: 'Dumbbell Row', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('One Arm Dumbbell Row'), imageAlt: 'One Arm Dumbbell Row', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('one-arm-dumbbell-row'), description: 'Builds back thickness and targets lats.' },

  // Dumbbell - Shoulders (Deltoids)
  { id: 'db-shoulder-press', categoryId: 'shoulder-workouts', name: 'Dumbbell Shoulder Press', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Shoulder Press'), imageAlt: 'Dumbbell Shoulder Press', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-shoulder-press'), description: 'Builds overall shoulder mass.' },
  { id: 'db-lateral-raise', categoryId: 'shoulder-workouts', name: 'Lateral Raise', equipment: 'Dumbbell', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Lateral Raise'), imageAlt: 'Dumbbell Lateral Raise', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-lateral-raise'), description: 'Targets medial deltoids for width.' },
  { id: 'db-reverse-flyes-shoulders', categoryId: 'shoulder-workouts', name: 'Rear Delt Fly on Bench', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Reverse Flyes'), imageAlt: 'Dumbbell Reverse Flyes for Shoulders', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-reverse-flyes'), description: 'Targets rear deltoids using a bench for support.' },


  // Dumbbell - Arms (Biceps)
  { id: 'db-bicep-curl', categoryId: 'bicep-workouts', name: 'Dumbbell Curls', equipment: 'Dumbbell', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Bicep Curl'), imageAlt: 'Dumbbell Bicep Curl', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-bicep-curl'), description: 'Classic bicep builder with dumbbells.' },
  // Dumbbell - Arms (Triceps)
  { id: 'db-triceps-extension', categoryId: 'tricep-workouts', name: 'Triceps Extensions', equipment: 'Dumbbell', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Triceps Extension'), imageAlt: 'Dumbbell Triceps Extension', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-triceps-extension'), description: 'Targets the triceps muscles using dumbbells.' },
  { id: 'db-close-grip-bench-press-triceps', categoryId: 'tricep-workouts', name: 'Dumbbell Close-Grip Bench Press', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Close-Grip Bench Press'), imageAlt: 'Dumbbell Close-Grip Bench Press', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-close-grip-bench-press'), description: 'Triceps-focused press using dumbbells on a bench.' },


  // Dumbbell - Legs (Quadriceps, Hamstrings, Calves)
  { id: 'db-goblet-squat', categoryId: 'leg-workouts', name: 'Dumbbell Squats', equipment: 'Dumbbell', imageSrc: generatePlaceholderExerciseImageUrl('Goblet Squat'), imageAlt: 'Goblet Squat', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('goblet-squat'), description: 'Great for quad development and form.' },
  { id: 'db-lunge', categoryId: 'leg-workouts', name: 'Lunges', equipment: 'Dumbbell', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Lunge'), imageAlt: 'Dumbbell Lunge', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-lunge'), description: 'Works quads, glutes, and hamstrings.' },
  { id: 'db-calf-raise', categoryId: 'leg-workouts', name: 'Calf Raises', equipment: 'Dumbbell', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Calf Raise'), imageAlt: 'Dumbbell Calf Raise', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-calf-raise'), description: 'Strengthens calf muscles using dumbbells.' },
  { id: 'db-bulgarian-split-squat-legs', categoryId: 'leg-workouts', name: 'Dumbbell Bulgarian Split Squat', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Bulgarian Split Squat'), imageAlt: 'Dumbbell Bulgarian Split Squat', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-bulgarian-split-squat'), description: 'Targets quads and glutes, rear foot elevated on bench.' },
  { id: 'db-step-ups-legs', categoryId: 'leg-workouts', name: 'Dumbbell Step-Ups', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Step-Ups'), imageAlt: 'Dumbbell Step-Ups', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-step-ups'), description: 'Builds leg strength and balance using a bench.' },
  { id: 'db-hip-thrust-legs', categoryId: 'leg-workouts', name: 'Dumbbell Hip Thrust', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Hip Thrust'), imageAlt: 'Dumbbell Hip Thrust', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-hip-thrust'), description: 'Glute-focused exercise with dumbbell on a bench.' },


  // Dumbbell - Core (Abdominals, Obliques)
  { id: 'db-side-bend', categoryId: 'ab-workouts', name: 'Dumbbell Side Bend', equipment: 'Dumbbell', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Side Bend'), imageAlt: 'Dumbbell Side Bend', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-side-bend'), description: 'Targets oblique muscles using a dumbbell for resistance.' },
  { id: 'db-russian-twist', categoryId: 'ab-workouts', name: 'Dumbbell Russian Twist', equipment: 'Dumbbell', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Russian Twist'), imageAlt: 'Dumbbell Russian Twist', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-russian-twist'), description: 'Strengthens obliques and core with a dumbbell.' },

  // Barbell - Chest
  { id: 'bb-bench-press', categoryId: 'chest-workouts', name: 'Barbell Bench Press', equipment: 'Barbell, Bench, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Bench Press'), imageAlt: 'Barbell Bench Press', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-bench-press'), description: 'The king of chest exercises.' },
  { id: 'bb-incline-press', categoryId: 'chest-workouts', name: 'Incline Bench Press', equipment: 'Barbell, Bench, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Incline Press'), imageAlt: 'Barbell Incline Press', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-incline-press'), description: 'Emphasizes the upper pectorals.' },
  // { id: 'bb-floor-press', categoryId: 'chest-workouts', name: 'Barbell Floor Press', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Floor Press'), imageAlt: 'Barbell Floor Press', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-floor-press'), description: 'Limited range of motion, tricep heavy.' },

  // Barbell - Back
  { id: 'bb-row', categoryId: 'back-workouts', name: 'Barbell Row', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Row'), imageAlt: 'Barbell Row', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-row'), description: 'Develops overall back thickness.' },
  { id: 'bb-deadlift', categoryId: 'back-workouts', name: 'Deadlift', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Deadlift'), imageAlt: 'Barbell Deadlift', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Advanced', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-deadlift'), description: 'Full body exercise, heavily working the back.' },
  { id: 'bb-shrugs', categoryId: 'back-workouts', name: 'Barbell Shrugs', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Shrugs'), imageAlt: 'Barbell Shrugs', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-shrugs'), description: 'Targets the trapezius muscles for upper back and neck thickness.' },
  { id: 'bb-incline-row-back', categoryId: 'back-workouts', name: 'Barbell Incline Row', equipment: 'Barbell, Bench, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Incline Row'), imageAlt: 'Barbell Incline Row', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-incline-row'), description: 'Targets upper back using an incline bench.' },
  // { id: 'bb-t-bar-row', categoryId: 'back-workouts', name: 'T-Bar Row', equipment: 'Barbell, Plate, Machine', imageSrc: generatePlaceholderExerciseImageUrl('T-Bar Row'), imageAlt: 'T-Bar Row', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('t-bar-row'), description: 'Targets the mid-back.' },
  // { id: 'bb-good-mornings', categoryId: 'back-workouts', name: 'Barbell Good Mornings', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Good Mornings'), imageAlt: 'Good Mornings', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Advanced', videoSrc: generateSpecificPlaceholderVideoUrl('good-mornings'), description: 'Strengthens lower back and hamstrings.' },

  // Barbell - Shoulders
  { id: 'bb-overhead-press', categoryId: 'shoulder-workouts', name: 'Barbell Overhead Press', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell OHP'), imageAlt: 'Barbell OHP', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-ohp'), description: 'Core shoulder strength builder.' },
  { id: 'bb-upright-row', categoryId: 'shoulder-workouts', name: 'Upright Row', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Upright Row'), imageAlt: 'Barbell Upright Row', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-upright-row'), description: 'Targets traps and deltoids.' },
  // { id: 'bb-push-press', categoryId: 'shoulder-workouts', name: 'Barbell Push Press', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Push Press'), imageAlt: 'Barbell Push Press', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Advanced', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-push-press'), description: 'Explosive shoulder power.' },

  // Barbell - Arms
  { id: 'bb-bicep-curl', categoryId: 'bicep-workouts', name: 'Barbell Curls', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Curls'), imageAlt: 'Barbell Curls', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-curls'), description: 'Classic mass builder for biceps using a barbell.' },
  { id: 'bb-close-grip-bench-press', categoryId: 'tricep-workouts', name: 'Close-grip Bench Press', equipment: 'Barbell, Bench, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Close-grip Bench Press'), imageAlt: 'Close-grip Bench Press', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('close-grip-bench-press'), description: 'Targets triceps primarily, also works chest and shoulders.' },
  // { id: 'bb-triceps-extension', categoryId: 'tricep-workouts', name: 'Barbell Triceps Extension', equipment: 'Barbell, Bench, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Triceps Extension'), imageAlt: 'Barbell Triceps Extension', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-triceps-extension'), description: 'Effective for building triceps mass, often called Skullcrushers.' },

  // Barbell - Legs
  { id: 'bb-squat', categoryId: 'leg-workouts', name: 'Barbell Squat', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Squat'), imageAlt: 'Barbell Squat', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-squat'), description: 'Fundamental leg exercise.' },
  { id: 'bb-deadlift-legs', categoryId: 'leg-workouts', name: 'Deadlift', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Deadlift Legs'), imageAlt: 'Barbell Deadlift for Legs', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Advanced', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-deadlift'), description: 'Full body exercise, heavily working legs and back.' },
  { id: 'bb-lunge-legs', categoryId: 'leg-workouts', name: 'Barbell Lunges', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Lunge Legs'), imageAlt: 'Barbell Lunge Legs', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-lunge-legs'), description: 'Unilateral leg strength.' },
  { id: 'bb-calf-raises', categoryId: 'leg-workouts', name: 'Calf Raises', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Calf Raises'), imageAlt: 'Barbell Calf Raises', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-calf-raises'), description: 'Builds calf muscles using a barbell for resistance.' },
  { id: 'bb-hip-thrust', categoryId: 'leg-workouts', name: 'Barbell Hip Thrust', equipment: 'Barbell, Plate, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Hip Thrust'), imageAlt: 'Barbell Hip Thrust', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-hip-thrust'), description: 'Primary glute builder using a bench.' },
  // { id: 'bb-front-squat', categoryId: 'leg-workouts', name: 'Barbell Front Squat', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Front Squat'), imageAlt: 'Barbell Front Squat', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Advanced', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-front-squat'), description: 'Emphasizes quads and core.' },
  // { id: 'bb-romanian-deadlift-legs', categoryId: 'leg-workouts', name: 'Barbell Romanian Deadlift (RDL)', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell RDL Legs'), imageAlt: 'Barbell RDL Legs', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-rdl-legs'), description: 'Targets hamstrings and glutes.' },

  // Barbell - Core
  { id: 'bb-rollout', categoryId: 'ab-workouts', name: 'Barbell Rollout', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Rollout'), imageAlt: 'Barbell Rollout', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-rollout'), description: 'Challenging core exercise using a barbell to roll out.' },
  { id: 'bb-landmine-twist', categoryId: 'ab-workouts', name: 'Landmine Twist', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Landmine Twist'), imageAlt: 'Landmine Twist', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('landmine-twist'), description: 'Targets obliques and core rotation using a landmine setup or one end of a barbell.' },
  { id: 'bb-overhead-squat-core', categoryId: 'ab-workouts', name: 'Barbell Overhead Squat', equipment: 'Barbell, Plate', imageSrc: generatePlaceholderExerciseImageUrl('Barbell Overhead Squat Core'), imageAlt: 'Barbell Overhead Squat for Core', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Advanced', videoSrc: generateSpecificPlaceholderVideoUrl('barbell-overhead-squat'), description: 'Demanding exercise that heavily engages the core for stability, also works legs and shoulders.' },

  // Plate Exercises (Keep, not dumbbell or barbell)
  { id: 'plate-front-raise', categoryId: 'shoulder-workouts', name: 'Plate Front Raise', equipment: 'Plate', imageSrc: generatePlaceholderExerciseImageUrl('Plate Front Raise'), imageAlt: 'Plate Front Raise', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('plate-front-raise'), description: 'Good for shoulder isolation with a plate.' },
  { id: 'plate-halo', categoryId: 'shoulder-workouts', name: 'Plate Halo', equipment: 'Plate', imageSrc: generatePlaceholderExerciseImageUrl('Plate Halo'), imageAlt: 'Plate Halo', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('plate-halo'), description: 'Improves shoulder mobility and stability.' },
  { id: 'plate-pinch-press', categoryId: 'chest-workouts', name: 'Plate Pinch Press', equipment: 'Plate', imageSrc: generatePlaceholderExerciseImageUrl('Plate Pinch Press'), imageAlt: 'Plate Pinch Press', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('plate-pinch-press'), description: 'Squeezes the chest muscles using plates.' },
  { id: 'plate-overhead-lunge', categoryId: 'leg-workouts', name: 'Plate Overhead Lunge', equipment: 'Plate', imageSrc: generatePlaceholderExerciseImageUrl('Plate Overhead Lunge'), imageAlt: 'Plate Overhead Lunge', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('plate-overhead-lunge'), description: 'Challenges legs and core stability.' },
  { id: 'plate-russian-twist', categoryId: 'ab-workouts', name: 'Plate Russian Twist', equipment: 'Plate', imageSrc: generatePlaceholderExerciseImageUrl('Plate Russian Twist'), imageAlt: 'Plate Russian Twist', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('plate-russian-twist'), description: 'Targets obliques with added resistance.' },

  // Bench Specific Exercises (Restored based on previous user request)
  { id: 'bench-dips-triceps', categoryId: 'tricep-workouts', name: 'Bench Dips', equipment: 'Bench, Bodyweight', imageSrc: generatePlaceholderExerciseImageUrl('Bench Dips'), imageAlt: 'Bench Dips', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('bench-dips'), description: 'Triceps exercise using a bench for support.' },
  { id: 'db-incline-row-back', categoryId: 'back-workouts', name: 'Dumbbell Incline Row', equipment: 'Dumbbell, Bench', imageSrc: generatePlaceholderExerciseImageUrl('Dumbbell Incline Row'), imageAlt: 'Dumbbell Incline Row', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('dumbbell-incline-row'), description: 'Targets back muscles on an incline bench.' },
  { id: 'bw-bulgarian-split-squat-legs', categoryId: 'leg-workouts', name: 'Bodyweight Bulgarian Split Squat', equipment: 'Bench, Bodyweight', imageSrc: generatePlaceholderExerciseImageUrl('Bodyweight Bulgarian Split Squat'), imageAlt: 'Bodyweight Bulgarian Split Squat', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('bodyweight-bulgarian-split-squat'), description: 'Bodyweight leg exercise with rear foot on bench.' },
  { id: 'bw-step-ups-legs', categoryId: 'leg-workouts', name: 'Bodyweight Step-Ups', equipment: 'Bench, Bodyweight', imageSrc: generatePlaceholderExerciseImageUrl('Bodyweight Step-Ups'), imageAlt: 'Bodyweight Step-Ups', exerciseType: 'Strength', mechanics: 'Compound', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('bodyweight-step-ups'), description: 'Bodyweight leg exercise using a bench.' },
  { id: 'bench-leg-raise-core', categoryId: 'ab-workouts', name: 'Bench Leg Raise', equipment: 'Bench, Bodyweight', imageSrc: generatePlaceholderExerciseImageUrl('Bench Leg Raise'), imageAlt: 'Bench Leg Raise', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Beginner', videoSrc: generateSpecificPlaceholderVideoUrl('bench-leg-raise'), description: 'Core exercise targeting lower abs on a bench.' },
  { id: 'decline-sit-up-core', categoryId: 'ab-workouts', name: 'Decline Sit-Up', equipment: 'Bench, Bodyweight', imageSrc: generatePlaceholderExerciseImageUrl('Decline Sit-Up'), imageAlt: 'Decline Sit-Up', exerciseType: 'Strength', mechanics: 'Isolation', experienceLevel: 'Intermediate', videoSrc: generateSpecificPlaceholderVideoUrl('decline-sit-up'), description: 'Core exercise using a decline bench for support.' },
];

export const DEMO_EXERCISE_IMAGES = [
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/abs/Gemini_Generated_Image_b8gzv5b8gzv5b8gz.png?updatedAt=1748596379694',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/abs/Gemini_Generated_Image_ptusx9ptusx9ptus.png?updatedAt=1748596379546',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/abs/Gemini_Generated_Image_kc14i0kc14i0kc14.png?updatedAt=1748596379162',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/abs/Gemini_Generated_Image_l57d47l57d47l57d.png?updatedAt=1748596378913',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/abs/Gemini_Generated_Image_uhwyybuhwyybuhwy.png?updatedAt=1748596462829',
];

export const BACK_WORKOUTS_DEMO_IMAGES = [
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/back%20workouts%20/SaveInsta.to_501396819_18056657936345795_1382098264652067089_n.jpg?updatedAt=1748590412848',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/back%20workouts%20/SaveInsta.to_495742416_18054981887345795_3560213244196666605_n.jpg?updatedAt=1748590270643',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/back%20workouts%20/SaveInsta.to_496724803_18054981878345795_7214623281406647145_n.jpg?updatedAt=1748590180600',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/back%20workouts%20/SaveInsta.to_501014037_18056657945345795_3595917767384915923_n.jpg?updatedAt=1748590180557',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/back%20workouts%20/SaveInsta.to_496741821_18054981860345795_1212808717463965727_n.jpg?updatedAt=1748590180521',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/back%20workouts%20/SaveInsta.to_500542599_18056657963345795_1038486003960868947_n.jpg?updatedAt=1748590180430',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/back%20workouts%20/SaveInsta.to_480492316_18047248436345795_5722376043057378871_n.jpg?updatedAt=1748590180386',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/back%20workouts%20/SaveInsta.to_500347244_18056657954345795_3239366265152186101_n.jpg?updatedAt=1748590180288',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/back%20workouts%20/SaveInsta.to_495783487_18054981869345795_8821612702836017837_n.jpg?updatedAt=1748590180080',
];

export const CHEST_WORKOUTS_DEMO_IMAGES = [
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/chest%20workouts/SaveInsta.to_495095203_18054630014345795_1594784372556341829_n.jpg?updatedAt=1748592085958',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/chest%20workouts/SaveInsta.to_487682905_18051484877345795_4387169629445294602_n.jpg?updatedAt=1748592052109',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/chest%20workouts/SaveInsta.to_482764964_18048618077345795_1216296375485140208_n.jpg?updatedAt=1748592036645',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/chest%20workouts/SaveInsta.to_487448661_18051484892345795_5476182423782560573_n.jpg?updatedAt=1748591980253',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/chest%20workouts/SaveInsta.to_487455193_18051484895345795_7389776841446451938_n.jpg?updatedAt=1748591980138',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/chest%20workouts/SaveInsta.to_495362991_18054630005345795_6939480308514007149_n.jpg?updatedAt=1748591979997',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/chest%20workouts/SaveInsta.to_487817761_18051484868345795_6570179909890373637_n.jpg?updatedAt=1748591979879',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/chest%20workouts/SaveInsta.to_482028829_18048618095345795_6997203172611538202_n.jpg?updatedAt=1748591979218',
];

export const BICEP_WORKOUTS_DEMO_IMAGES = [
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/bicep/SaveInsta.to_483916110_18049668506345795_6694078573904840205_n.jpg?updatedAt=1748593106271',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/bicep/SaveInsta.to_483420235_18049668497345795_4339501782106793552_n.jpg?updatedAt=1748593087160',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/bicep/SaveInsta.to_501220381_18056657981345795_45540896876313079_n.jpg?updatedAt=1748592419811',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/bicep/SaveInsta.to_501278655_18056657972345795_7420656251066702248_n.jpg?updatedAt=1748592419811',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/bicep/SaveInsta.to_483973869_18049668446345795_833338736147102903_n.jpg?updatedAt=1748592419686',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/bicep/SaveInsta.to_484092746_18049668428345795_7201510261879085974_n.jpg?updatedAt=1748592419510',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/bicep/SaveInsta.to_483803612_18049668437345795_5813152354717295490_n.jpg?updatedAt=1748592418539',
];

export const SHOULDER_WORKOUTS_DEMO_IMAGES = [
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/shoulder/SaveInsta.to_499407636_18056075096345795_8604144968784157834_n.jpg?updatedAt=1748593937031',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/shoulder/SaveInsta.to_500110013_18056075087345795_7854855613769362076_n.jpg?updatedAt=1748593969141',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/shoulder/SaveInsta.to_499665458_18056075042345795_7296596196318757412_n.jpg?updatedAt=1748593864266',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/shoulder/SaveInsta.to_499490202_18056075078345795_6198208986864318960_n.jpg?updatedAt=1748593705642',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/shoulder/SaveInsta.to_499630637_18056075069345795_4108439780753148864_n.jpg?updatedAt=1748593705636',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/shoulder/SaveInsta.to_499632161_18056075060345795_6055141556735214389_n.jpg?updatedAt=1748593705588',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/shoulder/SaveInsta.to_500129298_18056075033345795_1788571005587118704_n.jpg?updatedAt=1748593705345',
];

export const LEG_WORKOUTS_DEMO_IMAGES = [
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/leg/SaveInsta.to_491444076_18054036155345795_2550641037982448072_n.jpg?updatedAt=1748594959997',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/leg/SaveInsta.to_491452968_18054036128345795_675081953926965267_n.jpg?updatedAt=1748594948378',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/leg/SaveInsta.to_491449462_18054036164345795_2520171188025330207_n.jpg?updatedAt=1748594739607',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/leg/SaveInsta.to_494616317_18054036146345795_3622001737320626545_n.jpg?updatedAt=1748594739568',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/leg/SaveInsta.to_495000970_18054036137345795_5503871386199834022_n.jpg?updatedAt=1748594739310',
];

export const TRICEP_WORKOUTS_DEMO_IMAGES = [
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/tricep/SaveInsta.to_495051176_18054630041345795_1422335551973949587_n.jpg?updatedAt=1748595649872',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/tricep/SaveInsta.to_487680519_18051581324345795_6784526730786908923_n.jpg?updatedAt=1748595646471',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/tricep/SaveInsta.to_487473043_18051581336345795_6641750766210279512_n.jpg?updatedAt=1748595523393',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/leg/SaveInsta.to_494616317_18054036146345795_3622001737320626545_n.jpg?updatedAt=1748594739568',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/leg/SaveInsta.to_495000970_18054036137345795_5503871386199834022_n.jpg?updatedAt=1748594739310',
];

export const CARDIO_WORKOUTS_DEMO_IMAGES = [
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/cardio/Gemini_Generated_Image_iwrfxoiwrfxoiwrf.png?updatedAt=1748596965318',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/cardio/best-no-equipment-chest-exercises.jpg?updatedAt=1748596940517',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/cardio/Gemini_Generated_Image_x7e6q3x7e6q3x7e6.png?updatedAt=1748596942050',
  'https://ik.imagekit.io/coxftihos/back%20workouts%20/workouts/cardio/Gemini_Generated_Image_a1lg9ca1lg9ca1lg.png?updatedAt=1748596942485',
];


export const EXERCISES_DATA: Exercise[] = [
  ...abExercises,
  ...placeholderCardioExercises,
  ...placeholderChestExercises,
  ...placeholderBackExercises,
  ...placeholderBicepExercises,
  ...placeholderShoulderExercises,
  ...placeholderLegExercises,
  ...(WORKOUT_CATEGORIES_DATA.find(cat => cat.id === 'tricep-workouts') ? placeholderTricepExercises : []),
  // Removed glute and forearm placeholder data to simplify for now.
  ...specificExercises, // Add the new specific exercises
];

export const MOTIVATIONAL_QUOTES: string[] = [
  "When the weights feel heavy, let your determination be the iron that lifts you higher.",
  "Every drop of sweat is a medal of your relentless pursuit of greatness.",
  "Push past the pain; your inner strength is the flame that forges champions.",
  "In the gym of life, every rep shapes your destiny.",
  "The burn you feel today is the power you'll unleash tomorrow.",
  "Lift with your heart and let passion be the force that propels you forward.",
  "Your hard work is the blueprint for strength; every set builds your legacy.",
  "Embrace the struggle; every challenge in the gym is a step closer to your best self.",
  "In the mirror, see not just muscle, but the persistence that drives you.",
  "Every drop of sweat writes the story of your resilience.",
  "Transform pain into power and let toughness be your trademark.",
  "The weights are heavy, but your resolve is heavier.",
  "Rise with every set, for every push is a victory over your limits.",
  "Harness the burn—your fire is unstoppable.",
  "Strength blooms in the soil of perseverance and grit.",
  "Train with purpose, for every rep is a reminder of your inner warrior.",
  "In the gym, the only limits that exist are those you overcome.",
  "Allow each weight to challenge you and every lift to empower you.",
  "The sweat of today is the armor of tomorrow's victories.",
  "Find courage in every heavy lift and purpose in every painful rep.",
  "Your true strength shines brightest when you're at your toughest.",
  "Let the clank of the weights echo your inner resolve.",
  "Every rep brings you closer to turning struggle into triumph.",
  "Embrace the grind—it's the path that transforms potential into performance.",
  "The gym is your arena—fight, conquer, and rise above every challenge.",
  "Fuel your workouts with passion; let your effort be the proof of your strength.",
  "When challenged, remember: the toughest battles forge the strongest warriors.",
  "Your inner power is layered with years of sweat and persistence.",
  "Strength is built one rep, one struggle, and one victory at a time.",
  "Let your body tell a story of relentless ambition and unyielding spirit.",
  "With every lift, you sculpt more than muscle—you shape your character.",
  "Keep pushing, for every grunt is a declaration of your unstoppable spirit.",
  "In the heat of the workout, discover the cool resilience within you.",
  "Your journey to strength is a marathon, not a sprint—embrace every mile.",
  "Every drop of sweat is a stepping stone on the path to unbreakable confidence.",
  "Break through your limits; every set is a battle against doubt.",
  "Build your body like a fortress—rep by rep, rep by rep.",
  "Your perseverance in the gym echoes power and purpose.",
  "When you feel the burn, remember—greatness is forged in the fire of effort.",
  "Train with ,a warrior’s heart and a champion’s resolve.",
  "Every challenge in the gym is an opportunity to rise above what you thought possible.",
  "The weights may test you, but they also reveal the strength you never knew you had.",
  "Embrace the intensity of the moment—this is where legends are born.",
  "Let the rhythm of your heartbeat drive every powerful move you make.",
  "The mirror shows your reflection, but the effort reveals your true strength.",
  "In the struggle, you forge not just strength, but the courage to conquer all obstacles.",
  "Lift hard, live fearless—every workout is a step toward greatness.",
  "Harness the power of perseverance and let your strength speak volumes.",
  "Under the weight of the world, find the resolve to lift yourself higher.",
  "Train relentlessly, for each challenge is another chapter in your epic journey of strength."
];