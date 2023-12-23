<template>
    <div class="min-h-screen mt-16 overflow-visible">
        <div class="drawer-content flex flex-col items-center justify-center">
            <!-- Page content here -->
            <div class="overflow-x-auto min-w-full w-[1020px] bg-[#5bccf6] rounded-box">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="product in products" :key="product.id">
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div class="flex items-center gap-3">
                                    <div class="rounded-2xl">
                                        <div class="mask rounded-2xl w-12 h-12">
                                            <img :src="product.images[0]" alt="product" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="font-bold">{{ product.title }}</span>
                                <br />
                                <span class="badge badge-ghost badge-sm">{{ product.category.category }}</span>
                            </td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ product.price }}</td>
                            <th>
                                <button class="btn btn-ghost btn-xs">Edit</button>
                                <button class="btn btn-ghost btn-xs">Delete</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})
import type { Products } from "../../../helper/interface"
import { baseUrl } from "../../../helper/constants"
import ApiService from "../../../services/ApiService"
import UserService from "../../../services/UserService"
import { onMounted, ref } from "vue";

const getUser = UserService.getUser()
const userId = ref()
userId.value = getUser?.id
const products = ref<Products[]>([])
const getMyProducts = async () => {
    const res = await ApiService.get(`${baseUrl}product/userId/${userId.value}`)
    products.value = res.data
    console.log("Products:", products.value)
}

onMounted(() => {
    getMyProducts()
})

</script>

<style scoped></style>
