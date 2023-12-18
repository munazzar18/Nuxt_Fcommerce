<template>
    <div class="navbar bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
        <div class=" flex-1">
            <NuxtLink to="/" class="mx-4 text-white text-xl">daisyUI</NuxtLink>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="badge badge-sm indicator-item bg-gray-900 text-white">{{ cartCount }}</span>
                    </div>
                </div>
                <div tabindex="0"
                    class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 shadow">
                    <div class="card-body">
                        <span class="font-bold text-lg text-white">{{ cartCount }} items</span>
                        <div class="card-actions">
                            <NuxtLink to="/cart"
                                class="btn bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 btn-block text-white">
                                View
                                cart</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost">
                    <div class="w-20 text-white">
                        Menu
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
                    <li>
                        <a class="justify-between text-white">
                            Profile
                        </a>
                    </li>
                    <li><a class="text-white">Settings</a></li>
                    <li v-if="checkAuth">
                        <a class="text-white" @click="handleLogin">Login</a>
                    </li>
                    <li v-else>
                        <a class="text-white" @click="handleLogout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const cart: any = useCartStore()
const auth = useAuthStore()

const cartCount = ref(0)
const checkAuth = ref()


cartCount.value = cart?.cartCount

const verifyAuth = async () => {
    const checking = auth.verifyAuth()
    if (checking) {
        checkAuth.value = true
    } else {
        checkAuth.value = false
    }
}

const handleLogin = () => {
    navigateTo("/login")

}

const handleLogout = async () => {
    checkAuth.value = false
    auth.logout()
}

watch(cart, () => {
    getCart()
})


const getCart = async () => {
    cartCount.value = await cart.getCart(2)
}

onMounted(async () => {
    await verifyAuth()
    getCart()

});

const colorGrad = ref(`
  background: linear-gradient(
    to right,
    rgb(233, 213, 255),
    rgb(192, 132, 252),
    rgb(107, 33, 168)
  )
`)


</script>

<style scoped>
.colorGrad {
    background: linear-gradient(to right, rgb(233, 213, 255), rgb(192, 132, 252), rgb(107, 33, 168));
}
</style>