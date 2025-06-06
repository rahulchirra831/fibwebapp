import React, { useState, useRef, useEffect } from 'react';
import { EquipmentItem } from '../types';

// Heroicons (MIT License) - ChevronsUpDownIcon
const ChevronsUpDownIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-neutral-400" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
  </svg>
);

// Heroicons (MIT License) - CheckIcon
const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

interface EquipmentDropdownProps {
  equipmentItems: EquipmentItem[];
  onEquipmentSelect: (equipment: EquipmentItem) => void;
  selectedEquipment: EquipmentItem | null;
  placeholder?: string;
  className?: string;
}

const EquipmentDropdownComponent: React.FC<EquipmentDropdownProps> = ({
  equipmentItems,
  onEquipmentSelect,
  selectedEquipment,
  placeholder = "Select equipment",
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
      const firstItem = listRef.current.querySelector('[role="option"]') as HTMLLIElement;
      if (firstItem) {
        // firstItem.focus(); 
      }
    }
  }, [isOpen]);


  const handleEquipmentClick = (equipment: EquipmentItem) => {
    onEquipmentSelect(equipment);
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
             if (items.includes(activeElement) && selectedEquipment?.id !== equipmentItems[currentIndex]?.id) { 
                event.preventDefault();
                handleEquipmentClick(equipmentItems[currentIndex]);
             }
        } else if (event.key === 'Tab') {
            setIsOpen(false); 
        }
    }
  };


  const displayLabel = selectedEquipment ? selectedEquipment.name : placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        className={`w-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm px-3 py-2 text-left text-sm font-medium flex items-center justify-between
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 focus:ring-primary dark:focus:ring-primary-light
                    transition-colors duration-150
                    ${selectedEquipment ? 'text-neutral-800 dark:text-neutral-100' : 'text-neutral-500 dark:text-neutral-400'}
                  `}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={displayLabel}
      >
        <span className="block truncate">{displayLabel}</span>
        <ChevronsUpDownIcon className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      <ul
        ref={listRef}
        className={`absolute z-10 mt-1 w-full bg-white dark:bg-neutral-700 shadow-lg max-h-32 rounded-md py-1 text-base ring-1 ring-neutral-300 dark:ring-neutral-600 ring-opacity-5 dark:ring-opacity-20 overflow-auto focus:outline-none sm:text-sm
                    transition-all duration-150 ease-out transform origin-top
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        role="listbox"
        tabIndex={-1} 
        aria-label="Equipment items"
      >
        {equipmentItems.length > 0 ? equipmentItems.map((item) => (
          <li
            key={item.id}
            className={`text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer select-none relative py-2 pl-3 pr-9 group flex items-center
                          focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-600 transition-colors duration-100`}
            role="option"
            aria-selected={selectedEquipment?.id === item.id}
            onClick={() => handleEquipmentClick(item)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleEquipmentClick(item); } else { handleKeyDown(e); } }}
            tabIndex={0} 
          >
            {selectedEquipment?.id === item.id && (
              <span className="text-primary dark:text-primary-light flex-shrink-0 mr-2 absolute left-3">
                <CheckIcon className="w-5 h-5" />
              </span>
            )}
            <span className={`block truncate ${selectedEquipment?.id === item.id ? 'font-semibold text-primary dark:text-primary-light' : 'font-normal'} ${selectedEquipment?.id === item.id ? 'ml-7' : 'ml-0'}`}>
              {item.name}
            </span>
          </li>
        )) : (
          <li className="text-neutral-500 dark:text-neutral-400 cursor-default select-none relative py-2 px-3">
            No equipment available.
          </li>
        )}
      </ul>
    </div>
  );
};

const EquipmentDropdown = React.memo(EquipmentDropdownComponent);
export default EquipmentDropdown;