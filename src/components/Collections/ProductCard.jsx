import React, { useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../services/cartService';

const ProductCard = forwardRef(({ product, onClick }, ref) => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = userData?.userData?.userId;
  const [addToCartMessage, setAddToCartMessage] = useState(null);

  const handleAddToCart = async (productId) => {
    if (!userId) {
      setAddToCartMessage('Please log in to add items to the cart.');
      setTimeout(() => setAddToCartMessage(null), 3000);
      return;
    }
    try {
      const result = await addToCart(userId, productId, 1); 
      setAddToCartMessage(result.message);
    } catch (error) {
      setAddToCartMessage('Failed to add item to the cart.');
    }
    setTimeout(() => setAddToCartMessage(null), 3000);
  };

  return (
    <div 
      ref={ref}
      className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
      onClick={onClick}
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
        <AddToCartButton productId={product.productId} handleAddToCart={handleAddToCart} />
      </div>

      {addToCartMessage && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow-lg text-sm">
          {addToCartMessage}
        </div>
      )}
    </div>
  );
});

const AddToCartButton = React.memo(({ productId, handleAddToCart }) => (
  <button 
    className="mt-2 w-full py-2 bg-white text-black rounded-full transform transition-all duration-300 hover:bg-red-500 hover:text-white"
    onClick={(e) => {
      e.stopPropagation();
      handleAddToCart(productId);
    }}
  >
    Add to Cart
  </button>
));

export default React.memo(ProductCard);
