<template>
    <div class="navbar bg-[#5bccf6]">
        <div class=" flex-1">
            <NuxtLink to="/" class="mx-4 text-[#030e12] text-xl">FCommerce</NuxtLink>
        </div>
        <div class="flex-none mx-4">
            <form @submit.prevent="onSubmit" class="mx-4">
                <div class="join">
                    <div>
                        <div>
                            <input class="input input-bordered join-item" placeholder="Search" v-model="search" />
                        </div>
                    </div>
                    <select class="select select-bordered join-item" v-model="categoryId" @change="filterByCategory">
                        <option selected>Categories</option>
                        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.category
                        }}</option>
                    </select>
                    <div class="indicator">
                        <button type="submit" ref="submit" class="btn bg-[#fcde67] join-item">Search</button>
                    </div>
                </div>
            </form>
            <div v-if="checkAuth" class="flex align-baseline">
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#030e12]" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="badge badge-sm indicator-item bg-[#5bccf6] text-[#030e12]">{{ myCart }}</span>
                        </div>
                    </div>
                    <div tabindex="0" class="mt-2 z-[1] card card-compact dropdown-content w-52  bg-[#5bccf6] shadow">
                        <div class="card-body">
                            <span class="font-bold text-lg text-[#030e12]">{{ myCart }} items</span>
                            <div class="card-actions">
                                <NuxtLink to="/cart" class="btn  btn-block text-[#030e12]">
                                    View
                                    cart</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dropdown dropdown-end mx-2">
                    <div tabindex="0" role="button" class="btn btn-ghost bg-[#fcde67]">
                        <div class="w-20 text-[#030e12]">
                            Hi, {{ username }}
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow rounded-box w-52  bg-[#5bccf6]">
                        <li>
                            <NuxtLink to="/customer/my-profile" class="justify-between text-[#030e12]">
                                Profile
                            </NuxtLink>
                        </li>
                        <li v-if="userRole === 'seller'">
                            <NuxtLink to="/admin/dashboard" class="text-[#030e12]">Dashboard</NuxtLink>
                        </li>
                        <li>
                            <a class="text-[#030e12]" @click="handleLogout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div tabindex="0" role="button" class="btn btn-ghost bg-[#fcde67]" v-else>
                <NuxtLink to="/login" class="text-[#030e12]">Login</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import UserService from "@/services/UserService"
import type { Categories } from "~/helper/interface";
import { getCategories } from "~/server/getCategories";
import { useSearchStore } from "~/stores/filter";

const searchStore = useSearchStore()
const categoryId = ref()
const cart: any = useCartStore()
const auth = useAuthStore()
const username = ref()
const getUser = UserService.getUser()
const search = ref('')

const myCart = ref(0)
const checkAuth = ref()
const userId = ref()
const userRole = ref()

username.value = getUser?.username
userId.value = getUser?.id
userRole.value = getUser?.role

myCart.value = cart?.cartCount

const verifyAuth = async () => {
    const checking = auth.verifyAuth()
    if (checking) {
        checkAuth.value = true
    } else {
        checkAuth.value = false
    }
}

const handleLogout = async () => {
    checkAuth.value = false
    auth.logout()
}

watch(cart, () => {
    getCart()
})

const categories = ref<Categories[]>([])

const getCart = async () => {
    myCart.value = await cart.getCart(userId.value)
}

const onSubmit = () => {
    searchStore.setSearch(search.value)
}

const filterByCategory = () => {
    searchStore.setCategory(categoryId.value)
}


onMounted(async () => {
    categories.value = await getCategories()
    await verifyAuth()
    getCart()

});



</script>

~/composables/useState