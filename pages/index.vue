<template>
    <div class="min-h-screen mx-4">
        <div class="flex flex-wrap justify-center w-full">

            <div class="p-2" v-for="product in products" :key="product.id">
                <div
                    class="card card-compact w-64 h-[350px] bg-[#5bccf6] text-[#030e12] hover:shadow-sm hover:shadow-[#030e12]">
                    <NuxtLink :to="`product/${product.id}`">
                        <figure class="rounded-t-lg bg-[#fff]">
                            <img :src="product.images[0]" alt="product" class="w-full aspect-square object-contain " />
                        </figure>
                        <div class="card-body mb-2">
                            <p class="font-bold">{{ product.title }}</p>
                            <div class="flex justify-around">
                                <p class="indicator-item badge border-0 bg-[#030e12] text-[#fcde67] font-bold">Rs.{{
                                    product.price }}</p>
                                <p class="text-end">{{
                                    product.category.category
                                }}</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ApiService from "@/services/ApiService"
import { baseUrl } from "@/helper/constants"
import type { Products } from "@/helper/interface"
import { useSearchStore } from "~/stores/filter";

const searchStore = useSearchStore()

const products = ref<Products[]>([])

const search = ref('')
const categoryId = ref()
search.value = searchStore.getSearch()
categoryId.value = searchStore.getCategoryId()

watch(searchStore, (newSearch) => {
    search.value = newSearch.search
    getProducts()
})

watch(searchStore, (newCategoryId) => {
    categoryId.value = newCategoryId.categoryId
    getProducts()
})


const getProducts = async () => {
    const res = await ApiService.get(`${baseUrl}product?page=1&search=${search.value}&categoryIds=${categoryId.value === undefined || categoryId.value === 0 ? '' : categoryId.value}`)
    products.value = res.data.data
}


onMounted(() => {
    getProducts()
})
</script>

<style scoped></style>