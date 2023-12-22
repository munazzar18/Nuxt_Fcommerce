<template>
    <div>
        <div class="card w-[600px] bg-gradient-to-l from-green-200 via-green-300 to-blue-500 shadow-xl">
            <div class="card-body">
                <h1 class="font-bold text-xl">Add New Product</h1>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label class="form-control w-full max-w-xs mb-2">
                            <div class="label">
                                <span class="label-text">Title</span>
                            </div>
                            <input type="text" placeholder="Enter title" v-model="title"
                                class="input input-bordered w-full max-w-xs" />

                        </label>
                    </div>
                    <div class="col-span-6">
                        <label class="form-control w-full max-w-xs mb-2">
                            <div class="label">
                                <span class="label-text">Quantity</span>
                            </div>
                            <input type="text" placeholder="Enter Quantity" v-model="quantity"
                                class="input input-bordered w-full max-w-xs" />

                        </label>
                    </div>
                    <div class="col-span-6">
                        <label class="form-control w-full max-w-xs mb-2">
                            <div class="label">
                                <span class="label-text">Quantity</span>
                            </div>
                            <input type="text" placeholder="Enter Quantity" v-model="quantity"
                                class="input input-bordered w-full max-w-xs" />

                        </label>
                    </div>
                    <div class="col-span-6">
                        <label class="form-control w-full max-w-xs mb-2">
                            <div class="label">
                                <span class="label-text">Quantity</span>
                            </div>
                            <input type="text" placeholder="Enter Quantity" v-model="quantity"
                                class="input input-bordered w-full max-w-xs" />

                        </label>
                    </div>
                    <div class="col-span-6">
                        <label class="form-control w-full max-w-xs mb-2">
                            <div class="label">
                                <span class="label-text">Quantity</span>
                            </div>
                            <input type="text" placeholder="Enter Quantity" v-model="quantity"
                                class="input input-bordered w-full max-w-xs" />

                        </label>
                    </div>
                    <div class="col-span-6">
                        <label class="form-control w-full max-w-xs mb-2">
                            <div class="label">
                                <span class="label-text">Quantity</span>
                            </div>
                            <input type="file"
                                class="file-input file-input-bordered file-input-ghost bg-gradient-to-r from-green-200 via-green-300 to-blue-500 w-full max-w-xs" />

                        </label>
                    </div>
                </div>
                <div class="card-actions justify-end">
                    <button class="btn bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped></style>