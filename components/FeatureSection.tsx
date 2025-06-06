
import React from 'react';
import { FeatureItem, FeaturePoint } from '../types';

interface FeatureSectionProps extends FeatureItem {
  reverseLayout?: boolean;
}

const DefaultCheckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-primary dark:text-primary-light" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  points,
  imageSrc,
  imageWebPSrc, // New prop for WebP
  imageAlt,
  imageWidth = 600, // Default width
  imageHeight = 450, // Default height based on 4:3 aspect ratio for 600px width
  reverseLayout = false,
  bgColor = 'bg-white', // default light theme background
  textColor = 'text-neutral-dark', // default light theme text
  customIcon
}) => {
  const imageOrderClass = reverseLayout ? 'md:order-last' : '';
  const textOrderClass = reverseLayout ? 'md:order-first' : '';

  // Determine dark mode classes based on light mode settings
  let darkBgColor = 'dark:bg-neutral-800'; // default dark bg for 'bg-white'
  let darkTextColor = 'dark:text-neutral-100'; // default dark text for 'text-neutral-dark'
  let darkHeadingColor = 'dark:text-neutral-50';
  let darkSubTextColor = 'dark:text-neutral-300';
  let darkIconColor = 'dark:text-secondary-light';


  if (bgColor === 'bg-neutral-darker') {
    darkBgColor = 'dark:bg-neutral-900'; // If light theme used dark bg, dark theme uses even darker or similar
    darkTextColor = 'dark:text-neutral-200'; // For text that was light on dark bg
    darkHeadingColor = 'dark:text-white';
    darkSubTextColor = 'dark:text-neutral-300';
    darkIconColor = 'dark:text-secondary-light'; // Keep icon bright on dark background
  } else if (bgColor === 'bg-neutral-light') {
     darkBgColor = 'dark:bg-neutral-800';
  }


  // If specific text color was light (meaning dark background), adjust dark mode text
  if (textColor === 'text-neutral-light') {
    darkTextColor = 'dark:text-neutral-100';
    darkHeadingColor = 'dark:text-white';
    darkSubTextColor = 'dark:text-neutral-200';
     // If original icon was, for example, text-secondary on a dark bg
    // We might want dark:text-secondary-light or similar for the icon color.
    // The DefaultCheckIcon already has dark:text-primary-light.
    // For customIcon, its own styling or props would need to handle dark mode.
  }


  return (
    <section className={`py-16 md:py-24 ${bgColor} ${darkBgColor} ${textColor} ${darkTextColor}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center`}>
          {/* Image Column */}
          <div className={`wow fadeInUp ${imageOrderClass}`} data-wow-delay=".2s">
            <picture>
              {imageWebPSrc && <source srcSet={imageWebPSrc} type="image/webp" />}
              {imageSrc && <source srcSet={imageSrc} type={imageSrc.endsWith('.png') ? 'image/png' : 'image/jpeg'} />}
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                className="rounded-lg shadow-xl dark:shadow-neutral-700/50 mx-auto" 
                loading="lazy"
                width={imageWidth}
                height={imageHeight}
              />
            </picture>
          </div>

          {/* Text Content Column */}
          <div className={`wow fadeInUp ${textOrderClass}`} data-wow-delay=".1s">
            <div className="flex items-center mb-4">
              {customIcon && <span className="mr-3">{customIcon}</span>} {/* Custom icon needs its own dark mode handling if it's an SVG with classes */}
              <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${textColor === 'text-neutral-light' ? 'text-white' : 'text-neutral-darker'} ${darkHeadingColor}`}>
                {title}
              </h2>
            </div>
            <p className={`mt-4 text-lg leading-relaxed ${textColor === 'text-neutral-light' ? 'text-gray-300' : 'text-neutral'} ${darkSubTextColor}`}>
              {description}
            </p>
            {points && points.length > 0 && (
              <ul className="mt-8 space-y-4">
                {points.map((point: FeaturePoint, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                       {/* Point.icon needs its own dark mode handling if it's custom. DefaultCheckIcon handles its own. */}
                      {point.icon || <DefaultCheckIcon className={`w-6 h-6 ${textColor === 'text-neutral-light' ? 'text-secondary' : 'text-primary'} ${textColor === 'text-neutral-light' ? 'dark:text-secondary-light' : 'dark:text-primary-light' }`} />}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-lg font-semibold ${textColor === 'text-neutral-light' ? 'text-white' : 'text-neutral-darker'} ${darkHeadingColor}`}>{point.title}</h3>
                      <p className={`mt-1 text-base ${textColor === 'text-neutral-light' ? 'text-gray-300' : 'text-neutral'} ${darkSubTextColor}`}>{point.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;