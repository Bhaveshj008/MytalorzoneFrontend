export const calculateTotal = (cartItems, products) => {
    return cartItems.reduce((total, item) => {
        const product = products[item.productId];
        return total + (product?.price || 0) * item.quantity;
    }, 0);
};