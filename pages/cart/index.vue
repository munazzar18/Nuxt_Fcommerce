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
                            <tr v-for="c in cart" :key="c.id" >
                                <td><img :src="`http://localhost:5005${c.product.images[0]}`" class="w-[50%] aspect-[3/2] object-contain p-6" /> </td>
                                <td>{{ c.product.title }}</td>
                                <td>{{ c.product.price }}</td>
                                <td>{{ c.quantity }}</td>
                                <td>{{ c.product.price * c.quantity }}</td>
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


const url = "http://localhost:5005/api/"

const cart = ref([])

const product = ref([])

const userId = 2

const getUserCart = async () => {
    const res = await ApiService.get(`${url}cart/userCart/${userId}`)
    cart.value = res.data?.data
    console.log("Cart:", cart.value)
}

onMounted(() => {
    getUserCart()
})

</script>

<style scoped></style>