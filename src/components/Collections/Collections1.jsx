import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import api from '../../api';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const categories = [
    "All",
    "Wedding",
    "Women's Wear",
    "Men's Wear",
    "Kids Western",
    "Girls' Frock",
    "Men's Clothing",
    "Women's Clothing",
    "Sportswear",
    "Kids Clothing"
  ];

  // Reference for the last product element
  const observer = useRef();
  const lastProductRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Fetch products based on category and page
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(selectedCategory)
      let response;
      if (selectedCategory === 'All') {
        response = await api.get('/get-product', {
          params: {
            page,
            limit: ITEMS_PER_PAGE
          }
        });
      } else {
        
        response = await api.post('/product/category', {
          category: selectedCategory,
          page,
          limit: ITEMS_PER_PAGE
        });
      }

      const data = response.data;
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch products');
      }
      
      setProducts(prevProducts => {
        // Filter out duplicates based on _id
        const newProducts = [...prevProducts, ...data.products];
        return Array.from(new Map(newProducts.map(item => [item._id, item])).values());
      });
      
      setHasMore(data.products.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset and fetch when category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);

  // Fetch when page or category changes
  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory]);

  const scroll = (direction) => {
    const container = document.getElementById('category-scroll');
    const scrollAmount = direction === 'left' ? -200 : 200;
    if (container) {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const QuickViewModal = ({ product, onClose }) => {
    if (!product) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="aspect-square">
              <img 
                src={product.images?.[0] || '/api/placeholder/400/400'} 
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-xl text-red-500 mb-4">${product.price?.toFixed(2)}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="space-y-4">
                <button className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Add to Cart
                </button>
                <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Filter Section */}
      <div className="relative mb-8">
        <div className="flex items-center">
          <button 
            onClick={() => scroll('left')}
            className="lg:hidden p-2 bg-white shadow-md rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div 
            id="category-scroll" 
            className="flex gap-3 overflow-x-auto scrollbar-hide py-4 px-2 scroll-smooth"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-red-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="lg:hidden p-2 bg-white shadow-md rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div 
            key={product._id}
            ref={index === products.length - 1 ? lastProductRef : null}
            className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
            onClick={() => openQuickView(product)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                src={product.img || '/api/placeholder/300/400'}
                alt={product.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-lg font-semibold truncate">{product.name}</h3>
              <p className="text-sm opacity-90">Rs.{product.price}</p>
              <button 
                className="mt-2 w-full py-2 bg-white text-black rounded-full transform transition-all duration-300 hover:bg-red-500 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart logic here
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        </div>
      )}

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductPage;