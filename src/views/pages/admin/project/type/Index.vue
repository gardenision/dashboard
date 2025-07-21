<template>
    <Title title="Device-Types Project" @add="showAdd()" @refresh="refresh()" />
    <Dialog header="Add Device-Type" v-model:visible="form.add.dialog" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <div class="flex flex-col gap-2">
            <label for="name">Name</label>
            <input pInputText id="name" v-model="name" type="text" placeholder="Type's Name" class="p-2 border border-gray-300 rounded" />
        </div>
        <template #footer>
            <Button label="Save" @click="saveDeviceType" />
        </template>
    </Dialog>
    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
        <div 
        v-for="(type, index) in device_types"
        :key="type.id || index"
        class="col-span-12 lg:col-span-6 xl:col-span-3"
        >
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ type.name }}</h5>
                    <!-- <p class="card-text">{{ type.description || 'No description available.' }}</p> -->
                    <!-- <div class="card-actions justify-end">
                        <Button label="View" icon="pi pi-search" class="p-button-rounded p-button-outlined" @click="router.push({ name: 'garden.device', params: { garden: 'garden1' } })" />
                    </div> -->
                    <Button
                    label="Device"
                    icon="pi pi-search"
                    class="p-button-rounded p-button-outlined"
                    @click="router.push({
                        name: 'project.type.device', // Pastikan nama rute sesuai
                        params: {
                            type: type.id // Ganti dengan ID proyek yang sesuai
                        }
                    })"
                    />
                    <Button
                    label="Module"
                    icon="pi pi-search"
                    class="p-button-rounded p-button-outlined"
                    @click="router.push({
                        name: 'project.type.module', // Pastikan nama rute sesuai
                        params: {
                            type: type.id // Ganti dengan ID proyek yang sesuai
                        }
                    })"
                    />
                </div>
            </div>
        </div>
        <!-- <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Garden1</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ipsum in lorem tempus porttitor.</p>
                    <div class="card-actions justify-end">
                        <Button label="View" icon="pi pi-search" class="p-button-rounded p-button-outlined" @click="router.push({ name: 'garden.device', params: { garden: 'garden1' } })" />
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import Title from '@/components/dashboard/Title.vue';
import { Skeleton } from 'primevue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter, useRoute  } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const form = reactive({
    add: {
        dialog: false
    }
});

const loading = ref(true);

const device_types = ref([]);
const name = ref("")

async function getDevicetypes() {
    try{
        const projectId = route.params.project;
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/projects/${projectId}/device-types`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        device_types.value = response.data;
    } catch(error){
        console.error('Gagal mengambil data project:', error.response ? error.response.data : error.message);
        alert('Gagal mengambil data project. Cek console untuk detail.');
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

async function saveDeviceType(){
    const newDeviceType = {
        name: name.value
    }

    const token = localStorage.getItem('token');

    try {
        const projectId = route.params.project; // asumsi route-nya /projects/:project
        const response = await axios.post(`/api/projects/${projectId}/device-types`, newDeviceType,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Berhasil kirim:', response.data);

        // Optional: tambahkan ke list project lokal
        device_types.value.push(response.data);

        closeAdd();
    } catch (error) {
        console.error('Gagal kirim:', error.response ? error.response.data : error.message);
        alert('Gagal menyimpan project. Cek console untuk detail.');
    }
}

onMounted(async () => {
    await getDevicetypes();
    loading.value = false;
});

watch(() => route.params.project, async (newProjectId) => {
    loading.value = true; // Tampilkan loading saat mengambil data
    await getDevicetypes(); // Ambil data device types untuk proyek baru
    loading.value = false; // Sembunyikan loading setelah data diambil
});
</script>
