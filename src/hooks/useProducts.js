import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../api';
import { ITEMS_PER_PAGE } from '../components/Collections/constants';

export const useProducts = (selectedCategory) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

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
      
      const response = await api[selectedCategory === 'All' ? 'get' : 'post'](
        selectedCategory === 'All' ? '/get-product' : '/product/category',
        selectedCategory === 'All' 
          ? { params: { page, limit: ITEMS_PER_PAGE } }
          : { category: selectedCategory, page, limit: ITEMS_PER_PAGE }
      );

      const { success, message, products: newProducts } = response.data;
      
      if (!success) {
        throw new Error(message || 'Failed to fetch products');
      }
      
      setProducts(prevProducts => {
        const combined = [...prevProducts, ...newProducts];
        return Array.from(new Map(combined.map(item => [item._id, item])).values());
      });
      
      setHasMore(newProducts.length === ITEMS_PER_PAGE);
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

  return {
    products,
    loading,
    error,
    hasMore,
    lastProductRef
  };
};
