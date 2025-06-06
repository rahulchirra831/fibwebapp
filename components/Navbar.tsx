
import React, { useState, useRef, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import Button from './Button';
import { NavLink as NavLinkType, NavAction } from '../types'; 
import Switch from './Switch'; 

// Heroicons (MIT License) - https://heroicons.com
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 ml-1" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

const Bars3Icon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


interface NavDropdownProps {
  item: NavLinkType;
  onNavigateToCountdownTimer?: () => void;
  closeMobileMenu?: () => void; 
}

const NavDropdownComponent: React.FC<NavDropdownProps> = ({ item, onNavigateToCountdownTimer, closeMobileMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (subLink: NavLinkType) => {
    setIsOpen(false);
    if (closeMobileMenu) closeMobileMenu();

    if (subLink.action === 'navigateToCountdownTimer' && onNavigateToCountdownTimer) {
      onNavigateToCountdownTimer();
    } else if (typeof subLink.action === 'function') {
      subLink.action();
    } else if (subLink.href && subLink.href !== '#') {
      // Standard href navigation
    }
  };


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center text-neutral-dark dark:text-neutral-100 hover:text-primary dark:hover:text-primary-light transition-colors duration-150 py-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        {item.dropdown && <ChevronDownIcon />}
      </button>
      {item.dropdown && isOpen && (
        <div
          className="absolute z-20 mt-1 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-neutral-700 py-1 opacity-0 scale-95 animate-fadeInDropdown"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          style={{ animationFillMode: 'forwards', animationDuration: '150ms' }} 
        >
          {item.dropdown.map((subLink) => (
            <a 
              key={subLink.label}
              href={subLink.href} 
              className="block px-4 py-2 text-sm text-neutral-dark dark:text-neutral-200 hover:bg-neutral-light dark:hover:bg-neutral-700 hover:text-primary dark:hover:text-primary-light transition-colors duration-150"
              onClick={(e) => {
                if (subLink.action || (subLink.href && subLink.href.startsWith('#'))) e.preventDefault(); 
                handleItemClick(subLink);
              }}
            >
              {subLink.label}
            </a>
          ))}
        </div>
      )}
      <style>{`
        @keyframes fadeInDropdown {
          from { opacity: 0; transform: scale(0.95) translateY(-5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeInDropdown {
          animation-name: fadeInDropdown;
        }
      `}</style>
    </div>
  );
};

const NavDropdown = React.memo(NavDropdownComponent);

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onNavigateHome: () => void;
  onNavigateToCountdownTimer: () => void;
  username: string | null; 
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode, onNavigateHome, onNavigateToCountdownTimer, username }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileSubLinkClick = (subLink: NavLinkType) => {
    setMobileMenuOpen(false);
    if (subLink.action === 'navigateToCountdownTimer' && onNavigateToCountdownTimer) {
      onNavigateToCountdownTimer();
    }
     else if (typeof subLink.action === 'function') {
      subLink.action();
    }
  };

  return (
    <header className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300 ease-in-out">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button onClick={onNavigateHome} className="text-2xl font-bold text-primary dark:text-primary-light focus:outline-none">
              FitShark
            </button>
          </div>

          <nav className="hidden lg:flex space-x-8 items-center">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <NavDropdown key={link.label} item={link} onNavigateToCountdownTimer={onNavigateToCountdownTimer} />
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                     if (link.action === 'navigateToCountdownTimer' && onNavigateToCountdownTimer) { e.preventDefault(); onNavigateToCountdownTimer(); }
                     else if (typeof link.action === 'function') { e.preventDefault(); link.action(); }
                  }}
                  className="text-neutral-dark dark:text-neutral-100 hover:text-primary dark:hover:text-primary-light transition-colors duration-150 py-2"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Switch checked={isDarkMode} onChange={toggleDarkMode} label="Toggle Dark Mode" />
            {username ? (
              <span className="text-neutral-dark dark:text-neutral-100 font-medium">Hi, {username}!</span>
            ) : (
              <>
                <Button variant="ghost" size="md">
                  Log In
                </Button>
                <Button variant="primary" size="md">
                  Sign Up Free
                </Button>
              </>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <Switch checked={isDarkMode} onChange={toggleDarkMode} label="Toggle Dark Mode" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-4 text-neutral-dark dark:text-neutral-100 hover:text-primary dark:hover:text-primary-light focus:outline-none p-2 rounded-md"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right z-40 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md shadow-lg animate-fadeInDropdown" style={{ animationDuration: '200ms', animationFillMode: 'forwards' }}>
          <div className="rounded-lg ring-1 ring-black ring-opacity-5 dark:ring-neutral-700 divide-y divide-gray-50 dark:divide-neutral-700">
            <div className="pt-5 pb-6 px-5 space-y-6">
              <nav className="grid gap-y-4">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.action === 'navigateToCountdownTimer' && onNavigateToCountdownTimer) { e.preventDefault(); handleMobileSubLinkClick(link); }
                        else if (typeof link.action === 'function') { e.preventDefault(); link.action(); setMobileMenuOpen(false); }
                        else if (!link.dropdown) { setMobileMenuOpen(false); }
                      }}
                      className="block text-base font-medium text-neutral-dark dark:text-neutral-100 hover:text-primary dark:hover:text-primary-light"
                    >
                      {link.label}
                    </a>
                    {link.dropdown && (
                      <div className="mt-2 pl-4 space-y-2">
                        {link.dropdown.map(subLink => (
                           <a
                            key={subLink.label}
                            href={subLink.href}
                            onClick={(e) => {
                              if (subLink.action || (subLink.href && subLink.href.startsWith('#'))) e.preventDefault();
                              handleMobileSubLinkClick(subLink);
                            }}
                            className="block text-sm text-neutral dark:text-neutral-300 hover:text-primary dark:hover:text-primary-light"
                           >
                            {subLink.label}
                           </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            <div className="py-6 px-5 space-y-6">
              {username ? (
                <p className="text-center text-base font-medium text-neutral-dark dark:text-neutral-100">
                  Hi, {username}!
                </p>
              ) : (
                <>
                  <Button variant="primary" size="md" className="w-full">
                    Sign Up Free
                  </Button>
                  <p className="mt-6 text-center text-base font-medium text-neutral dark:text-neutral-300">
                    Existing customer?{' '}
                    <a href="#" className="text-primary dark:text-primary-light hover:underline">
                      Log In
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
