// components/Testimonial.tsx
import React from 'react';

interface TestimonialProps {
  name: string;
  imageSrc: string;
  quote: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, imageSrc, quote }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
    <img
      src={imageSrc}
      alt={name}
      className="w-24 h-24 rounded-full object-cover mb-4"
    />
    <p className="text-lg font-semibold text-gray-800">{name}</p>
    <p className="text-center text-gray-700 mt-4">{quote}</p>
  </div>
);

export default Testimonial;
