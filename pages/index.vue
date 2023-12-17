<template>
    <div class="mt-28 flex flex-wrap justify-around">
        <div class="m-1  " v-for="product in products" :key="product.id">

            <v-card class=" my-12 w-full " max-width="374">

                <!-- <v-img class="w-full aspect-[3/2] object-contain" cover :src="product.images[0]"></v-img> -->
                <img class="w-full aspect-[3/2] object-contain p-1 " :src="product.images[0]" />
                <v-card-item>
                    <v-card-title>{{ product.title }}</v-card-title>

                    <v-card-subtitle>
                        <span class="me-1">{{ product.category.category }}</span>

                        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                    </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
                            size="small"></v-rating>

                        <div class="text-grey ms-4">
                            4.5 (413)
                        </div>
                    </v-row>

                    <div class="flex justify-between my-4 underline font-bold">
                        <div>

                            Rs.{{ product.price }}
                        </div>
                        <div>
                            Quantity: {{ product.quantity }}
                        </div>
                    </div>

                    <div>
                        {{ product.description.substring(0, 70) }}...
                    </div>
                </v-card-text>

                <v-divider class="mx-4 mb-1"></v-divider>

                <v-card-actions>
                    <v-btn color="deep-purple" rounded="xl" variant="text" @click="addItemToCart(product.id)">
                        Add to Cart
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import ApiService from "@/services/ApiService"
import { useCartStore } from "@/stores/cart"
interface Products {
    id: number,
    title: string,
    description: string,
    quantity: number,
    price: number,
    images: string[],
    category: {
        id: number;
        category: string
    }
}

const cart = useCartStore()

const products = ref<Products[]>([])

const baseUrl = "http://localhost:5005/api/"
const getProducts = async () => {
    const res = await ApiService.get(`${baseUrl}product?page=1`)
    products.value = res.data.data
}

const addItemToCart = (productId: string | number) => {
    const formData: any = {
        productId: productId,
        quantity: 1
    }
    cart.addToCart(formData)
}


onMounted(() => {
    getProducts()
})
</script>

<style scoped></style>