// components/TestimonialsSection.tsx
import React from 'react';
import Testimonial from './Testimonial';

const TestimonialsSection: React.FC = () => (
  <section className="py-12 bg-gray-100">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Users Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Testimonial
          name="John Doe"
          imageSrc="./st1.jpeg"
          quote="This platform has transformed the way I learn new skills. Highly recommend!"
        />
        <Testimonial
          name="Jane Smith"
          imageSrc="./st2.jpeg"
          quote="An invaluable resource for professional development. The courses are top-notch."
        />
        <Testimonial
          name="Johnson Brown"
          imageSrc="./st3.jpeg"
          quote="I love the interactive learning approach. It's engaging and effective."
        />
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
