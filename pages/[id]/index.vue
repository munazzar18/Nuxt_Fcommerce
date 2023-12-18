<template>
    <div class="mt-4">
        <div class="grid grid-cols-12">
            <div class="col-span-6 mx-4">
                <div
                    class="carousel carousel-center w-full h-full rounded-box bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
                    <div class="carousel-item " v-for="(image, index) in images" :key="index">
                        <img :src="image" class="w-[100%] aspect-[3/2] object-contain mix-blend-darken" />
                    </div>
                </div>
            </div>
            <div class="col-span-6 mx-4 bg-gradient-to-l from-green-200 via-green-300 to-blue-500 p-6 rounded-box">
                <div class="mb-4">
                    <h1 class="font-bold text-3xl">{{ product?.title }}</h1>
                    <span class="text-gray-200">{{ product?.category.category }}</span>
                </div>
                <div class="mb-4">
                    <h2 class="font-semibold text-2xl underline underline-offset-4">Rs.{{ product?.price }}</h2>
                </div>
                <div class="mb-4 text-lg">
                    <p>{{ product?.description }}</p>
                </div>
                <div class="mb-4">
                    <div class="flex justify-start">
                        <label for="quantity" class="font-bold text-xl mr-4">Quantity</label>
                        <!-- <input id="quanity" type="number" class="input input-bordered input-info w-16 max-w-xs" /> -->
                        <div class="flex items-center">
                            <button class="btn btn-sm btn-circle mr-2" min="1" :disabled="quantity === 1"
                                @click="quantity > 1 && (quantity -= 1)">
                                <font-awesome-icon icon="fa-solid fa-minus" />
                            </button>
                            <input type="text" class="w-12 text-center border rounded-md px-2 py-1" min="1"
                                v-model="quantity" readonly />
                            <button class="btn btn-sm btn-circle ml-2" @click="quantity += 1"
                                :disabled="quantity === product?.quantity">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button class="btn bg-gradient-to-l from-green-200 via-green-300 to-blue-500  w-80 mx-4">Buy
                        Now</button>
                    <button class="btn bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white w-80 mx-4">Add To
                        Cart</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ApiService from '~/services/ApiService';



const url = "http://localhost:5005/api/"

const route = useRoute()
const id: any = route.params.id

interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    quantity: number,
    category: {
        id: number,
        category: string
    },
    images: string[]
}

const quantity = ref(1)

const product = ref<Product>()
const images = ref()

const getProduct = async () => {
    const res = await ApiService.get(`${url}product/${id}`)
    product.value = res.data?.data
    images.value = product.value?.images
}



onMounted(() => {
    getProduct()
})

</script>

<style scoped></style>