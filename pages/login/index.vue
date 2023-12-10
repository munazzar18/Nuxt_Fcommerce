
<template>
    <div class="mt-32 w-full">
        <div class="flex justify-center ">
            <div class="flex bg-[#D19673] shadow-xl rounded-l-xl w-96">
                <img class="w-full aspect-[3/2] object-contain p-1" src="/ecommerce.png" />
            </div>
            <div class="shadow-xl p-16 rounded-r-xl">
                <h1 class="text-2xl  font-bold text-black">Welcome to Fcommerce</h1>
                <h2 class="text-xl mb-3 text-black font-medium">Created & Designed by Munazzar</h2>
                <p class="text-red-500 font-semibold mb-1">{{ responseMessage }}</p>
                <v-sheet class="bg-transparent" rounded>
                    <v-form @submit.prevent="onSubmit">
                        <v-text-field v-model="email" :readonly="loading" variant="outlined" class="mb-2 text-black"
                            clearable label="Email"></v-text-field>

                        <v-text-field v-model="password" variant="outlined" class="text-black" :readonly="loading" clearable
                            label="Password" type="password" placeholder="Enter your password"></v-text-field>

                        <br>

                        <v-btn :loading="loading" block color="transparent" class="text-black" size="large" type="submit"
                            variant="elevated">
                            Sign In
                        </v-btn>
                    </v-form>
                </v-sheet>
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
        responseMessage.value = error[5].data.message
    }

    loading.value = false

}


</script>

<style scoped></style>~/stores/auth