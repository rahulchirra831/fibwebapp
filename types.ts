

import React from 'react';

export type NavAction = (() => void) | 'navigateToStopwatch' | 'navigateToHome' | 'navigateToCountdownTimer';

export interface NavLink {
  label: string;
  href: string;
  action?: NavAction; // Updated for client-side navigation with specific string actions
  dropdown?: NavLink[];
}

export interface FeaturePoint {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  points?: FeaturePoint[];
  imageSrc: string;
  imageAlt: string;
  imageWebPSrc?: string; // Added for WebP support
  imageWidth?: number; // Optional: for intrinsic size
  imageHeight?: number; // Optional: for intrinsic size
  bgColor?: string;
  textColor?: string;
  customIcon?: React.ReactNode; // For specific icons next to feature titles
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface FAQItemData {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  frequency: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  bgColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}


export interface WorkoutCategory {
  id: string;
  name: string;
  description?: string; // Optional: for sub-categories that might have descriptions
  icon?: string; // Optional: Emoji or character for the category icon
}

export interface Exercise {
  id: string;
  categoryId: string; // Links to WorkoutCategory id (muscle group)
  subCategoryId?: string; // New: Links to a sub-category ID (e.g., 'upper-abs', 'beginner-foundations', 'cardio-hiit')
  name: string;
  icon?: string; // Optional: Emoji or character for the exercise icon
  imageSrc: string;
  imageWebPSrc?: string; // Added for WebP support
  imageAlt: string;
  videoSrc?: string; // Optional: URL for the exercise demo video
  description?: string; // Optional detailed description
  exerciseType?: string;
  equipment?: string; // Equipment used, e.g., "Dumbbell", "Barbell"
  mechanics?: string;
  experienceLevel?: string;
  views?: string;
  comments?: string;
}

export interface CategoryPageProps {
  category: WorkoutCategory;
  exercises: Exercise[];
  onNavigateHome: () => void;
}

export interface EquipmentItem {
  id: string;
  name: string;
  icon: string; // Emoji or placeholder for icon
  description?: string; // Optional description for the equipment
}

export interface EquipmentPageProps {
  equipment: EquipmentItem;
  exercises: Exercise[];
  onNavigateHome: () => void;
}

// AbFocusRegion is compatible with WorkoutCategory (id, name, description)
// for use in CategorySelectorDropdown
export interface AbFocusRegion {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export type PageType = 'home' | 'category' | 'equipment' | 'countdown' | 'filteredExercises'; // Added 'filteredExercises'

// StopwatchPageProps removed

export interface CountdownTimerPageProps {
  onNavigateHome: () => void;
}

// HydrationWidgetProps removed

// Calendar related types
export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  hasTasks?: boolean; // Optional: to indicate if a day has tasks
}

export interface CalendarTask {
  id: string;
  date: string; // Store as YYYY-MM-DD string for easier matching
  title: string;
  time?: string; // Optional time e.g., "10:00 AM"
  isCompleted: boolean;
}

export interface CalendarWidgetProps {
  onClose: () => void;
  isVisible: boolean;
}

export interface NutritionWidgetProps {
  currentCalories: number;
  dailyCalorieGoal: number;
  onAddCalories: (amount: number) => void;
  onClose: () => void;
  isVisible: boolean;
}

// HealthData type removed
// HealthStatsWidgetProps type removed

// Music Widget Types REMOVED
// export interface SpotifyEmbedLink { ... }
// export interface MusicWidgetProps { ... }

// MyPlaylistWidgetProps REMOVED

// YouTube Search Widget Types REMOVED
// export interface YouTubeVideoItem {
//   id: string;
//   title: string;
//   thumbnailUrl: string;
// }

// export interface YouTubeSearchWidgetProps {
//   isVisible: boolean;
//   onClose: () => void;
// }

export interface FilteredExercisesPageProps {
  equipment: EquipmentItem;
  muscleGroup: WorkoutCategory;
  exercises: Exercise[];
  onNavigateHome: () => void;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
}

export interface AppNotificationItem extends NotificationItem {
  isExiting?: boolean;
}

export interface UsernameModalProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}
