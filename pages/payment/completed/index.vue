<template>
    <div class="min-h-screen">
        <h1 class="text-4xl m-5">Payment Completed Successfully!</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ApiService from '~/services/ApiService';
import { baseUrl } from '~/helper/constants';

const id = ref('')

const result = ref('success')
const paymentId = ref(10)

const handleStatus = async (id: string) => {
    const res = await ApiService.get(`${baseUrl}payment-detail/redirect?sid=${id}&result=${result.value}&paymentId=${paymentId.value}`)
    console.log("Response:", res.data)
}

onMounted(() => {
    if (process.client) {
        id.value = window.localStorage.getItem('stripeId')
    }

    handleStatus(id.value)

})
</script>

<style scoped></style>