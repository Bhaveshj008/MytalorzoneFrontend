import React from 'react';
import { Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products, 
  loading, 
  hasMore, 
  lastProductRef, 
 
}) => (
  <>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          ref={index === products.length - 1 ? lastProductRef : null}
        />
      ))}
    </div>
    {loading && (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    )}
  </>
);

export default React.memo(ProductGrid);