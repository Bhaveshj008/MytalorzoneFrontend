import React, { useState, useEffect } from 'react';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';
import { useLocation } from 'react-router-dom';  

import { useProducts } from '../../hooks/useProducts';

const Collections = () => {
  const location = useLocation();
  const { category } = location.state || {};  
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const { 
    products, 
    loading, 
    error, 
    hasMore, 
    lastProductRef 
  } = useProducts(selectedCategory);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4 py-8">
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <ProductGrid 
        products={products}
        loading={loading}
        hasMore={hasMore}
        lastProductRef={lastProductRef}
      />
    </div>
  );
};

export default Collections;
