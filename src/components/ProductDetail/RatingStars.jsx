import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-gray-500">({rating || 0})</span>
    </div>
  );
};

export default RatingStars;