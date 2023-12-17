<template>
    <v-app-bar color="indigo-darken-4">
        <NuxtLink to="/">
            <v-btn>Fcommerce</v-btn>
        </NuxtLink>
        <template v-slot:append>
            <NuxtLink to="/cart">
                <div class="relative mx-2">
                    <v-btn class="z-10" color="secondary" icon="mdi-cart">
                    </v-btn>
                    <span
                        class="absolute top-0 right-0  bg-red-500 text-white rounded-full w-4 h-4 flex items-center text-center justify-center text-xs">
                        {{ cartCount }}
                    </span>
                </div>
            </NuxtLink>
            <v-btn v-if="!checkAuth" class="ring-2 ring-gray-400" color="secondary" variant="plain" rounded="xl"
                prepend-icon="mdi-login" @click="handleLogin">Login</v-btn>
            <v-btn v-else class="ring-2 ring-gray-400" color="secondary" variant="plain" rounded="xl"
                prepend-icon="mdi-logout" @click="handleLogout">Logout</v-btn>
        </template>
    </v-app-bar>
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