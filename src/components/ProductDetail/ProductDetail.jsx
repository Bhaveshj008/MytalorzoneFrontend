import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { addToCart } from '../../services/cartService';
import api from '../../api';

import ProductImage from './ProductImage';
import RatingStars from './RatingStars';
import QuantityControls from './QuantityControls';
import RelatedProducts from './RelatedProducts';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCartMessage, setAddToCartMessage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/product/${productId}`);
        
        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        setProduct(response.data.product);

        const relatedResponse = await api.post('/product/category', {
          category: response.data.product.category,
          limit: 5,
        });

        if (relatedResponse.data.success) {
          const filtered = relatedResponse.data.products
            .filter((item) => item._id !== productId)
            .slice(0, 5);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = userData?.userData?.userId;

  const handleAddToCart = async () => {
    const user = userId;
    const result = await addToCart(user, productId, quantity);
    setAddToCartMessage(result.message);
    setTimeout(() => setAddToCartMessage(null), 3000);
  };

  const handleIncrement = () => {
    if (product && quantity < product.inStockValue) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {addToCartMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {addToCartMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ProductImage src={product.img} alt={product.name} />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-red-500">Rs.{product.price}</p>
          <RatingStars rating={product.rating || 0} />
          
          <p
            className={`text-sm font-medium ${
              product.inStockValue > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {product.inStockValue > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-500 italic">
            "This is a top-quality product designed for durability and comfort."
          </p>
          
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            disabled={product.inStockValue === 0}
          >
            Add to Cart
          </button>

          <QuantityControls
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            maxQuantity={product.inStockValue}
          />
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetail;