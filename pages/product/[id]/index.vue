<template>
    <div class="mt-4 min-h-screen mx-40">
        <div class="grid grid-cols-12">
            <div class="col-span-3 mx-1">
                <div class="rounded-box bg-[#5bccf6] p-2">
                    <div class="h-96 carousel carousel-vertical rounded-box">
                        <div class="carousel-item h-full" v-for="image in images" :key="image">
                            <img :src="image" class="w-[100%] aspect-[3/2] object-contain" />
                        </div>
                    </div>
                    <p class="text-slate-600">Scroll Inside to view more</p>
                </div>
            </div>
            <div class="col-span-9 mx-1 rounded-box">
                <div class="mb-4">
                    <h1 class="font-bold text-3xl">{{ product?.title }}</h1>
                    <span class="indicator-item badge border-0 bg-[#5bccf6]">{{ product?.category.category }}</span>
                </div>
                <div class="mb-4">
                    <h2 class="font-semibold text-2xl underline underline-offset-4">Rs.{{ product?.price }}</h2>
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
                <div class="flex justify-start gap-2">
                    <button class="btn bg-[#030e12] border-0 hover:bg-[#5bccf6] hover:text-[#030e12]  text-[#5bccf6] ">Buy
                        Now</button>
                    <button class="btn bg-[#030e12] border-0 hover:bg-[#5bccf6] hover:text-[#030e12] text-[#5bccf6]"
                        @click="addItemToCart">Add
                        To
                        Cart</button>
                </div>
                <div class="mt-8 text-lg text-justify">
                    <h2 class="font-extrabold text-2xl underline">Description / Specifications</h2>
                    <p class="mt-8">{{ product?.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ApiService from '../../../services/ApiService';
import { baseUrl } from '../../../helper/constants';
import type { Products } from "../../../helper/interface";
import { useCartStore } from "@/stores/cart"

const cart = useCartStore()

const route = useRoute()
const id: any = route.params.id

const quantity = ref(1)

const product = ref<Products>()
const images = ref()

const getProduct = async () => {
    const res = await ApiService.get(`${baseUrl}product/${id}`)
    product.value = res.data?.data
    images.value = product.value?.images
    console.log("Images:", images.value)
}

const addItemToCart = () => {
    const formData: any = {
        productId: id,
        quantity: quantity.value
    }
    cart.addToCart(formData)
}

onMounted(() => {
    getProduct()
})

</script>

<style scoped></style>