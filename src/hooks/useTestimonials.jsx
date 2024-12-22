import { useState, useEffect } from 'react';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonialsData = [
        {
          id: 1,
          name: 'Emma Johnson',
          role: 'Marketing Specialist',
          content: "I've never experienced such fantastic customer service! MyTalorzone exceeded my expectations with their prompt and attentive support.",
          image: 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
          rating: 5
        },
        {
          id: 2,
          name: 'Emma Johnson',
          role: 'Marketing Specialist',
          content: "I've never experienced such fantastic customer service! MyTalorzone exceeded my expectations with their prompt and attentive support.",
          image: 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
          rating: 5
        },
        {
          id: 3,
          name: 'Emma Johnson',
          role: 'Marketing Specialist',
          content: "I've never experienced such fantastic customer service! MyTalorzone exceeded my expectations with their prompt and attentive support.",
          image: 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
          rating: 5
        },
        {
          id: 4,
          name: 'Emma Johnson',
          role: 'Marketing Specialist',
          content: "I've never experienced such fantastic customer service! MyTalorzone exceeded my expectations with their prompt and attentive support.",
          image: 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
          rating: 5
        }
      ];
      setTestimonials(testimonialsData);
    };

    fetchTestimonials();
  }, []);

  return { testimonials, currentTestimonial, setCurrentTestimonial };
};