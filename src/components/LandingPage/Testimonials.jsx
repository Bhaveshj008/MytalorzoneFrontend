import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const Testimonials = ({ testimonials, currentTestimonial }) => {
  const [direction, setDirection] = useState('right');
  const [activeIndex, setActiveIndex] = useState(currentTestimonial);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAnimating, testimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 text-red-500/10 transform -translate-x-1/2 -translate-y-1/2">
          <Quote size={120} />
        </div>
        <div className="absolute bottom-0 right-0 text-red-500/10 transform translate-x-1/2 translate-y-1/2 rotate-180">
          <Quote size={120} />
        </div>

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from our valued customers
          </p>
        </div>

        {/* Navigation Buttons - Updated styles */}
        <div className="hidden md:flex justify-between absolute top-1/2 w-full left-0 right-0 -mt-4 px-2 z-20 pointer-events-none">
          <button
            onClick={prevTestimonial}
            disabled={isAnimating}
            className="pointer-events-auto p-3 rounded-full bg-white/90 shadow-lg text-gray-600 
              backdrop-blur-sm transform transition-all duration-300 
              hover:scale-110 hover:bg-red-500 hover:text-white 
              disabled:opacity-50 disabled:cursor-not-allowed
              opacity-75 hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            disabled={isAnimating}
            className="pointer-events-auto p-3 rounded-full bg-white/90 shadow-lg text-gray-600 
              backdrop-blur-sm transform transition-all duration-300 
              hover:scale-110 hover:bg-red-500 hover:text-white 
              disabled:opacity-50 disabled:cursor-not-allowed
              opacity-75 hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Testimonials */}
        <div className="relative h-[400px] group">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute w-full transition-all duration-500 transform
                ${index === activeIndex ? 'opacity-100 translate-x-0 z-10' : 
                  direction === 'right' 
                    ? index < activeIndex 
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                    : index < activeIndex 
                      ? 'opacity-0 translate-x-full z-0' 
                      : 'opacity-0 -translate-x-full z-0'}`}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setDirection(index > activeIndex ? 'right' : 'left');
                  setActiveIndex(index);
                }
              }}
              disabled={isAnimating}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${index === activeIndex ? 'bg-red-500 w-6' : 'bg-gray-300 hover:bg-red-300'}
                disabled:cursor-not-allowed`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;