import React from 'react';

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
              src={product.img || '/api/placeholder/400/400'} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-xl text-red-500 mb-4">RS.{product.price}</p>
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

export default React.memo(QuickViewModal);