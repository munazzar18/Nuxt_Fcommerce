<template>
    <div>
        <div class="min-h-screen overflow-visible">
            <div class="drawer lg:drawer-open  ">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle " />
                <div class="drawer-content flex flex-col items-center justify-center">
                    <!-- Page content here -->
                    <slot>
                    </slot>
                </div>
                <div class="drawer-side bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-60 h-screen overflow-visible">
                        <!-- Sidebar content here -->
                        <div class="flex flex-col justify-between min-h-full">
                            <div>
                                <li class="mb-2">
                                    <NuxtLink to="/">Market/Home</NuxtLink>
                                </li>
                                <li class="mb-2">
                                    <NuxtLink to="/admin/dashboard">My Products</NuxtLink>
                                </li>
                                <li class="mb-2">
                                    <NuxtLink to="/admin/add-product">Add New Product</NuxtLink>
                                </li>
                            </div>
                            <div>
                                <li>
                                    <a>Logout</a>
                                </li>
                            </div>

                        </div>
                    </ul>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" ></style>