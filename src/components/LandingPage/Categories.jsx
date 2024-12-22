// src/components/categories/categories.jsx
import React from 'react';
import CategoryCard from './CategoryCard';
const Categories = ({ categories }) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-fade-in">
          Featured categories
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-fade-in delay-200">
          Discover our latest categories crafted for your unique style
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
