import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
const ProductCard = forwardRef(({ product, onClick }, ref) => (
  <div 
    ref={ref}
    className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
  >
    <Link to={`/product/${product.productId}`}>
  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
    <img
      src={product.img || '/api/placeholder/300/400'}
      alt={product.name}
      className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    />
  </div>
</Link>
    
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
      <h3 className="text-lg font-semibold truncate">{product.name}</h3>
      <p className="text-sm opacity-90">Rs.{product.price}</p>
      <AddToCartButton productId={product._id} />
    </div>
  </div>
));

const AddToCartButton = React.memo(({ productId }) => (
  <button 
    className="mt-2 w-full py-2 bg-white text-black rounded-full transform transition-all duration-300 hover:bg-red-500 hover:text-white"
    onClick={(e) => {
      e.stopPropagation();
      // Add to cart logic here
    }}
  >
    Add to Cart
  </button>
));

export default React.memo(ProductCard);
