<template>
    <Title title="Projects" @add="showAdd()" @refresh="refresh()" />
    <Dialog header="Add Projects" v-model:visible="form.add.dialog" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <div class="flex flex-col gap-2">
            <label for="name">Name</label>
            <input pInputText id="name" v-model="name" type="text" placeholder="Project's Name" class="p-2 border border-gray-300 rounded" />
        </div>
        <template #footer>
            <Button label="Save" @click="saveProject" />
        </template>
    </Dialog>
    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
    <div
        v-for="(project, index) in projects"
        :key="project.id || index"
        class="col-span-12 lg:col-span-6 xl:col-span-3"
    >
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description || 'No description available.' }}</p>
            <div class="card-actions justify-end">
            <Button
                label="View"
                icon="pi pi-search"
                class="p-button-rounded p-button-outlined"
                @click="router.push({
                    name: 'project.type', // Pastikan nama rute sesuai
                    params: {
                        project: project.id // Ganti dengan ID proyek yang sesuai
                    }
                })"
            />
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
import axios from 'axios';

const router = useRouter();
const form = reactive({
    add: {
        dialog: false
    }
});

const loading = ref(true);

const projects = ref([]);

const name = ref("")
watch(name, async(newfal, oldval)=>{
    console.log('oldval', oldval, 'newval', newval)
})

// function getProjects() {
//     return [
//         {
//             id: 1,
//             name: 'Project 1'
//         },
//     ];
// }

async function getProjects() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/projects', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        projects.value = response.data; // asumsi API return array langsung
    } catch (error) {
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

// function saveProject(){
//     const newProject = {
//         name: name.value,
//     };
//     console.log('data dikirim: ', newProject);
//     projects.value.push(newProject);
//     closeAdd();
// }

async function saveProject() {
    const newProject = {
        name: name.value,
    };

    const token = localStorage.getItem('token');

    try {
        const response = await axios.post('/api/projects', newProject,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Berhasil kirim:', response.data);

        // Optional: tambahkan ke list project lokal
        projects.value.push(response.data);

        closeAdd();
    } catch (error) {
        console.error('Gagal kirim:', error.response ? error.response.data : error.message);
        alert('Gagal menyimpan project. Cek console untuk detail.');
    }
}

// onMounted(() => {
//     setTimeout(() => {
//         projects.value = getProjects();

//         loading.value = false;
//     }, 1000);
// });

onMounted(async () => {
    await getProjects();
    loading.value = false;
});

</script>
