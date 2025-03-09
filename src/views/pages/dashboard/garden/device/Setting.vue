<template>
    <Skeleton v-if="loading" height="50vh" />
    <div v-else className="card">
        <div class="font-semibold text-xl mb-4">Device Setting</div>
        <p>Page ini untuk setting device.</p>
        <p>Data yang bisa disimpan di sini adalah name, description, dan status device.</p>
    </div>
</template>

<script setup>
import { Skeleton } from 'primevue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(true);

const garden = ref({});
const device = ref({});

function getGarden(id) {
    return {
        id: id,
        name: 'Garden 1'
    };
}

function getDevice(id) {
    return {
        id: id,
        name: 'Device 1'
    };
}

onMounted(() => {
    setTimeout(() => {
        garden.value = getGarden(router.currentRoute.value.params.garden);
        device.value = getDevice(router.currentRoute.value.params.device);

        loading.value = false;
    }, 1000);
});
</script>
