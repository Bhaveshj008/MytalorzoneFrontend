import { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../api';

const useCart = (userId) => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.post('/cart/get-cart', { userId });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const productIds = response.data.cart.productsInCart.map(item => item.productId);
            const productDetails = await Promise.all(
                productIds.map(id => api.get(`/product/${id}`))
            );

            const productMap = {};
            productDetails.forEach(response => {
                if (response.data.success) {
                    const product = response.data.product;
                    productMap[product.productId] = product;
                }
            });

            setProducts(productMap);

            const cartItemsWithQuantity = response.data.cart.productsInCart.map(item => ({
                ...item,
                quantity: item.productQty,
            }));

            setCartItems(cartItemsWithQuantity);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const memoizedCartData = useMemo(() => {
        return {
            cartItems,
            products,
            loading,
            error,
        };
    }, [cartItems, products, loading, error]);

    return { ...memoizedCartData, setCartItems, setError };
};

export default useCart;
