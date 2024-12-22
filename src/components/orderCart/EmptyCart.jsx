import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const EmptyCart = ({ onBrowseProducts }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-gray-500">
      <ShoppingBag className="w-16 h-16 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p>Start shopping to add items to your cart</p>
      <button
        onClick={onBrowseProducts}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Browse Products
      </button>
    </div>
  );
};