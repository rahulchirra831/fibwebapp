
import React from 'react';
import { FAQItemData } from '../types';
import FAQItem from './FAQItem';

interface FAQProps {
  faqs: FAQItemData[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-neutral-darker dark:text-neutral-50 tracking-tight mb-2">
            Frequently Asked <span className="text-primary dark:text-primary-light">Questions</span>
          </h2>
          <p className="text-center text-lg text-neutral dark:text-neutral-300 mb-12">
            Find answers to common questions about our platform.
          </p>
          <dl className="space-y-0 divide-y divide-gray-200 dark:divide-neutral-700">
            {faqs.map((faq, index) => (
              <FAQItem key={index} item={faq} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FAQ;