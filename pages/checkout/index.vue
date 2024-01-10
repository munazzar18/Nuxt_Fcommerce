<template>
    <div class="min-h-screen mt-12">
        <div class="flex justify-center">
            <div class=" mx-2 bg-[#5bccf6] p-6 rounded-box">

                <div>
                    <div class="font-bold text-xl mb-3">
                        Check Out
                    </div>
                    <div>
                        <div class=" overflow-x-auto font-bold">
                            <table class="table">
                                <!-- head -->
                                <thead>
                                    <tr class="font-bold">
                                        <th></th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Payment Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- row 1 -->
                                    <tr>
                                        <td><img :src="baseUrl.slice(0, -5) + orders?.orderItems[0].product.images[0]"
                                                alt="item.product.title" class="w-[60%] aspect-[3/2] object-contain" />
                                        </td>
                                        <td>
                                            {{ orders?.orderItems[0].product.title }}
                                        </td>
                                        <td>{{ orders?.total }}</td>
                                        <td>{{ orders?.payment_detail.status }}</td>
                                        <td class="text-center">
                                            {{ orders?.payment_detail.provider }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="flex justify-end mt-24 px-4">
                                <button @click="handlePayNow(orders.id)"
                                    class="btn bg-[#030e12] border-0 hover:bg-[#fcde67] hover:text-[#030e12] text-[#5bccf6]">Pay
                                    Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div role="alert" class="toast" v-if="alertMessage">
                <div class="alert bg-[#5bccf6] text-[#030e12]">
                    <span>{{ alertMessage }}</span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { baseUrl } from '~/helper/constants';
import ApiService from '~/services/ApiService';
import UserService from '~/services/UserService';
import type { Orders } from '~/helper/interface';


const orders = ref<Orders>()

const getUser = UserService?.getUser()

const userId = ref()

userId.value = getUser?.id

const getMyOrders = async () => {
    const res = await ApiService.get(`${baseUrl}order/userId/${userId.value}`)
    orders.value = res.data.data
}

const handlePayNow = async (orderId: number) => {
    const res = await ApiService.get(`${baseUrl}payment-detail/session/${orderId}`)
    if (process.client) {
        window.location.href = res.data.data
    }
}

onMounted(() => {
    getMyOrders()
})

</script>

<style scoped></style>