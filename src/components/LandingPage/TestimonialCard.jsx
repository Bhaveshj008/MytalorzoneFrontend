import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image Container */}
        <div className="relative">
          <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-red-50 transform transition-all duration-300 hover:scale-105">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Rating Badge */}
          <div className="absolute -bottom-4 -right-4 bg-white rounded-full shadow-lg p-2">
            <div className="flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  style={{
                    animation: `star-pulse 1s ease-in-out ${i * 0.1}s infinite`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <Quote className="w-8 h-8 text-red-500/20 mb-4" />
          <p className="text-lg mb-6 text-gray-700 italic">
            {testimonial.content}
          </p>
          <div className="space-y-1">
            <h4 className="font-semibold text-lg">{testimonial.name}</h4>
            <p className="text-gray-600">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;