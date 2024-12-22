import React from 'react';
import Hero from './Hero';
import Categories from './Categories';
import Testimonials from './Testimonials';
import { useCategories } from '../../hooks/useCategories';
import { useTestimonials } from '../../hooks/useTestimonials';
const LandingPage = () => {
    const categories = useCategories();
    const { testimonials, currentTestimonial } = useTestimonials();
  
    return (
      <div className="min-h-screen">
        <Hero />
        <Categories categories={categories} />
        <Testimonials 
          testimonials={testimonials}
          currentTestimonial={currentTestimonial}
        />
      
    
      </div>
    );
  };
  
  export default LandingPage;