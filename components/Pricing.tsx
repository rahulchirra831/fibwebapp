
import React from 'react';
import { PricingPlan } from '../types';
import Button from './Button';

// Heroicons (MIT License) - https://heroicons.com
const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 mr-2" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

interface PricingProps {
  plans: PricingPlan[];
}

const Pricing: React.FC<PricingProps> = ({ plans }) => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-neutral-light dark:bg-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darker dark:text-neutral-50 tracking-tight">
            Flexible <span className="text-primary dark:text-primary-light">Pricing</span> for Every Business
          </h2>
          <p className="mt-4 text-lg text-neutral dark:text-neutral-300 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans come with a 14-day free trial.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isDarkPopular = plan.isPopular && plan.bgColor === 'bg-primary';
            const cardBg = plan.bgColor || 'bg-white';
            const darkCardBg = plan.isPopular ? (plan.bgColor ? `dark:${plan.bgColor}` : 'dark:bg-primary') : 'dark:bg-neutral-700';
            
            const cardTextColor = plan.textColor || 'text-neutral-dark';
            const darkCardTextColor = plan.isPopular ? (plan.textColor ? `dark:${plan.textColor}` : 'dark:text-white') : 'dark:text-neutral-100';

            const headingTextColor = plan.textColor || 'text-neutral-darker';
            const darkHeadingTextColor = plan.isPopular ? (plan.textColor ? `dark:${plan.textColor}` : 'dark:text-white') : 'dark:text-neutral-50';
            
            const subTextColor = plan.textColor || 'text-neutral';
            const darkSubTextColor = plan.isPopular ? (plan.textColor ? `dark:${plan.textColor}` : 'dark:text-neutral-300') : 'dark:text-neutral-300';

            return (
              <div
                key={plan.name}
                className={`rounded-xl shadow-xl dark:shadow-neutral-900/50 p-8 flex flex-col 
                            ${cardBg} ${darkCardBg} ${cardTextColor} ${darkCardTextColor} 
                            ${plan.isPopular ? 'relative' : ''}
                            transition-all duration-300 ease-out hover:shadow-2xl dark:hover:shadow-primary-dark/40 hover:scale-[1.02]`}
              >
                {plan.isPopular && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${plan.isPopular ? 'bg-secondary dark:bg-secondary-light' : 'bg-primary dark:bg-primary-light'} text-white dark:text-neutral-900 text-sm font-semibold px-4 py-1 rounded-full shadow-md`}>
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold ${headingTextColor} ${darkHeadingTextColor} mb-2`}>{plan.name}</h3>
                <p className={`text-4xl font-extrabold ${headingTextColor} ${darkHeadingTextColor} mb-1`}>
                  ${plan.price}
                  <span className={`text-lg font-medium ${subTextColor} ${darkSubTextColor}`}>{plan.frequency}</span>
                </p>
                <p className={`text-sm ${subTextColor} ${darkSubTextColor} mb-6`}>
                  {plan.name === 'Starter' ? 'Perfect for getting started' : plan.name === 'Pro' ? 'For growing businesses' : 'For large scale operations'}
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className={`flex-shrink-0 w-5 h-5 mr-2 ${plan.isPopular ? 'text-secondary dark:text-secondary-light' : 'text-primary dark:text-primary-light'}`} />
                      <span className={`${subTextColor} ${darkSubTextColor}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.isPopular ? 'secondary' : 'primary'}
                  size="lg" 
                  className={`w-full 
                    ${ plan.buttonColor && plan.buttonTextColor ? 
                        `${plan.buttonColor} ${plan.buttonTextColor} hover:${plan.buttonColor}` 
                        : '' 
                    }
                    ${ plan.isPopular && plan.buttonColor === 'bg-white' ? 
                        'dark:bg-neutral-100 dark:text-primary hover:dark:bg-neutral-200' 
                        : plan.isPopular ? 'dark:hover:bg-secondary-dark' : 'dark:hover:bg-primary-dark'
                    }
                  `}
                >
                  {plan.ctaText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;