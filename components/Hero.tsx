
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="aspect-[16/9] w-full overflow-hidden relative"
      style={{
        backgroundImage: "url('https://ik.imagekit.io/coxftihos/wp11590840-jeffrey-dahmer-wallpapers.jpg?updatedAt=1749188315237')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-label="Hero section with background image and title"
    >
      {/* Top-left Title */}
      <div className="absolute top-28 left-0 z-10 p-4 sm:p-6 md:p-8 lg:p-12"> {/* Changed top-8 to top-28 */}
        <div className="animate-fadeIn animation-delay-200">
          <div
            className="text-left font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-red-600 uppercase tracking-wider leading-tight"
            style={{ 
              fontFamily: "'Orbitron', sans-serif", 
              fontWeight: 900, 
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)' 
            }}
          >
            EVERY
          </div>
          <div
            className="text-left font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-red-600 uppercase tracking-wider leading-tight"
            style={{ 
              fontFamily: "'Orbitron', sans-serif", 
              fontWeight: 900, 
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)' 
            }}
          >
            REP
          </div>
          <div
            className="text-left font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-red-600 uppercase tracking-wider leading-tight"
            style={{ 
              fontFamily: "'Orbitron', sans-serif", 
              fontWeight: 900, 
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)' 
            }}
          >
            COUNTS
          </div>
        </div>
      </div>
      
      {/* Bottom-left attribution text */}
      <div className="absolute bottom-0 left-0 container mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="pb-4 sm:pb-6 lg:pb-8">
          <p 
            className="text-xs sm:text-sm text-neutral-300/80 dark:text-neutral-400/80 
                       animate-fadeIn animation-delay-800 
                       bg-black/20 dark:bg-black/30 backdrop-blur-sm 
                       px-2 py-1 rounded-md inline-block"
          >
            Developed by Rahul Chirra
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
