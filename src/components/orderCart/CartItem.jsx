import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item, product, onUpdateQuantity, onRemoveItem }) => {
    if (!product) return null;

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            {/* Product Image */}
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src={product.img || '/api/placeholder/96/96'}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-red-500">Rs.{product.price}</p>
            </div>

            {/* Quantity Controls */}
            {console.log(item)}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onUpdateQuantity(item.quantity - 1)}
                    className="p-1 rounded-full border border-gray-300 hover:bg-gray-200"
                >
                    <Minus className="w-4 h-4 text-gray-700" />
                </button>
                <span className="w-8 text-center font-medium text-gray-800">{item.quantity}</span>
                <button
                    onClick={() => onUpdateQuantity(item.quantity + 1)}
                    className="p-1 rounded-full border border-gray-300 hover:bg-gray-200"
                >
                    <Plus className="w-4 h-4 text-gray-700" />
                </button>
            </div>

            {/* Remove Item Button */}
            <button
                onClick={() => onRemoveItem(item.productId)}
                className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
};

export default CartItem;
