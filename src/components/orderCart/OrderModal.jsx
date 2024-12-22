import React, { useState } from 'react';

export const OrderModal = ({ onClose, onPayment, orderData, setAddress }) => {
    const [localAddress, setLocalAddress] = useState(orderData.address || '');

    const handlePaymentClick = () => {
        if (!localAddress.trim()) {
            alert('Please enter a delivery address.');
            return;
        }

        // Update address in parent component and proceed with payment
        setAddress(localAddress);
        onPayment({ ...orderData, address: localAddress });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Confirm Your Order</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                    </label>
                    <textarea
                        value={localAddress}
                        onChange={(e) => setLocalAddress(e.target.value)}
                        placeholder="Enter your delivery address"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                </div>

                <p className="mb-2">
                    <strong>Total:</strong> Rs.{orderData.price}
                </p>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePaymentClick}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Proceed to Pay
                    </button>
                </div>
            </div>
        </div>
    );
};
