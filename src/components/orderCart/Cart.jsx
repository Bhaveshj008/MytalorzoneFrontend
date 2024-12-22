import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { updateQuantity, removeItem } from './CartActions';
import { calculateTotal } from '../../utils/calculateTotal';
import CartItem from './CartItem';
import { OrderSummary } from './OrderSummary';
import { EmptyCart } from './EmptyCart';
import { LoadingState } from './LoadingState';
import { OrderModal } from './OrderModal';
import { loadRazorpay } from '../../utils/loadRazorpay';
import api from '../../api';

const Cart = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = userData?.userData?.userId;

    const { cartItems, products, loading, error, setCartItems, setError } = useCart(userId);

    const [isModalOpen, setModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [address, setAddress] = useState(''); // Dynamic address state

    const handleCheckout = () => setModalOpen(true);

    const handlePayment = async (orderData) => {
        try {
            setProcessing(true);

            // Load the Razorpay script
            const razorpayLoaded = await loadRazorpay();

            if (!razorpayLoaded) {
                setError('Failed to load Razorpay. Please try again later.');
                setProcessing(false);
                return;
            }

            // Open Razorpay payment gateway
            const options = {
                key: 'rzp_test_XkyAfIibqTU8Oz',
                amount: orderData.price * 100,
                currency: 'INR',
                name: 'Mytalorzone',
                description: 'Order Payment',
                handler: async (response) => {
                    const serverResponse = await api.post('/cart/place-order', {
                        ...orderData,
                    });

                    if (serverResponse.data.success) {
                        navigate(`/order-confirmation/${serverResponse.data.orderId}`);
                    }
                },
                prefill: {
                    name: userData.userData?.name,
                    email: userData.userData?.email,
                },
                theme: {
                    color: '#F37254',
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <LoadingState />;

    if (error) {
        return (
            <div className="min-h-[400px] flex items-center justify-center text-red-500">
                Error: {error}
            </div>
        );
    }

    if (cartItems.length === 0) {
        return <EmptyCart onBrowseProducts={() => navigate('/collections')} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.productId}
                            item={item}
                            product={products[item.productId]}
                            onUpdateQuantity={(newQuantity) =>
                                updateQuantity(userId, item.productId, newQuantity, setCartItems)
                            }
                            onRemoveItem={() =>
                                removeItem(userId, item.productId, setCartItems, setError)
                            }
                        />
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <OrderSummary
                        total={calculateTotal(cartItems, products)}
                        processing={processing}
                        onCheckout={handleCheckout}
                    />
                </div>
            </div>

            {isModalOpen && (
                <OrderModal
                    onClose={() => setModalOpen(false)}
                    onPayment={handlePayment}
                    orderData={{
                        userId,
                        address,
                        date: new Date().toLocaleDateString(),
                        time: new Date().toLocaleTimeString(),
                        price: calculateTotal(cartItems, products),
                        productsOrdered: cartItems,
                    }}
                    setAddress={setAddress} // Pass setAddress to update it from modal
                />
            )}
        </div>
    );
};

export default Cart;
