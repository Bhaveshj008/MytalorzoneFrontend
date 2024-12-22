import React, { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from './constants';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const scroll = useCallback((direction) => {
    const scrollAmount = direction === 'left' ? -200 : 200;
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(containerRef.current.scrollLeft + scrollAmount);
    }
  }, []);

  return (
    <div className="relative mb-8">
      <div className="flex items-center">
        <button 
          onClick={() => scroll('left')}
          className="lg:hidden p-2 bg-white shadow-md rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div 
          ref={containerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-4 px-2 scroll-smooth"
        >
          {CATEGORIES.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => onCategoryChange(category)}
            />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="lg:hidden p-2 bg-white shadow-md rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const CategoryButton = React.memo(({ category, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${
      isSelected
        ? 'bg-red-500 text-white shadow-lg transform scale-105'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {category}
  </button>
));

export default React.memo(CategoryFilter);