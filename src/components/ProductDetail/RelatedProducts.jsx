import React from 'react';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ products }) => {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item.productId}`}
            className="group"
          >
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
              <img
                src={item.img || '/api/placeholder/200/200'}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <h3 className="font-medium truncate">{item.name}</h3>
            <p className="text-red-500">Rs.{item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;