import React, { useState, useRef, useEffect } from 'react';
import { WorkoutCategory } from '../types';

interface CategorySelectorDropdownProps {
  categories: WorkoutCategory[];
  onCategorySelect: (category: WorkoutCategory) => void;
  value: WorkoutCategory | null; 
  placeholder?: string;
  className?: string;
}

const CategorySelectorDropdownComponent: React.FC<CategorySelectorDropdownProps> = ({
  categories,
  onCategorySelect,
  value,
  placeholder = "Select a category",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      const selectedItem = listRef.current.querySelector('[aria-selected="true"]') as HTMLLIElement;
      if (selectedItem) {
        // selectedItem.focus(); 
      } else {
        const firstItem = listRef.current.querySelector('[role="option"]') as HTMLLIElement;
        if (firstItem) {
          // firstItem.focus(); 
        }
      }
    }
  }, [isOpen]);

  const handleCategoryClick = (category: WorkoutCategory) => {
    onCategorySelect(category);
    setIsOpen(false);
    buttonRef.current?.focus(); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement | HTMLLIElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
      return;
    }

    if (listRef.current && isOpen) {
        const items = Array.from(listRef.current.querySelectorAll('[role="option"]')) as HTMLLIElement[];
        const activeElement = document.activeElement as HTMLLIElement;
        let currentIndex = items.indexOf(activeElement);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex]?.focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            items[currentIndex]?.focus();
        } else if (event.key === 'Enter' || event.key === ' ') {
            if (items.includes(activeElement) && value?.id !== categories[currentIndex]?.id ) {
                event.preventDefault();
                handleCategoryClick(categories[currentIndex]);
            }
        } else if (event.key === 'Tab') {
            setIsOpen(false); 
        }
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
        if (event.currentTarget === buttonRef.current){
            event.preventDefault();
            setIsOpen(true);
        }
    }
  };

  const displayLabel = value ? value.name : placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        className={`w-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm px-3 py-2.5 text-left text-sm font-medium flex items-center justify-between
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 focus:ring-primary dark:focus:ring-primary-light
                    transition-colors duration-150
                    ${value ? 'text-neutral-800 dark:text-neutral-100' : 'text-neutral-500 dark:text-neutral-400'}
                  `}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={placeholder} 
        aria-activedescendant={isOpen && value ? `option-${value.id}` : undefined}
      >
        <span className="block truncate">{displayLabel}</span>
        <svg className={`w-5 h-5 text-neutral-400 dark:text-neutral-500 transform transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      <ul
        ref={listRef}
        className={`absolute z-10 mt-1 w-full bg-white dark:bg-neutral-700 shadow-lg max-h-20 rounded-lg py-1 text-base ring-1 ring-neutral-300 dark:ring-neutral-600 ring-opacity-5 dark:ring-opacity-20 overflow-auto focus:outline-none sm:text-sm
                    transition-all duration-150 ease-out transform origin-top scrollbar-hide [&::-webkit-scrollbar]:hidden
                    ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}`}
        role="listbox"
        tabIndex={-1}
        aria-label={placeholder} 
      >
        {categories.length > 0 ? categories.map((category) => (
          <li
            key={category.id}
            id={`option-${category.id}`}
            className={`text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer select-none relative py-2 pl-3 pr-9 group flex items-center
                        focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-600 transition-colors duration-100`}
            role="option"
            aria-selected={value?.id === category.id}
            onClick={() => handleCategoryClick(category)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCategoryClick(category); } else { handleKeyDown(e); }}}
            tabIndex={0}
          >
            <span className={`block truncate ${value?.id === category.id ? 'font-semibold text-primary dark:text-primary-light' : 'font-normal'}`}>
              {category.name}
            </span>
            {value?.id === category.id && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary dark:text-primary-light">
                   <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                     <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                   </svg>
                </span>
            )}
          </li>
        )) : (
          <li className="text-neutral-500 dark:text-neutral-400 cursor-default select-none relative py-2 px-3">
            No categories available.
          </li>
        )}
      </ul>
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  
          scrollbar-width: none;  
        }
      `}</style>
    </div>
  );
};

const CategorySelectorDropdown = React.memo(CategorySelectorDropdownComponent);
export default CategorySelectorDropdown;