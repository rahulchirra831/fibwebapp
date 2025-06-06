
import React, { useState } from 'react';
import { FAQItemData } from '../types';

// Heroicons (MIT License) - https://heroicons.com
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 transform transition-transform duration-200" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);


interface FAQItemProps {
  item: FAQItemData;
}

const FAQItem: React.FC<FAQItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-neutral-700 py-6">
      <dt>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-start justify-between text-left text-neutral-dark dark:text-neutral-100"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${item.question.replace(/\s+/g, '-')}`}
        >
          <span className="text-lg font-medium text-neutral-darker dark:text-neutral-50">{item.question}</span>
          <span className="ml-6 flex h-7 items-center">
            <ChevronDownIcon className={`${isOpen ? '-rotate-180' : 'rotate-0'} text-neutral-500 dark:text-neutral-400`} />
          </span>
        </button>
      </dt>
      <dd 
        className={`mt-2 pr-12 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        id={`faq-answer-${item.question.replace(/\s+/g, '-')}`}
      >
        <p className="text-base text-neutral dark:text-neutral-300 pt-1 pb-2">{item.answer}</p>
      </dd>
    </div>
  );
};

export default FAQItem;