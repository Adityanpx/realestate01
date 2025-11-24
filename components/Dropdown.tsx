import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
  align?: 'right' | 'left';
  label?: string;
  accentColor?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  align = 'right',
  label = 'More',
  accentColor = 'text-yellow-400',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prev) => 
          prev < items.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prev) => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex >= 0) {
          const item = items[focusedIndex];
          if (item.onClick) {
            item.onClick();
          }
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(items.length - 1);
        break;
    }
  };

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    }
  };

  const dropdownClasses = `
    absolute top-full mt-2 min-w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50
    animate-in fade-in-0 slide-in-from-top-2 duration-120
    ${align === 'right' ? 'right-0' : 'left-0'}
  `;

  const getItemClasses = (index: number) => `
    block px-4 py-3 text-white text-base hover:bg-gray-800 focus:bg-gray-800 
    focus:outline-none transition-colors duration-150
    ${focusedIndex === index ? 'bg-gray-800' : ''}
  `;

  const getButtonClasses = (index: number) => `
    w-full text-left px-4 py-3 text-white text-base hover:bg-gray-800 
    focus:bg-gray-800 focus:outline-none transition-colors duration-150
    ${focusedIndex === index ? 'bg-gray-800' : ''}
  `;

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={`flex items-center space-x-1 ${accentColor} hover:opacity-80 transition-opacity font-medium`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${label} menu`}
      >
        <span>{label}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={dropdownClasses}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <a
                  href={item.href}
                  className={getItemClasses(index)}
                  role="menuitem"
                  tabIndex={-1}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  className={getButtonClasses(index)}
                  role="menuitem"
                  tabIndex={-1}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

/*
Usage Example:

import Dropdown from './Dropdown';

const Navbar = () => {
  const moreMenuItems = [
    { label: 'Blogs', href: '/blogs' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
    
  ];

  return (
    <nav className="flex items-center space-x-8">
      <Dropdown 
        items={moreMenuItems} 
        label="More" 
        align="right"
        accentColor="text-blue-600"
      />
    </nav>
  );
};
*/