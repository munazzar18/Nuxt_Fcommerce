
<template>
    <div class="w-full min-h-screen">
        <div class="flex justify-center">
            <div class="flex bg-[#D19673] shadow-2xl rounded-l-xl w-96 mt-28">
                <img class="w-full aspect-[3/2] object-contain p-1" src="/ecommerce.png" />
            </div>
            <div class="shadow-2xl p-16 rounded-r-xl mt-28 bg-[#5bccf6]">
                <h1 class="text-2xl  font-bold text-[#030e12]">Welcome to Fcommerce</h1>
                <h2 class="text-xl mb-3 text-[#030e12] font-medium">Created & Designed by Munazzar</h2>
                <p class="text-red-500 font-semibold mb-1">{{ responseMessage }}</p>
                <form @submit.prevent="onSubmit">
                    <label class="form-control w-full max-w-xs mb-8">
                        <div class="label">
                            <span class="label-text text-[#030e12]">Email</span>
                        </div>
                        <input type="text" placeholder="Email" v-model="email"
                            class="input input-bordered w-full max-w-xs" />

                    </label>
                    <label class="form-control w-full max-w-xs mb-8">
                        <div class="label">
                            <span class="label-text text-[#030e12]">Password</span>
                        </div>
                        <input type="password" placeholder="Password" v-model="password"
                            class="input input-bordered w-full max-w-xs" />

                    </label>
                    <button type="submit"
                        class="btn bg-[#030e12] border-0 hover:bg-[#fcde67] hover:text-[#030e12] text-[#5bccf6]  w-80">Login</button>
                </form>
            </div>

        </div>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    layout: 'login'
})
import { ref } from 'vue';
import { useAuthStore, type User } from '~/stores/auth';

const loading = ref(false)
const email = ref('')
const password = ref('')
const responseMessage = ref('')

const onSubmit = async (values: any) => {
    const store = useAuthStore();
    loading.value = true
    const formData: any = {
        email: email.value,
        password: password.value,
    }
    store.logout()
    await store.login(formData)
    const error: any = Object.values(store.errors)
    if (error.length === 0) {
        navigateTo('/')
    }
    else {
        console.log("ERROR:", error)
        responseMessage.value = error[5].data.message
    }

    loading.value = false

}


</script>

<style scoped></style>~/stores/auth