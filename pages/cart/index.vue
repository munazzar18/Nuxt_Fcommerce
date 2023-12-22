<template>
    <div class="min-h-screen mt-12">
        <div class="flex justify-center">
            <div class=" mx-2 bg-gradient-to-r from-green-200 via-green-300 to-blue-500 p-6 rounded-box">
                <div class="font-bold text-xl mb-3">
                    Shopping Cart
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
                                    <th>Quantity</th>
                                    <th>Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr v-for="item in orderItems" :key="item.id">
                                    <td><input type="checkbox" @change="toggleCheck(item.id)" :checked="isChecked[item.id]"
                                            @click="selectedItems(item.id, item.quantity)" class="checkbox" /></td>
                                    <td><img :src="`http://localhost:5005${item.product.images[0]}`"
                                            :alt="item.product.title"
                                            class="w-[60%] aspect-[3/2] object-contain mix-blend-darken" /></td>
                                    <td>{{ item.product.title }}</td>
                                    <td>Rs.{{ item.product.price }}</td>
                                    <td class="text-center">
                                        <div class="flex items-center">
                                            <div v-if="item.quantity !== 1">
                                                <button class="btn btn-sm btn-circle mr-2" min="1"
                                                    @click="removeItemFromCart(item.product.id)">
                                                    <font-awesome-icon icon="fa-solid fa-minus" />
                                                </button>
                                            </div>
                                            <div v-else>
                                                <button class="btn btn-sm btn-circle mr-2" min="1"
                                                    @click="removeItemFromCart(item.product.id)">
                                                    <font-awesome-icon icon="fa-solid fa-trash" />
                                                </button>
                                            </div>

                                            <input type="text" class="w-12 text-center border rounded-md px-2 py-1" min="1"
                                                v-model="item.quantity" readonly />
                                            <button class="btn btn-sm btn-circle ml-2"
                                                @click="addItemToCart(item.product.id)"
                                                :disabled="item.quantity === item.product.quantity">
                                                <font-awesome-icon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                    </td>
                                    <td>Rs.{{ item.totalPrice }}/-</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="font-extrabold text-md">Total</td>
                                    <td></td>
                                    <td></td>
                                    <td class="font-extrabold text-md">Rs.{{ grandTotal }}/-</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-end mt-24 px-4">
                            <button @click="checkOut" :disabled="!isAnyChecked"
                                class="btn bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white">Proceed
                                To Checkout</button>
                        </div>
                    </div>
                </div>
            </div>

            <div role="alert" class="toast" v-if="alertMessage">
                <div class="alert bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white">
                    <span>{{ alertMessage }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ApiService from '~/services/ApiService';
import UserService from '~/services/UserService';
const cart = useCartStore()

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

interface SelectedItem {
    orderItems: number;
    quantities: number;
}

const userId = ref()

const url = "http://localhost:5005/api/"


const orderItems = ref<OrderItems[]>([])

const alertMessage = ref('')

const id = UserService.getUser()
userId.value = id?.id

const oneTotal = ref()
const grandTotal = ref()

const getUserCart = async () => {
    const res = await ApiService.get(`${url}order-item/userId/${userId.value}`)
    orderItems.value = res.data?.data
    oneTotal.value = orderItems.value.map((el) => el.totalPrice)
    grandTotal.value = oneTotal.value.reduce((pv: number, cv: number) => pv + cv)
}


const dismissAlert = () => {
    setTimeout(() => {
        alertMessage.value = '';
    }, 3000);
};

const addItemToCart = async (productId: string | number) => {
    const formData: any = {
        productId: productId,
        quantity: 1
    };
    try {
        await cart.addToCart(formData);
        alertMessage.value = cart.msg
        await getUserCart();
        dismissAlert()
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};

const removeItemFromCart = async (productId: string | number) => {
    const formData: any = {
        productId: productId,
        quantity: 1
    }

    try {
        await cart.removeFromCart(formData)
        alertMessage.value = cart.msg
        await getUserCart()
        dismissAlert()
    } catch (error) {
        console.error('Error removing item to cart:', error);
    }
}

const isChecked = ref<Record<number, boolean>>({});



const toggleCheck = (id: number) => {
    isChecked.value[id] = !isChecked.value[id];
}

const isAnyChecked = computed(() => {
    return Object.values(isChecked.value).some((value) => value === true);
});

const selectedProducts = ref<SelectedItem[]>([])

const selectedItems = (itemIds: number, itemQuantity: number) => {

    const index = selectedProducts.value.findIndex((item) => item.orderItems === itemIds);

    if (index !== -1) {
        // Item already exists, remove it (deselect)
        selectedProducts.value.splice(index, 1);
    } else {
        // Item doesn't exist, add it (select)
        selectedProducts.value.push({
            orderItems: itemIds,
            quantities: itemQuantity
        });
    }
}

const checkOut = async () => {
    const data: { orderItemIds: number[]; quantities: number[] } = {
        orderItemIds: [],
        quantities: []
    };

    selectedProducts.value.forEach(item => {
        data.orderItemIds.push(item.orderItems);
        data.quantities.push(item.quantities);
    });
    console.log("Form Data:", data);
}

onMounted(() => {

    getUserCart()
})

</script>

<style scoped></style>