import { useState, useEffect } from 'react';
import api from '../api'; // Ensure you have this utility or replace with your HTTP client setup

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        console.log('API Response:', response);

        const data = response.data;

        if (data.success) {
          const mappedCategories = data.categories.map((category, index) => ({
            id: index + 1,
            title: category.category,
            description: `Discover our collection of ${category.category.toLowerCase()} for every occasion.`,
            image: category.product?.img || 'https://www.shutterstock.com/shutterstock/photos/2059817444/display_1500/stock-vector-no-image-available-photo-coming-soon-illustration-vector-2059817444.jpg',
            items: category.product?.items || 0,
          }));

          setCategories(mappedCategories);
        } else {
          console.error('Error fetching Categories:', data.message);
        }
      } catch (error) {
        console.error('Error fetching Categories:', error.message);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures it only runs once on mount

  return categories;
};
