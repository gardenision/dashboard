<template>
    <Title title="Gardens" @add="showAdd()" @refresh="refresh()" />
    <Dialog header="Add Device-Type" v-model:visible="form.add.dialog" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <div class="flex flex-col gap-2">
            <label for="name">Name</label>
            <input pInputText id="name" v-model="name" type="text" placeholder="Device's Name" class="p-2 border border-gray-300 rounded" />
            <label for="serial_number">Serial Number</label>
            <input pInputText id="serial_number" v-model="serial_number" type="text" placeholder="Device's Name" class="p-2 border border-gray-300 rounded" />
        </div>
        <template #footer>
            <Button label="Save" @click="saveDevice" />
        </template>
    </Dialog>
    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
        <div 
        v-for="(device, index) in devices"
        :key="device.id || index"
        class="col-span-12 lg:col-span-6 xl:col-span-3"
        >
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ device.name }}</h5>
                    <p class="card-text">{{ device.name }}</p>
                    <p class="card-text">{{ device.serial_number }}</p>
                    <!-- <div class="card-actions justify-end">
                        <Button label="View" icon="pi pi-search" class="p-button-rounded p-button-outlined" @click="router.push({ name: 'garden.device', params: { garden: 'garden1' } })" />
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Title from '@/components/dashboard/Title.vue';
import { Skeleton } from 'primevue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const form = reactive({
    add: {
        dialog: false
    }
});

const loading = ref(true);

const devices = ref([]);
const name = ref("")
const serial_number = ref("")

// async function getDevice() {
//     try{
//         const projectId = route.params.project;
//         const typeId = route.params.type;
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`https://api.gardenision.com/api/projects/${projectId}/device-types/${typeId}/devices`,{
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         devices.value = response.data;
//     } catch(error){
//         console.error('Gagal mengambil data device:', error.response ? error.response.data : error.message);
//         alert('Gagal mengambil data device. Cek console untuk detail.');
//     }
// }

async function getDevice() {
    try {
        console.log('Fetching devices...');
        const projectId = route.params.project;
        const typeId = route.params.type;
        const token = localStorage.getItem('token');

        console.log(`Requesting devices for project: ${projectId}, type: ${typeId} with token: ${token}`);

        const response = await axios.get(`/api/projects/${projectId}/device-types/${typeId}/devices`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Response:', response.data);
        devices.value = response.data;

    } catch (error) {
        console.error('Error fetching devices:', error.response ? error.response.data : error.message);
        alert('Failed to fetch data. Check console for details.');
    }
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

async function saveDevice(){
    const newDevice = {
        name: name.value,
        serial_number: serial_number.value
    }

    const token = localStorage.getItem('token');

    try {
        const projectId = route.params.project;
        const typeId = route.params.type;
        const response = await axios.post(`/api/projects/${projectId}/device-types/${typeId}/devices`, newDevice,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Berhasil kirim:', response.data);

        // Optional: tambahkan ke list project lokal
        devices.value.push(response.data);

        closeAdd();
    } catch (error) {
        console.error('Gagal kirim:', error.response ? error.response.data : error.message);
        alert('Gagal menyimpan project. Cek console untuk detail.');
    }
}

onMounted(async () => {
    await getDevice();

    loading.value = false;
});

watch(() => route.params.project, async (newProjectId) => {
    loading.value = true; // Tampilkan loading saat mengambil data
    await getDevice(); // Ambil data device types untuk proyek baru
    loading.value = false; // Sembunyikan loading setelah data diambil
});
watch(() => route.params.type, async (newProjectId) => {
    loading.value = true; // Tampilkan loading saat mengambil data
    await getDevice(); // Ambil data device types untuk proyek baru
    loading.value = false; // Sembunyikan loading setelah data diambil
});
</script>
