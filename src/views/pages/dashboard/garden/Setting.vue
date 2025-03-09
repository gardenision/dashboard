<template>
    <Skeleton v-if="loading" height="50vh" />
    <div v-else className="card">
        <div class="font-semibold text-xl mb-4">Garden Setting</div>
        <p>Page ini untuk setting garden.</p>
        <p>Data yang bisa disimpan di sini adalah name dan description garden.</p>
    </div>
</template>

<script setup>
import { Skeleton } from 'primevue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(true);

const garden = ref({});

function getGarden(id) {
    return {
        id: id,
        name: 'Garden 1'
    };
}

onMounted(() => {
    setTimeout(() => {
        garden.value = getGarden(router.currentRoute.value.params.garden);

        loading.value = false;
    }, 1000);
});
</script>
