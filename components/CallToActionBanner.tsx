
import React from 'react';
import Button from './Button';

const CallToActionBanner: React.FC = () => {
  return (
    <section className="bg-primary dark:bg-primary-dark py-16 md:py-20 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Ready to Elevate Your Fitness Journey?
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-primary-light dark:text-indigo-200 opacity-90">
          Join thousands of users who trust our platform to achieve their fitness goals and lead healthier lives. 
          Start your free trial today and experience the difference.
        </p>
        <div className="mt-10">
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 focus:ring-white dark:bg-neutral-100 dark:text-primary-dark dark:hover:bg-neutral-200 dark:focus:ring-neutral-300"
          >
            Start Your Free Trial Now
          </Button>
        </div>
         <p className="mt-6 text-sm text-primary-light dark:text-indigo-200 opacity-80">No credit card required. Cancel anytime.</p>
      </div>
    </section>
  );
};

export default CallToActionBanner;
