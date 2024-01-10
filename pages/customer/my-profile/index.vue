<template>
    <div class="min-h-screen mx-40 overflow-visible">
        <h1 class="text-2xl font-bold mt-4">My Profile</h1>
        <div class="flex justify-center mt-4">
            <div role="tablist" class="tabs tabs-bordered">
                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="My Profile" />
                <div role="tabpanel" class="tab-content p-10">My Profile</div>

                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="My Orders" checked />
                <div role="tabpanel" class="tab-content p-10">My Orders</div>

                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Account Settings" />
                <div role="tabpanel" class="tab-content p-10">Account Settings</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>