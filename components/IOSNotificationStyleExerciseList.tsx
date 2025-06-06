import React, { useState } from 'react';
import { Exercise } from '../types';

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

interface IOSNotificationStyleExerciseListProps {
  listTitle: string;
  exercises: Exercise[];
  onExerciseSelect: (exercise: Exercise) => void;
  accentColorClass?: string; 
}

const MAX_PREVIEW_ITEMS = 3;

const IOSNotificationStyleExerciseListComponent: React.FC<IOSNotificationStyleExerciseListProps> = ({
  listTitle,
  exercises,
  onExerciseSelect,
  accentColorClass = 'text-primary dark:text-primary-light'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const previewExercises = exercises.slice(0, MAX_PREVIEW_ITEMS);

  return (
    <div className="w-full max-w-md mx-auto relative transition-all duration-500 ease-in-out">
      {isOpen && (
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className={`text-xl font-semibold ${accentColorClass}`}>{listTitle}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1 rounded-md transition-colors"
            aria-expanded="true"
            aria-controls="exercise-list-content"
          >
            Collapse
          </button>
        </div>
      )}

      <div 
        id="exercise-list-content"
        className="relative transition-all duration-500 ease-in-out"
        style={{ 
            maxHeight: isOpen ? `${exercises.length * 80 + 40}px` : `${Math.min(previewExercises.length, 1) * 64 + (previewExercises.length > 1 ? 16 : 0) + (previewExercises.length > 2 ? 8 : 0) }px`,
        }}
      >
        {!isOpen && (
          <div 
            className="relative cursor-pointer group" 
            onClick={() => setIsOpen(true)}
            role="button"
            aria-expanded="false"
            aria-controls="exercise-list-content"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(true); }}
          >
            {previewExercises.map((exercise, index) => (
              <div
                key={exercise.id + '-preview'}
                className={`absolute w-full bg-white text-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 rounded-xl p-4 shadow-lg transition-all duration-300 ease-out group-hover:shadow-xl
                            ${index === 0 ? 'opacity-100' : ''}
                            ${index === 1 ? 'opacity-80 scale-[0.97]' : ''}
                            ${index === 2 ? 'opacity-60 scale-[0.94]' : ''}
                          `}
                style={{
                  top: `${index * 8}px`, 
                  zIndex: MAX_PREVIEW_ITEMS - index,
                  transformOrigin: 'top center',
                  pointerEvents: index === 0 ? 'auto' : 'none', 
                }}
              >
                <div className="flex justify-between items-center">
                    <span className="font-medium truncate pr-2">{exercise.name}</span>
                    {index === 0 && (
                        <ChevronDownIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-600 transform transition-transform group-hover:text-primary dark:group-hover:text-primary-light" />
                    )}
                </div>
                 {index === 0 && exercises.length > 1 && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-1">
                        {exercises.length -1} more exercise{exercises.length -1 > 1 ? 's' : ''}...
                    </p>
                 )}
              </div>
            ))}
             {previewExercises.length === 0 && (
                 <div className="bg-white text-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 rounded-xl p-4 shadow-lg text-center">
                    No exercises to display.
                 </div>
             )}
          </div>
        )}

        {isOpen && (
          <div className="space-y-2 animate-fadeIn">
            {exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                onClick={() => onExerciseSelect(exercise)}
                className="bg-white text-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 rounded-xl p-4 shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-200 cursor-pointer transition-all duration-150 ease-in-out transform hover:scale-[1.02]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onExerciseSelect(exercise); }}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="font-medium">{exercise.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const IOSNotificationStyleExerciseList = React.memo(IOSNotificationStyleExerciseListComponent);
export default IOSNotificationStyleExerciseList;