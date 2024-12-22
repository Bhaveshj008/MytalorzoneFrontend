import React from 'react';
import { Loader2 } from 'lucide-react';

export const OrderSummary = ({ total, processing, onCheckout }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs.{total}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Rs.{total}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={processing}
        className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </span>
        ) : (
          'Proceed to Checkout'
        )}
      </button>
    </div>
  );
};
