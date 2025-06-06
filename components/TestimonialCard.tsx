
import React from 'react';
import { Testimonial } from '../types';

const StarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-yellow-400 dark:text-yellow-300" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.423 3.352c-.576.562-.263 1.53.547 1.695l4.838.733 2.074 4.418c.317.718 1.407.718 1.724 0l2.074-4.418 4.838-.733c.81-.164 1.123-1.133.547-1.695L17.452 7.675l-4.753-.39-1.83-4.401z" clipRule="evenodd" />
  </svg>
);


const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-neutral-700 p-8 rounded-xl shadow-lg dark:shadow-neutral-900/50 flex flex-col h-full transition-all duration-300 ease-out hover:shadow-xl dark:hover:shadow-primary-dark/30 hover:scale-[1.02]">
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
      </div>
      <blockquote className="text-neutral dark:text-neutral-300 italic mb-6 flex-grow">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center mt-auto">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <p className="font-semibold text-neutral-darker dark:text-neutral-100">{testimonial.name}</p>
          <p className="text-sm text-neutral dark:text-neutral-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;