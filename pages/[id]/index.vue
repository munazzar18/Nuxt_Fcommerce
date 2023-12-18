<template>
    <div class="mt-24">
        <div class="grid grid-cols-12">
            <div class="col-span-6 mx-8">
                <v-carousel height="600">
                    <v-carousel-item v-for="(image, i) in product?.images" :src="image" :key="i">
                    </v-carousel-item>
                </v-carousel>
            </div>
            <div class="col-span-6">
                <div>
                    <div class="px-4 sm:px-0">
                        <h3 class=" font-bold text-2xl leading-7  text-gray-900">{{ product?.title }}</h3>
                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{ product?.category.category }}</p>
                    </div>
                    <div class="mt-6 border-t border-gray-100">
                        <dl class="divide-y divide-gray-100">
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Price</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Rs.{{ product?.price
                                }}
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Stock Available</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ product?.quantity
                                }}</dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Description</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{
                                    product?.description }}
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Order Now</dt>
                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div class="flex w-0 flex-1 items-center">
                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <v-btn>Add To Cart</v-btn>
                                                </div>
                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <v-btn>Buy Now</v-btn>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
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

const product = ref<Product>()

const getProduct = async () => {
    const res = await ApiService.get(`${url}product/${id}`)
    console.log("RES:", res.data.data)
    product.value = res.data?.data
}

onMounted(() => {
    getProduct()
})

</script>

<style scoped></style>