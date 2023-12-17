<template>
    <div class="container mt-24">
        <div class="grid grid-cols-12">
            <div class="col-span-7 mx-8">
                <div>
                    Shopping Cart
                </div>
                <div>
                    <v-table>
                        <thead>
                            <tr>
                                <th class=" max-w-[40px]">

                                </th>
                                <th class="text-left">
                                    Product(s)
                                </th>
                                <th class="text-left">
                                    Price
                                </th>
                                <th class="text-left">
                                    Quanitity
                                </th>
                                <th class="text-left">
                                    Sub-total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in orderItems" :key="item.id">
                                <td><img :src="`http://localhost:5005${item.product.images[0]}`"
                                        class="w-[60%] aspect-[3/2] object-contain p-6" /> </td>
                                <td>{{ item.product.title }}</td>
                                <td>{{ item.product.price }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.totalPrice }}</td>
                            </tr>


                        </tbody>
                    </v-table>
                </div>
            </div>
            <div class="col-span-5 mx-12">
                <div>
                    Cart Sub Total
                </div>
                <div>
                    <v-table>
                        <tbody>
                            <tr>
                                <td>
                                    Subtotal
                                </td>
                                <td>
                                    172000
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Shipping
                                </td>
                                <td>
                                    <div>Free Shipping: No</div>
                                    <div>Shipping Charges: 200</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Total
                                </td>
                                <td>
                                    1720200
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ApiService from '~/services/ApiService';

interface OrderItems {
    id: number,
    quantity: number,
    totalPrice: number,
    product: {
        id: number,
        title: string,
        images: string[],
        price: number,
        quantity: number
    }
}


const url = "http://localhost:5005/api/"

const orderItems = ref<OrderItems[]>([])

const userId = 2

const getUserCart = async () => {
    const res = await ApiService.get(`${url}order-item/userId/${userId}`)
    orderItems.value = res.data?.data
    console.log("Cart:", orderItems.value)
}

onMounted(() => {
    getUserCart()
})

</script>

<style scoped></style>