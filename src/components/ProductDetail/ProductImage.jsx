import React from 'react';

const ProductImage = ({ src, alt }) => {
  return (
    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img
        src={src || '/api/placeholder/400/400'}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProductImage;