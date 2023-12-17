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
                const response = await ApiService.post(`${url}cart`, productId);
                this.cartCount = await response.data.data
                return this.cartCount
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        },
        async getCart(userId: string | number) {
            try {
                const response = await ApiService.get(`${url}cart/userCart/${userId}`)
                const carts = await response.data.data
                if(carts.length > 0){
                const oneCart = carts ? carts.map((el: any) => el.quantity) : 0
                const grandTotal = oneCart.reduce((el: number, cl: number) => el + cl)
                this.cartCount = grandTotal
                return this.cartCount
                }
                else {
                    this.cartCount = 0
                    return this.cartCount
                }
                
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    },
});
