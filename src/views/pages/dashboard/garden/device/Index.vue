<template>
    <Title title="Devices" @add="showAdd()" @refresh="refresh()" />
    <Dialog header="Add Devices" v-model:visible="form.add.dialog" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <div class="flex flex-col gap-2">
            <label for="serial_number">Serial Number</label>
            <input pInputText id="serial_number" v-model="serial_number" type="text" placeholder="Serial Number" class="p-2 border border-gray-300 rounded" />
        </div>

        <template #footer>
            <Button label="Save" @click="saveDevice" />
        </template>
    </Dialog>
    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
        <div 
            v-for="(device, index) in devices_gardens"
            :key="device.id || index"
            class="col-span-12 lg:col-span-6 xl:col-span-3"
        >
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ device.name }}</h5>
                    <p class="card-text">{{ device.serial_number }}</p>
                    <div class="card-actions justify-end">
                        <Button label="View" icon="pi pi-search" class="p-button-rounded p-button-outlined" @click="router.push({ name: 'garden.device.module', params: { device: device.id } })" />
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
import { useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const form = reactive({
    add: {
        dialog: false
    }
});

const loading = ref(true);

const devices_gardens = ref([]);
const serial_number = ref("");

async function getDevices(id) {
    try{
        const gardenId = route.params.garden;
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/gardens/${gardenId}/devices`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        devices_gardens.value = response.data.devices;
    } catch(error){
        console.error('Gagal mengambil data devices:', error.response ? error.response.data : error.message);
        alert('Gagal mengambil data devices. Cek console untuk detail.');
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
        serial_number: serial_number.value
    }

    const token = localStorage.getItem('token');

    try {
        const gardenId = route.params.garden; // asumsi route-nya /gardens/:garden
        const response = await axios.post(`/api/gardens/${gardenId}/devices`, newDevice,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Berhasil kirim:', response.data);

        // Optional: tambahkan ke list garden lokal
        devices_gardens.value.push(response.data);

        closeAdd();
    } catch (error) {
        console.error('Gagal kirim:', error.response ? error.response.data : error.message);
        alert('Gagal menyimpan device. Cek console untuk detail.');
    }

}
onMounted(async () => {
    await getDevices();
    loading.value = false;
});

watch(() => route.params.garden, async (newGardentId) => {
    loading.value = true; // Tampilkan loading saat mengambil data
    await getDevices(); // Ambil data device types untuk proyek baru
    loading.value = false; // Sembunyikan loading setelah data diambil
});
</script>
