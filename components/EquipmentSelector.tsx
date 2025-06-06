
import React, { useState, useEffect } from 'react'; // Added useEffect for the new behavior
import { EQUIPMENT_DATA, MUSCLE_GROUPS_FOR_FILTERING } from '../constants';
import { EquipmentItem as EquipmentItemType, WorkoutCategory } from '../types';
// Button import removed as it's no longer used
import CategorySelectorDropdown from './CategorySelectorDropdown';

interface EquipmentSelectorProps {
  onShowFilteredExercisesPage: (equipment: EquipmentItemType, muscleGroup: WorkoutCategory) => void;
}

const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({ onShowFilteredExercisesPage }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItemType | null>(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<WorkoutCategory | null>(null);

  const handleSelectEquipment = (equipment: EquipmentItemType) => {
    setSelectedEquipment(equipment);
    // If a muscle group was previously selected, and now equipment changes,
    // we reset muscle group. The user will need to select a new muscle group.
    // If they select the same muscle group again, the useEffect below will trigger navigation.
    setSelectedMuscleGroup(null);
  };

  const handleSelectMuscleGroup = (muscleGroup: WorkoutCategory) => {
    setSelectedMuscleGroup(muscleGroup);
    // Navigation will be handled by the useEffect hook when both are selected.
  };

  // useEffect to trigger navigation when both selections are made
  useEffect(() => {
    if (selectedEquipment && selectedMuscleGroup) {
      onShowFilteredExercisesPage(selectedEquipment, selectedMuscleGroup);
    }
  }, [selectedEquipment, selectedMuscleGroup, onShowFilteredExercisesPage]);

  return (
    <section
      className="py-16 md:py-24"
      style={{
        backgroundImage: `url('https://ik.imagekit.io/coxftihos/main%20images/craiyon_102835_Crystal_Palace_in_a_Jungle_Clearing.png?updatedAt=1749187428922')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#2C2C54', // Placeholder color (dark indigo)
      }}
      aria-labelledby="select-equipment-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-sm mx-auto text-center p-4 sm:p-6 rounded-xl shadow-xl
                     bg-white/80 dark:bg-neutral-900/85
                     backdrop-filter backdrop-blur-lg" // Adjusted opacity and blur
        >
          <h2
            id="select-equipment-heading"
            className="text-xl sm:text-2xl font-bold text-neutral-darker dark:text-neutral-50 mb-4"
          >
            Select The Equipment
          </h2>
          <div className="space-y-4"> {/* Added space-y for dropdowns */}
            <CategorySelectorDropdown
              categories={EQUIPMENT_DATA as any as WorkoutCategory[]}
              onCategorySelect={handleSelectEquipment as any as (category: WorkoutCategory) => void}
              value={selectedEquipment as any as WorkoutCategory | null}
              placeholder="Select Equipment"
            />

            {selectedEquipment && (
              <div className="animate-fadeIn">
                 <label htmlFor="muscle-group-selector" className="sr-only">Select Muscle Group</label>
                <CategorySelectorDropdown
                  categories={MUSCLE_GROUPS_FOR_FILTERING}
                  onCategorySelect={handleSelectMuscleGroup}
                  value={selectedMuscleGroup}
                  placeholder="Select Muscle Group"
                  className="mt-4"
                  // id="muscle-group-selector" // ID for label if we add one visually
                />
              </div>
            )}
          </div>
        </div>

        {/* Button and its container are removed. Navigation happens automatically. */}
        {/* The increased top margin for the button's container is also removed.
            If spacing is needed below the card, it should be handled by the parent layout
            or a general margin on the section itself if that's the desired global effect.
            For now, removing the specific `mt-24` div.
        */}
      </div>
    </section>
  );
};

export default EquipmentSelector;
