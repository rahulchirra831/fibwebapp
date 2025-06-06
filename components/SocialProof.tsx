
import React from 'react';
import { SOCIAL_PROOF_LOGOS } from '../constants';

const SocialProof: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-neutral dark:text-neutral-400 uppercase tracking-wider">
          Trusted by sellers on leading marketplaces
        </h2>
        <div className="mt-8 flow-root">
          <div className="-mt-4 -ml-8 flex flex-wrap justify-center lg:-ml-4">
            {SOCIAL_PROOF_LOGOS.map((logo) => (
              <div key={logo.name} className="mt-4 ml-8 flex flex-shrink-0 flex-grow justify-center lg:ml-4 lg:flex-grow-0">
                <img 
                  className="h-10 object-contain" 
                  src={logo.src} 
                  alt={logo.alt} 
                  width="120" // Assuming a general 3:1 aspect ratio for logos of h-10 (40px)
                  height="40"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;