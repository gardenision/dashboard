<template>
    <Title title="Devices" @add="showAdd()" @refresh="refresh()" />
    <Dialog header="Add Devices" v-model:visible="form.add.dialog" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <div class="flex flex-col gap-2">
            <label for="username">Name</label>
            <input pInputText id="name" v-model="name" type="text" placeholder="Device's Name" class="p-2 border border-gray-300 rounded" />
            <label for="serialNumber">Serial Number</label>
            <input pInputText id="serialNumber" v-model="name" type="number" placeholder="Serial Number" class="p-2 border border-gray-300 rounded" />
        </div>

        <template #footer>
            <Button label="Save" @click="closeAdd()" />
        </template>
    </Dialog>
    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Jamur Tiram</h5>
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
                    <h5 class="card-title">Selada</h5>
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
import { onMounted, reactive, ref, watch } from 'vue';
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

const name = ("")
watch(name, async(newfal, oldval)=>{
    console.log('oldval', oldval, 'newval', newval)
})

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
