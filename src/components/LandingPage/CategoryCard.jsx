import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 
      hover:shadow-xl sm:hover:-translate-y-2
      sm:block flex">
      {/* Image Container */}
      <div className="relative overflow-hidden
        sm:w-full w-1/3 sm:h-64 h-32">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transform transition-transform duration-500 
            group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-between
        sm:p-4 p-3 sm:w-full w-2/3">
        <div>
          <h3 className="font-semibold group-hover:text-red-500 transition-colors duration-300
            sm:text-xl text-lg sm:mb-2 mb-1 line-clamp-1">
            {category.title}
          </h3>
          <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300
            sm:mb-4 mb-2 line-clamp-2 sm:text-base text-sm">
            {category.description}
          </p>
        </div>

        {/* Link to the category page with category name in the URL */}
        <Link 
          to={`/collections`} 
          state={{ category: category.title }} // Pass category name as state
          className="text-red-500 font-semibold flex items-center transition-all duration-300 
            group-hover:text-red-600 sm:text-base text-sm"
        >
          View Category
          <ChevronRight className="w-4 h-4 ml-1 transform transition-transform duration-300 
            group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
