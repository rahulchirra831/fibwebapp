
import React from 'react';
import { Testimonial } from '../types';
import TestimonialCard from './TestimonialCard';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darker dark:text-neutral-50 tracking-tight">
            Loved by <span className="text-primary dark:text-primary-light">Thousands</span> of Sellers
          </h2>
          <p className="mt-4 text-lg text-neutral dark:text-neutral-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers are saying.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;