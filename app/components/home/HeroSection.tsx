import React from 'react';
import Image from 'next/image';


const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-W-100">
      {/* Full-Page Background Image */}
      <div className="absolute inset-0 z-0">
      <Image
  src="/sh.jpeg" // Ensure the image is in the public folder
  alt="FutureShujaa"
  layout="fill"
  objectFit="cover"
  quality={100} // Set the quality to 100
/>
 </div>

     
    </section>
  );
};

export default HeroSection;
