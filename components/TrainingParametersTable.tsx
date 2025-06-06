
import React from 'react';

const trainingParamsBodyData = [
  { id: 'goal', category: 'Goal', endurance: 'Stamina & long performance', hypertrophy: 'Muscle size (bulk)', strength: 'Max strength & power' },
  { id: 'reps', category: 'Reps (per set)', endurance: '12-20+', hypertrophy: '6-12', strength: '1-6' },
  { id: 'sets', category: 'Sets', endurance: '2-4', hypertrophy: '3-5', strength: '3-6' },
  { id: 'rest', category: 'Rest between sets', endurance: '30-60 seconds', hypertrophy: '60-90 seconds', strength: '2-5 minutes' },
  { id: 'weight', category: 'Weight used', endurance: 'Light (~5-20 kg)', hypertrophy: 'Moderate (~20-60 kg)', strength: 'Heavy (~60-120+ kg)' },
  { id: 'tut', category: 'Time under tension', endurance: 'Low (15-30s)', hypertrophy: 'Mod-High (30-70s)', strength: 'Low-Mod (10-40s)' },
];

const TrainingParametersTableComponent: React.FC = () => {
  return (
    <div className="ios-training-widget group mx-auto max-w-2xl my-4 sm:my-6 md:my-8 bg-white/85 dark:bg-neutral-800/85 backdrop-blur-xl rounded-3xl shadow-xl dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)] p-3 sm:p-4 animate-ios-widget-enter transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-2xl dark:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
      <h3 className="text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4 text-neutral-800 dark:text-neutral-100">
        General Training Parameters
      </h3>
      <div className="overflow-x-auto rounded-lg border border-neutral-200/70 dark:border-neutral-700/50 shadow-sm">
        <table className="min-w-full">
          <thead className="bg-neutral-100/50 dark:bg-neutral-700/40">
            <tr>
              <th scope="col" className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">Endurance</th>
              <th scope="col" className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">Hypertrophy</th>
              <th scope="col" className="px-2 py-1.5 sm:px-3 sm:py-2 text-left text-xs font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">Strength</th>
            </tr>
          </thead>
          <tbody className="bg-white/70 dark:bg-neutral-800/60 divide-y divide-neutral-200/60 dark:divide-neutral-700/40">
            {trainingParamsBodyData.map(dataRow => (
              <tr key={dataRow.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-700/50 transition-colors duration-150">
                <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-normal text-xs font-medium text-neutral-700 dark:text-neutral-200">{dataRow.category}</td>
                <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-normal text-xs text-neutral-600 dark:text-neutral-300">{dataRow.endurance}</td>
                <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-normal text-xs text-neutral-600 dark:text-neutral-300">{dataRow.hypertrophy}</td>
                <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-normal text-xs text-neutral-600 dark:text-neutral-300">{dataRow.strength}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 sm:mt-4 text-[0.65rem] sm:text-xs text-neutral-500 dark:text-neutral-400 text-center px-1">
        This table provides general guidelines. Adjust based on your individual needs and experience. Select an exercise from a category to view details, or re-select your focus area above to display exercises.
      </p>
    </div>
  );
};

const TrainingParametersTable = React.memo(TrainingParametersTableComponent);
export default TrainingParametersTable;
