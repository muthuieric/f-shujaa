import React from 'react';
import Image from 'next/image';


const HeroSection: React.FC = () => {
  return (
    // <section className="relative flex flex-col items-center justify-center min-h-screen bg-W-100">
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
            {/* Background Image */}
            <Image
                src="/1.webp" // Replace with your image path
                alt="Hero Image"
                fill
                className="object-cover"
                priority // Ensures the image loads first
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    Welcome to    F-<span className="text-shujaa hover:text-shujaa-dark">Shujaa</span>

                </h1>
                {/* <button className="bg-shujaa text-white px-8 py-3 rounded-lg text-lg hover:bg-shujaa-dark transition duration-300">
                    Get Started
                </button> */}
            </div>
     
    </section>
  );
};

export default HeroSection;
