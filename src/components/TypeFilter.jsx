import React, { useState, useRef, useEffect } from 'react';


const TypeFilter = ({ selectedType, onTypeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const types = [
    { value: 'all', label: 'All Types', icon: '🎬' },
    { value: 'movie', label: 'Movies', icon: '🎥' },
    { value: 'series', label: 'TV Series', icon: '📺' },
    { value: 'episode', label: 'Episodes', icon: '📡' }
  ];

  const selectedTypeData = types.find(type => type.value === selectedType) || types[0];

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    onTypeChange(value);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <label 
        htmlFor="type-filter" 
        className="block text-sm sm:text-base font-bold text-gray-700 mb-3 text-center sm:text-left"
      >
        <span className="flex items-center justify-center sm:justify-start gap-2">
          <span className="text-lg sm:text-xl">🔍</span>
          <span>Filter by Type</span>
        </span>
      </label>
      
      {/* Custom Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 pr-12 sm:pr-14 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 bg-white text-gray-800 font-semibold shadow-lg hover:shadow-xl hover:border-primary-400 transition-all duration-300 text-left flex items-center justify-between group"
        >
          <span className="flex items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl">{selectedTypeData.icon}</span>
            <span className="text-sm sm:text-base">{selectedTypeData.label}</span>
          </span>
          <span className={`text-primary-600 text-xs font-bold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden animate-fade-in">
            {types.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleSelect(type.value)}
                className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 text-left flex items-center gap-2 sm:gap-3 transition-all duration-200 ${
                  selectedType === type.value
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold'
                    : 'text-gray-800 hover:bg-primary-50 hover:text-primary-600 font-semibold'
                }`}
              >
                <span className="text-lg sm:text-xl">{type.icon}</span>
                <span className="text-sm sm:text-base">{type.label}</span>
                {selectedType === type.value && (
                  <span className="ml-auto text-white">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Helper text */}
      <p className="mt-2 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
        Select a type to filter results
      </p>
    </div>
  );
};

export default TypeFilter;
