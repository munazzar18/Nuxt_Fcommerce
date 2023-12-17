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
                                <th class="text-left">

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
                            <tr>
                                <td>Image here</td>
                                <td>Product 1</td>
                                <td>25000</td>
                                <td>2</td>
                                <td>50000</td>
                            </tr>
                            <tr>
                                <td>Image here</td>
                                <td>Product 2</td>
                                <td>62000</td>
                                <td>2</td>
                                <td>122000</td>
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

</script>

<style scoped></style>