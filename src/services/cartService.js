import api from '../api'; // Adjust the path as per your project structure

/**
 * Add a product to the cart.
 * @param {string} userId - ID of the user.
 * @param {string} productId - ID of the product.
 * @param {number} quantity - Quantity of the product.
 * @returns {Promise<object>} - The API response.
 */
export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await api.post('/cart/addtocart', {
      userId,   
      productId,
      quantity,
    });

    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return { success: false, message: 'Please login to add product is cart' || 'Something went wrong' };
  }
};

