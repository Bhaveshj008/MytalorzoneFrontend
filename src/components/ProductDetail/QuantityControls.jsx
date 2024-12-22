import React from 'react';
import { Plus, Minus } from 'lucide-react';

const QuantityControls = ({ quantity, onIncrement, onDecrement, maxQuantity }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-600">Quantity:</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={onDecrement}
          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center">{quantity}</span>
        <button
          onClick={onIncrement}
          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
          disabled={maxQuantity <= quantity}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {maxQuantity > 0 && (
        <span className="text-sm text-gray-500">
          ({maxQuantity} available)
        </span>
      )}
    </div>
  );
};

export default QuantityControls;