
import React, { useState } from 'react'; // Added useState
import { WorkoutCategory } from '../types';
import CategorySelectorDropdown from './CategorySelectorDropdown'; // New component
import { WORKOUT_CATEGORIES_DATA } from '../constants';

interface WorkoutCategoriesSectionProps {
  onSelectCategory: (category: WorkoutCategory) => void;
}

const WorkoutCategoriesSection: React.FC<WorkoutCategoriesSectionProps> = ({ onSelectCategory }) => {
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<WorkoutCategory | null>(null);
  // const commitHash = "6f90d569edf3c54a3d6b806aabf0208e97730d8b"; // Specific commit hash for jsDelivr

  const handleCategoryDropdownSelect = (category: WorkoutCategory) => {
    setSelectedDropdownValue(category); // Update local state for the dropdown
    onSelectCategory(category);        // Call the original handler to navigate
  };

  return (
    <section
      className="py-12 md:py-16" // Removed bg-white dark:bg-neutral-900
      style={{
        backgroundImage: `url('https://ik.imagekit.io/coxftihos/main%20images/eagle-soaring-above-ancient-world-xu-3840x2400.jpg?updatedAt=1749120254985')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Added this line
        backgroundColor: '#36454F', // Placeholder color (charcoal/dark grey)
      }}
      aria-labelledby="explore-categories-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-sm mx-auto text-center p-4 sm:p-6 rounded-xl shadow-xl
                     bg-white/70 dark:bg-neutral-900/80
                     backdrop-filter backdrop-blur-md"
        >
          <h2
            id="explore-categories-heading"
            className="text-xl sm:text-2xl font-bold text-neutral-darker dark:text-neutral-50 mb-6"
          >
            Explore Workout Categories
          </h2>
          <CategorySelectorDropdown
            categories={WORKOUT_CATEGORIES_DATA}
            onCategorySelect={handleCategoryDropdownSelect} // Use the new handler
            value={selectedDropdownValue}                  // Pass the state as value
            placeholder="Select a Workout Category"
          />
        </div>
      </div>
    </section>
  );
};

export default WorkoutCategoriesSection;
