import api from "../../api";


export const updateQuantity = async (userId, productId, newQuantity, setCartItems) => {
    
    if (newQuantity < 1) return;

    try {
        await api.put('/cart/update-quantity', {
            userId: userId,
            productId: productId,
            productQty: newQuantity
        });

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    } catch (err) {
        console.error('Error updating quantity:', err);
    }
};

export const removeItem = async (userId, productId, setCartItems, setError) => {
    try {
        setCartItems(prevItems =>
            prevItems.filter(item => item.productId !== productId)
        );

        await api.post('/cart/delete-items', {
            userId,
            productId
        });
    } catch (err) {
        console.error('Error removing item:', err);
        setError('Failed to remove item. Please try again.');
    }
};