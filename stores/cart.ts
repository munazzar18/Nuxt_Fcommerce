import { defineStore } from 'pinia';
import ApiService from '~/services/ApiService';

const url = "http://localhost:5005/api/"

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartCount: 0,
    }),
    actions: {
        async addToCart(productId: string | number) {
            try {
                // Make your API call here, assuming it returns data with a cart count
                const response = await ApiService.post(`${url}cart`, productId);
                // Update the cartCount state with the response from the API
                this.cartCount = await response.data.data.total
                return this.cartCount
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        },
        async getCart(userId: string | number) {
            try {
                const response = await ApiService.get(`${url}cart/userCart/${userId}`)
                this.cartCount = await response.data.data.total
                return this.cartCount
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    },
});
