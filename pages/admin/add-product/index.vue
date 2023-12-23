<template>
    <div>
        <div class="card w-[800px] mt-6 bg-[#5bccf6]  shadow-xl">
            <div class="card-body">
                <h1 class="font-bold text-xl">Add New Product</h1>
                <form @submit.prevent="createProduct" id="submit">
                    <div class="grid grid-cols-12">
                        <div class="col-span-6">
                            <label class="form-control w-full max-w-xs ">
                                <div class="label">
                                    <span class="label-text font-bold text-base">Title</span>
                                </div>
                                <input type="text" placeholder="Enter title" v-model="title"
                                    class="input input-bordered w-full max-w-xs" />

                            </label>
                        </div>
                        <div class="col-span-6">
                            <label class="form-control w-full max-w-xs ">
                                <div class="label font-bold text-base">
                                    <span class="label-text">Quantity</span>
                                </div>
                                <input type="number" placeholder="Enter Quantity" v-model="quantity"
                                    class="input input-bordered w-full max-w-xs" />

                            </label>
                        </div>
                        <div class="col-span-6">
                            <label class="form-control w-full max-w-xs ">
                                <div class="label font-bold text-base">
                                    <span class="label-text">Price</span>
                                </div>
                                <input type="number" placeholder="Enter Price" v-model="price"
                                    class="input input-bordered w-full max-w-xs" />

                            </label>
                        </div>
                        <div class="col-span-6">
                            <label class="form-control w-full max-w-xs ">
                                <div class="label font-bold text-base">
                                    <span class="label-text">Category</span>
                                </div>
                                <select class="select  w-full max-w-xs" v-model="category">
                                    <option value="" selected>Select Category</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">{{
                                        category.category }}</option>
                                </select>
                            </label>
                        </div>
                        <div class="col-span-6">
                            <label class="form-control w-full max-w-xs ">
                                <div class="label">
                                    <span class="label-text font-bold text-base">Upload Images</span>
                                </div>
                                <input type="file" multiple class="file-input file-input-bordered w-full max-w-xs"
                                    @change="uploadImage" />

                            </label>
                        </div>

                    </div>
                    <div class="w-full ">
                        <label class="w-full max-w-xs  ">
                            <div class="label">
                                <span class="label-text font-bold text-base">Description</span>
                            </div>
                            <textarea class="textarea w-full h-52" placeholder="Description..."
                                v-model="description"></textarea>

                        </label>
                    </div>

                    <div role="alert" class="toast" v-if="alertMessage">
                        <div class="alert bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white">
                            <span>{{ alertMessage }}</span>
                        </div>
                    </div>
                    <div class="card-actions justify-end">
                        <button type="submit" ref="submitButton"
                            class="btn bg-[#fcde67] border-0 hover:bg-[#030e12] hover:text-[#5bccf6] text-[#030e12]">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

import type { Categories } from "@/helper/interface";
import ApiService from "~/services/ApiService";
import { baseUrl } from "~/helper/constants";


const title = ref('')
const price = ref<number>()
const quantity = ref<number>()
const category = ref<number>()
const description = ref('')
const imagePath = ref<string[]>([])
const alertMessage = ref('')
const categories = ref<Categories[]>([])

const dismissAlert = () => {
    setTimeout(() => {
        alertMessage.value = '';
    }, 3000);
};

const uploadImage = async (e: any) => {
    const filePath = e.target.files
    const filePathData = new FormData();
    for (let i = 0; i < filePath.length; i++) {
        filePathData.append("files", filePath[i])
    }
    const res = await ApiService.post(`${baseUrl}product/upload`, filePathData)
    imagePath.value = res.data.data;
}

const getCategories = async () => {
    const res = await ApiService.get(`${baseUrl}category`)
    categories.value = res.data.data
}


const createProduct = async () => {
    const formData = {
        title: title.value,
        price: price.value,
        quantity: quantity.value,
        categoryId: category.value,
        images: [imagePath.value],
        description: description.value
    }

    try {
        const res = await ApiService.post(`${baseUrl}product`, formData)
        alertMessage.value = res.data.message
        dismissAlert()
    } catch (error: any) {
        alertMessage.value = error.message
        dismissAlert()
    }

}

onMounted(() => {
    getCategories()
})

</script>

<style scoped></style>