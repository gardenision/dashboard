<!-- <template>
    <Title title="Gardens" @add="showAdd()" @refresh="refresh()" />
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
                    <h5 class="card-title">Garden1</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ipsum in lorem tempus porttitor.</p>
                    <div class="card-actions justify-end">
                        <Button label="View" icon="pi pi-search" class="p-button-rounded p-button-outlined" @click="router.push({ name: 'garden.device', params: { garden: 'garden1' } })" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Garden1</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ipsum in lorem tempus porttitor.</p>
                    <div class="card-actions justify-end">
                        <Button label="View" icon="pi pi-search" class="p-button-rounded p-button-outlined" @click="router.push({ name: 'garden.device', params: { garden: 'garden1' } })" />
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

const gardens = ref([]);

function getGardens() {
    return [
        {
            id: 1,
            name: 'Garden 1'
        },
        {
            id: 2,
            name: 'Garden 2'
        },
        {
            id: 3,
            name: 'Garden 3'
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
        gardens.value = getGardens();

        loading.value = false;
    }, 1000);
});
</script> -->

<template>
    <Title title="Gardens" @add="showAdd()" @refresh="refresh()" />
    <Dialog header="Add Module" v-model:visible="form.add.dialog" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <div class="flex flex-col gap-2">
            <label for="name">Name</label>
            <input pInputText id="name" v-model="name" type="text" placeholder="Module's Name" class="p-2 border border-gray-300 rounded" />
            <label for="type">Type</label>
            <input pInputText id="type" v-model="type" type="text" placeholder="ex: sensor" class="p-2 border border-gray-300 rounded" />
            <label for="default_unit_type">Default Unit Type</label>
            <input pInputText id="default_unit_type" v-model="default_unit_type" type="text" placeholder="ex: %" class="p-2 border border-gray-300 rounded" />
            <label for="default_unit_value">Type</label>
            <input pInputText id="default_unit_value" v-model="default_unit_value" type="number" placeholder="ex: 0" class="p-2 border border-gray-300 rounded" />
        </div>
        <template #footer>
            <Button label="Save" @click="saveModule" />
        </template>
    </Dialog>
    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
        <div 
        v-for="(modul, index) in modules"
        :key="modul.id || index"
        class="col-span-12 lg:col-span-6 xl:col-span-3"
        >
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ modul.name }}</h5>
                    <p class="card-text">{{ modul.name }}</p>
                    <p class="card-text">{{ modul.type }}</p>
                    <p class="card-text">{{ modul.default_unit_type }}</p>
                    <p class="card-text">{{ modul.default_unit_value }}</p>
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

const modules = ref([]);
const name = ref("")
const type = ref("")
const default_unit_type = ref("")
const default_unit_value = ref("")

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

async function getModule() {
    try {
        console.log('Fetching modules...');
        const projectId = route.params.project;
        const typeId = route.params.type;
        const token = localStorage.getItem('token');

        console.log(`Requesting modules for project: ${projectId}, type: ${typeId} with token: ${token}`);

        const response = await axios.get(`/api/projects/${projectId}/device-types/${typeId}/modules`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Response:', response.data);
        modules.value = response.data;

    } catch (error) {
        console.error('Error fetching modules:', error.response ? error.response.data : error.message);
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

async function saveModule(){
    const newModule = {
        name: name.value,
        type: type.value,
        default_unit_type: default_unit_type.value,
        default_unit_value: default_unit_value.value
    }

    const token = localStorage.getItem('token');

    try {
        const projectId = route.params.project;
        const typeId = route.params.type;
        const response = await axios.post(`/api/projects/${projectId}/device-types/${typeId}/devices`, newModule,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Berhasil kirim:', response.data);

        // Optional: tambahkan ke list project lokal
        modules.value.push(response.data);

        closeAdd();
    } catch (error) {
        console.error('Gagal kirim:', error.response ? error.response.data : error.message);
        alert('Gagal menyimpan project. Cek console untuk detail.');
    }
}

onMounted(async () => {
    await getModule();
    loading.value = false;
});

watch(() => route.params.project, async (newModule) => {
    loading.value = true;
    await getModule(); 
    loading.value = false; 
});
watch(() => route.params.type, async (newModule) => {
    loading.value = true; 
    await getModule(); 
    loading.value = false; 
});
</script>

