<template>
    <Title title="Gardens" @add="showAdd()" @refresh="refresh()" />
    <Dialog header="Add Gardens" v-model:visible="form.add.dialog" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <div class="flex flex-col gap-2">
            <label for="name">Name</label>
            <input pInputText id="name" v-model="name" type="text" placeholder="Garden's Name" class="p-2 border border-gray-300 rounded" />
            <label>Location</label>
            <Button label="Generate Lokasi" icon="pi pi-compass" class="p-button-sm w-fit my-2" @click="generateLocation" />
            <div id="map" class="h-60 rounded border border-gray-300"></div>
        </div>
        <template #footer>
            <Button label="Save" @click="saveGarden" />
        </template>
    </Dialog>

    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
        <div 
        v-for="(garden, index) in gardens"
        :key="garden.id || index"
        class="col-span-12 lg:col-span-6 xl:col-span-3"
        >
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ garden.name }}</h5>
                    <p class="card-text">Lokasi:  
                        <span>{{ garden.latitude && garden.longitude ? `${garden.latitude}, ${garden.longitude}` : 'unknown' }}</span>
                    </p>
                    <div class="card-actions justify-end">
                        <Button 
                            label="Details" icon="pi pi-search" class="p-button-rounded p-button-outlined mr-1" @click="router.push({ name: 'garden.device', params: { garden: garden.id } })" 
                        />
                        <Button label="View on Map" icon="pi pi-map-marker" class="p-button-rounded p-button-outlined" @click="router.push({ name: 'garden.device', params: { location: 'location1' } })" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Title from '@/components/dashboard/Title.vue';
import { Skeleton } from 'primevue';
import { onMounted, reactive, ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import * as L from 'leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import '/node_modules/leaflet/dist/leaflet.css';
import axios from 'axios';

const router = useRouter();

const form = reactive({
    add: {
        dialog: false
    }
});

const loading = ref(true);
const gardens = ref([]);

// Input nama dan lokasi
const name = ref("");
const location = reactive({
    lat: null,
    lng: null
});

let map = null;
let marker = null;

function initMap() {
    if (map) {
        map.remove();
        map = null;
    }

    map = L.map('map').setView([location.lat, location.lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    marker = L.marker([location.lat, location.lng], { draggable: true }).addTo(map);

    marker.on('dragend', function () {
        const pos = marker.getLatLng();
        location.lat = pos.lat;
        location.lng = pos.lng;
    });

    // Tambah search control
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'bar',
        showMarker: false,
        retainZoomLevel: false,
        autoClose: true,
        searchLabel: 'Search location...'
    });

    map.addControl(searchControl);

    // Saat hasil pencarian dipilih
    map.on('geosearch/showlocation', (result) => {
        const { x: lng, y: lat } = result.location;
        location.lat = lat;
        location.lng = lng;

        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng], { draggable: true }).addTo(map);
            marker.on('dragend', function () {
                const pos = marker.getLatLng();
                location.lat = pos.lat;
                location.lng = pos.lng;
            });
        }

        map.setView([lat, lng], 16);
    });
}

function generateLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            location.lat = position.coords.latitude;
            location.lng = position.coords.longitude;

            nextTick(() => {
                initMap();
            });
        },
        () => {
            alert('Unable to retrieve your location.');
        }
    );
}

async function getGardens() {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/gardens', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        gardens.value = response.data;
    }catch(error) {
        console.error('Gagal mengambil data garden:', error.response ? error.response.data : error.message);
        alert('Gagal mengambil data garden. Cek console untuk detail.');
    }
}

function showAdd() {
    form.add.dialog = true;
    name.value = '';
    location.lat = null;
    location.lng = null;

    nextTick(() => {
        if (map) {
            map.remove();
            map = null;
        }
    });
}

function closeAdd() {
    form.add.dialog = false;
}

function refresh() {
    console.log('refresh');
}

// function saveGarden() {
//     const newGarden = {
//         name: name.value,
//         lat: location.lat,
//         lng: location.lng
//     };
//     console.log('data dikirim: ', newGarden);
//     gardens.value.push(newGarden);
//     closeAdd();
// }

async function saveGarden() {
    const newGarden = {
        name: name.value,
            location: `${location.lat}, ${location.lng}`,
            latitude: location.lat,   // Make sure these values are mapped correctly
            longitude: location.lng,
    };

    const token = localStorage.getItem('token');

    try {
        const response = await axios.post('/api/gardens', newGarden,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Berhasil kirim:', response.data);

        // Optional: tambahkan ke list garden lokal
        gardens.value.push(response.data);

        closeAdd();
    } catch (error) {
        console.error('Gagal kirim:', error.response ? error.response.data : error.message);
        alert('Gagal menyimpan garden. Cek console untuk detail.');
    }
}


onMounted( async() => {
    await getGardens();
    loading.value = false;
});
</script>

<style scoped>
#map {
    width: 100%;
}

.leaflet-control-geosearch {
    margin-top: 10px;
    z-index: 1000;
}
</style>