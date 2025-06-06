
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="aspect-[16/9] w-full overflow-hidden relative"
      style={{
        backgroundImage: "url('https://ai.prototypr.io/checkout/upload_file/shared/e4a762c1-3fd1-4bdc-a525-429e6612c67e.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-label="Hero section with Mr. Robot themed background"
    >
      {/* Text elements are removed as they are part of the background image now */}
      {/* Attribution text is also removed */}
    </section>
  );
};

export default Hero;
