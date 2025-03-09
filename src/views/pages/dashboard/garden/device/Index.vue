<template>
    <Title title="Devices" @add="showAdd()" @refresh="refresh()" />
    <Dialog header="Dialog" v-model:visible="form.add.dialog" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <p class="leading-normal m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <template #footer>
            <Button label="Save" @click="closeAdd()" />
        </template>
    </Dialog>
    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Device1</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ipsum in lorem tempus porttitor.</p>
                    <div class="card-actions justify-end">
                        <Button label="View" icon="pi pi-search" class="p-button-rounded p-button-outlined" @click="router.push({ name: 'garden.device.module', params: { garden: 'garden1', device: 'device1' } })" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Device1</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ipsum in lorem tempus porttitor.</p>
                    <div class="card-actions justify-end">
                        <Button label="View" icon="pi pi-search" class="p-button-rounded p-button-outlined" @click="router.push({ name: 'garden.device.module', params: { garden: 'garden1', device: 'device1' } })" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Title from '@/components/dashboard/Title.vue';
import { Skeleton } from 'primevue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive({
    add: {
        dialog: false
    }
});

const loading = ref(true);

const garden = ref({});

const devices = ref([]);

function getGarden(id) {
    return {
        id: id,
        name: 'Garden 1'
    };
}

function getDevices() {
    return [
        {
            id: 1,
            name: 'Device 1'
        },
        {
            id: 2,
            name: 'Device 2'
        },
        {
            id: 3,
            name: 'Device 3'
        }
    ];
}

function showAdd() {
    form.add.dialog = true;
}

function closeAdd() {
    form.add.dialog = false;
}

function refresh() {
    console.log('refresh');
}

onMounted(() => {
    setTimeout(() => {
        garden.value = getGarden(router.currentRoute.value.params.garden);

        devices.value = getDevices();

        loading.value = false;
    }, 1000);
});
</script>
