<template>
    <div class="mt-28 flex flex-wrap justify-around">
        <div class="m-8" v-for="product in products" :key="product.id">
            <div class="card card-compact w-96 bg-gradient-to-b from-sky-400 to-sky-200 shadow-xl">
                <NuxtLink :to="`/${product.id}`">
                    <figure>
                        <img :src="product.images[0]" alt="product"
                            class="w-[100%] aspect-[3/2] object-contain p-2 mix-blend-darken" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">{{ product.title }}</h2>
                        <p> {{ product.description.substring(0, 70) }}... </p>

                    </div>
                </NuxtLink>
                <div class="card-body">
                    <div class="card-actions justify-end">
                        <button class="btn bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white">Add
                            to
                            Cart </button>
                    </div>
                </div>
            </div>

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