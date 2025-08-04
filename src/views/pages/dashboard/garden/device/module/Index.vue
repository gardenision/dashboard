<template>
    <Title title="Modules" @refresh="onRefresh()" />
    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
        <div class="col-span-12 grid grid-cols-12 gap-8">
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Suhu</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ temperature }} &#8451;</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <!-- <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i> -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <title>temperature-celsius</title>
                                <path
                                    d="M16.5,5C18.05,5 19.5,5.47 20.69,6.28L19.53,9.17C18.73,8.44 17.67,8 16.5,8C14,8 12,10 12,12.5C12,15 14,17 16.5,17C17.53,17 18.47,16.66 19.23,16.08L20.37,18.93C19.24,19.61 17.92,20 16.5,20A7.5,7.5 0 0,1 9,12.5A7.5,7.5 0 0,1 16.5,5M6,3A3,3 0 0,1 9,6A3,3 0 0,1 6,9A3,3 0 0,1 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5Z"
                                    fill="#1e40af"
                                />
                            </svg>
                        </div>
                    </div>
                    <!-- <span class="text-primary font-medium">X&#8451; </span>
                    <span class="text-muted-color">since last visit</span> -->
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Kelembaban</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ humidity }}</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <!-- <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i> -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <title>water-percent</title>
                                <path
                                    d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z"
                                    fill="#1e40af"
                                />
                            </svg>
                        </div>
                    </div>
                    <!-- <span class="text-primary font-medium">X% </span>
                    <span class="text-muted-color">since last visit</span> -->
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Pompa</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ pumpStatus }}</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <!-- <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i> -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <title>water-pump</title>
                                <path
                                    d="M19,14.5C19,14.5 21,16.67 21,18A2,2 0 0,1 19,20A2,2 0 0,1 17,18C17,16.67 19,14.5 19,14.5M5,18V9A2,2 0 0,1 3,7A2,2 0 0,1 5,5V4A2,2 0 0,1 7,2H9A2,2 0 0,1 11,4V5H19A2,2 0 0,1 21,7V9L21,11A1,1 0 0,1 22,12A1,1 0 0,1 21,13H17A1,1 0 0,1 16,12A1,1 0 0,1 17,11V9H11V18H12A2,2 0 0,1 14,20V22H2V20A2,2 0 0,1 4,18H5Z"
                                    fill="#1e40af"
                                />
                            </svg>
                        </div>
                    </div>
                    <!-- <span class="text-primary font-medium">24 new </span>
                    <span class="text-muted-color">since last visit</span> -->
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Status</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ isOnline }}</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <!-- <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i> -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <title>cloud-off-outline</title>
                                <path
                                    d="M19.8 22.6L17.15 20H6.5Q4.2 20 2.6 18.4T1 14.5Q1 12.58 2.19 11.08 3.38 9.57 5.25 9.15 5.33 8.95 5.4 8.76 5.5 8.57 5.55 8.35L1.4 4.2L2.8 2.8L21.2 21.2M6.5 18H15.15L7.1 9.95Q7.05 10.23 7.03 10.5 7 10.73 7 11H6.5Q5.05 11 4.03 12.03 3 13.05 3 14.5 3 15.95 4.03 17 5.05 18 6.5 18M11.13 14M21.6 18.75L20.15 17.35Q20.58 17 20.79 16.54 21 16.08 21 15.5 21 14.45 20.27 13.73 19.55 13 18.5 13H17V11Q17 8.93 15.54 7.46 14.08 6 12 6 11.33 6 10.7 6.16 10.07 6.33 9.5 6.68L8.05 5.23Q8.93 4.63 9.91 4.31 10.9 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 16.5 22.63 17.31 22.25 18.15 21.6 18.75M14.83 12.03Z"
                                    fill="#1e40af"
                                />
                            </svg>
                        </div>
                    </div>
                    <span class="text-primary font-medium">Status On </span>
                    <span class="text-muted-color">since last visit</span>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6">
            <div class="card">
                <h5 class="card-title text-primary">Suhu</h5>
                <p class="card-text">Rata-rata suhu per hari.</p>
                <!-- <Chart type="line" :data="lineData" :options="lineOptions"></Chart> -->
                <Chart type="line" :data="lineDataTemp" :options="lineOptions" />
            </div>
            <div class="card">
                <h5 class="card-title text-primary">Kelembaban</h5>
                <p class="card-text">Rata-rata kelembaban per hari.</p>
                <!-- <Chart type="line" :data="lineData" :options="lineOptions"></Chart> -->
                <Chart type="line" :data="lineDataHumid" :options="lineOptions" />
            </div>
            <!-- <Card class="shadow-lg">
                <LineChart :data="lineData" :xField="'day'" :yFields="['temperature', 'humidity']" />
            </Card> -->
        </div>
        <div class="card col-span-12 lg:col-span-6">
            <div class="card-body">
                <h5 class="card-title text-primary">Actuators</h5>
                <div class="grid gap-8">
                    <div class="col-span-12 lg:col-span-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Mode Manual</h5>
                                <ToggleButton v-model="checked_mode" onLabel="On" offLabel="Off" class="w-full" />
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Control Nozzle</h5>
                                <ToggleButton v-model="checked" onLabel="On" offLabel="Off" class="w-full" :disabled="!checked_mode" />
                                <small v-if="!checked_mode" class="text-gray-500">Aktifkan mode manual untuk mengontrol nozzle</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import Chart from 'primevue/chart';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const sensors = ref([]);
const actuators = ref([]);

const loading = ref(true);
const checked = ref(false); // Toggle button
const checked_mode = ref(false); // Toggle button

// Menyimpan module ID dari API
// const moduleIdMode = ref(null);
const moduleIdNozzle = ref(null);

const temperatureId = ref('');
const humidityId = ref('');
const pumpId = ref('');

const temperature = ref('');
const humidity = ref('');
const pumpStatus = ref('');
const isOnline = ref('');

const lineData = ref(null);
const lineOptions = ref(null);
const lineDataTemp = ref(null);
const lineDataHumid = ref(null);

const computedPumpStatus = computed(() => {
    return checked_mode.value
        ? checked.value
            ? 'On'
            : 'Off' // Kalau manual, pakai toggle user
        : pumpStatus.value; // Kalau otomatis, pakai dari sensor
});

async function fetchModules() {
    try {
        const token = localStorage.getItem('token');
        const gardenId = route.params.garden;
        const deviceId = route.params.device;

        const res = await axios.get(`/api/gardens/${gardenId}/devices/${deviceId}/modules`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Ambil array modules dari response object
        const modules = res.data.modules;

        // Cari module yang namanya mengandung 'mode' atau 'pump'
        // const modeModule = modules.find(m => m.module?.name?.toLowerCase().includes('mode'));
        const nozzleModule = modules.find((m) => m.module?.name?.toLowerCase().includes('pump') || m.module?.name?.toLowerCase().includes('nozzle'));

        // Simpan ID module dari field "id" di level paling atas
        // moduleIdMode.value = modeModule?.id;
        moduleIdNozzle.value = nozzleModule?.id;

        // if (moduleNozzle.value.)
        // checked_mode.value =
        // cheked.value =

        // console.log('✅ moduleIdMode:', moduleIdMode.value);
        console.log('✅ moduleIdNozzle:', moduleIdNozzle.value);
    } catch (error) {
        console.error('❌ Gagal mengambil module id:', error);
    }
}

async function fetchSettings() {
    try {
        const token = localStorage.getItem('token');
        const gardenId = route.params.garden;
        const deviceId = route.params.device;
        const res = await axios.get(`/api/gardens/${gardenId}/devices/${deviceId}/settings`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(res.data);
        const data = res.data;

        for (const [id, _modules] of Object.entries(data.module)) {
            console.log('modules', _modules);
            for (const _module of _modules) {
                console.log('module', _module);
                if (_module.key == 'value') {
                    checked_mode.value = _module.active;
                    checked.value = _module.value;

                    console.log('checked_mode', checked_mode.value);
                    console.log('checked', checked.value);
                }
            }
        }
    } catch (err) {
        console.log('err fetch settings', err);
    }
}

async function fetchAnalytics() {
    try {
        const token = localStorage.getItem('token');
        const gardenId = route.params.garden;
        const deviceId = route.params.device;
        const res = await axios.get(`/api/gardens/${gardenId}/devices/${deviceId}/modules/analytics`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);
        const data = res.data;

        sensors.value = data.sensor;
        actuators.value = data.actuator;

        // const tempSensor = sensors.value.find(s => s.module_id === 1);
        // const humidSensor = sensors.value.find(s => s.module_id === 2);
        const tempSensor = sensors.value.find((s) => s.module?.name?.toLowerCase().includes('temperature'));
        const humidSensor = sensors.value.find((s) => s.module?.name?.toLowerCase().includes('humidity'));

        const pumpActuator = actuators.value.find((a) => a.module?.name?.toLowerCase().includes('pump'));

        temperatureId.value = tempSensor?.id ?? '';
        humidityId.value = humidSensor?.id ?? '';
        pumpId.value = pumpActuator?.id ?? '';
        temperature.value = tempSensor ? tempSensor.unit_value : '--';
        humidity.value = humidSensor ? humidSensor.unit_value : '--';
        pumpStatus.value = pumpActuator ? (pumpActuator.unit_value === '1' ? 'On' : 'Off') : '--';
        isOnline.value = 'Online'; // Sementara, karena tidak ada info is_online di response

        generateChartData();
        console.log('lineDataTemp:', lineDataTemp.value);
        console.log('lineDataHumid:', lineDataHumid.value);

        // Isi chart
        // generateChartData(data.history); // Misal kamu punya data history juga
    } catch (err) {
        console.error('Error fetching analytics data:', err);
    }
}

function getAverageLogValue(logs, targetDate) {
    const logsForDate = logs.filter((l) => new Date(l.created_at).toDateString() === targetDate.toDateString());
    if (!logsForDate.length) return null;
    const total = logsForDate.reduce((sum, log) => sum + parseFloat(log.context?.value || 0), 0);
    return parseFloat((total / logsForDate.length).toFixed(2));
}

function generateChartData() {
    // const tempSensor = sensors.value.find(s => s.module_id === 1);
    // const humidSensor = sensors.value.find(s => s.module_id === 2);
    const tempSensor = sensors.value.find((s) => s.module?.name?.toLowerCase().includes('temperature'));
    const humidSensor = sensors.value.find((s) => s.module?.name?.toLowerCase().includes('humidity'));

    if (!tempSensor || !humidSensor) return;

    const tempLogs = tempSensor.logs || [];
    const humidLogs = humidSensor.logs || [];

    const labels = [];
    const tempData = [];
    const humidData = [];
    const wateringPoints = [];

    // Ambil data 7 hari terakhir
    const weekdays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    const today = new Date();
    const currentDayIndex = today.getDay(); // Minggu=0, Senin=1, ..., Sabtu=6

    for (let i = 0; i < 7; i++) {
        const label = weekdays[i];
        labels.push(label);

        // Cari tanggal yang sesuai dengan label hari ini
        const date = new Date();
        const dayOffset = i - ((today.getDay() + 6) % 7); // Konversi agar Senin = 0
        date.setDate(date.getDate() + dayOffset);

        // Ambil semua log sesuai hari
        const tempLogsToday = tempLogs.filter((log) => {
            return new Date(log.created_at).toDateString() === date.toDateString();
        });
        const humidLogsToday = humidLogs.filter((log) => {
            return new Date(log.created_at).toDateString() === date.toDateString();
        });

        // Hitung rata-rata
        const avgTemp = tempLogsToday.length ? tempLogsToday.reduce((sum, l) => sum + parseFloat(l.context.value), 0) / tempLogsToday.length : null;

        const avgHumid = humidLogsToday.length ? humidLogsToday.reduce((sum, l) => sum + parseFloat(l.context.value), 0) / humidLogsToday.length : null;

        tempData.push(avgTemp ? parseFloat(avgTemp.toFixed(2)) : null);
        humidData.push(avgHumid ? parseFloat(avgHumid.toFixed(2)) : null);
        wateringPoints.push(avgTemp > 28 ? avgTemp : null);
    }

    const documentStyle = getComputedStyle(document.documentElement);

    lineDataTemp.value = {
        labels,
        datasets: [
            {
                label: 'Suhu Harian (℃)',
                data: tempData,
                borderColor: documentStyle.getPropertyValue('--p-primary-500') || 'blue',
                backgroundColor: 'transparent',
                fill: false,
                tension: 0.4
            },
            {
                label: 'Disiram (Suhu > 28°C)',
                data: wateringPoints,
                borderColor: 'red',
                backgroundColor: 'red',
                fill: false,
                tension: 0.4,
                pointRadius: 6,
                pointStyle: 'circle',
                showLine: false // hanya titik
            }
        ]
    };

    lineDataHumid.value = {
        labels,
        datasets: [
            {
                label: 'Kelembaban Harian (%)',
                data: humidData,
                borderColor: documentStyle.getPropertyValue('--p-primary-200') || 'green',
                backgroundColor: 'transparent',
                fill: false,
                tension: 0.4
            }
        ]
    };

    lineOptions.value = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: documentStyle.getPropertyValue('--text-color') || '#333'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: documentStyle.getPropertyValue('--text-color-secondary') || '#999'
                },
                grid: {
                    color: documentStyle.getPropertyValue('--surface-border') || '#ccc'
                }
            },
            y: {
                ticks: {
                    color: documentStyle.getPropertyValue('--text-color-secondary') || '#999'
                },
                grid: {
                    color: documentStyle.getPropertyValue('--surface-border') || '#ccc'
                },
                title: {
                    display: true,
                    text: 'Nilai',
                    color: '#666'
                }
            }
        }
    };
}

function connectWebSocket() {
    const appKey = '4jkuyfnwxejalvgl8pb4';
    const userId = localStorage.getItem('userId');

    const ws = new WebSocket(`wss://api.gardenision.com/app/${appKey}?protocol=7&client=js&version=1.0`);

    ws.onopen = () => {
        console.log('✅ WebSocket connected');
    };

    ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log('📩 FULL EVENT:', data);

        // Saat pertama terkoneksi, lakukan auth
        if (data.event === 'pusher:connection_established') {
            const socket_id = JSON.parse(data.data).socket_id;

            const token = localStorage.getItem('token');
            const authResponse = await fetch('/auth', {
                method: 'POST',
                // headers: { "Content-Type": "application/json" },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` || ''
                },
                body: JSON.stringify({
                    socket_id,
                    channel_name: `private-user.${userId}`
                })
            });

            const authData = await authResponse.json();

            ws.send(
                JSON.stringify({
                    event: 'pusher:subscribe',
                    data: {
                        channel: `private-user.${userId}`,
                        auth: authData.auth
                    }
                })
            );
        }
        // else if (data.event === "GardenDeviceModuleUpdated") {
        //   const module_id = JSON.parse(data.data).module.id;
        //   if(module_id == pumpId.value) {

        //   }
        // }

        // Tangani event custom (bukan dari Pusher internal)
        if (!data.event.startsWith('pusher:')) {
            console.log('📩 Received event:', data);

            // Misal backend kirim seperti ini:
            // { event: 'update', data: { temperature: 29.1, humidity: 77, pumpStatus: '1' } }
            const payload = JSON.parse(data.data);
            console.log('payload', payload);
            console.log('temperatureId', temperatureId.value);
            console.log('humidityId', humidityId.value);
            console.log('pumpId', pumpId.value);

            if (payload?.module?.id === temperatureId.value) {
                temperature.value = payload.module.unit_value;
            } else if (payload?.module?.id === humidityId.value) {
                humidity.value = payload.module.unit_value;
            } else if (payload?.module?.id === pumpId.value) {
                pumpStatus.value = payload.module.unit_value;
            }
        }
    };

    ws.onerror = (err) => {
        console.error('❌ WebSocket error', err);
    };

    ws.onclose = () => {
        console.warn('⚠️ WebSocket closed. Reconnecting...');
        setTimeout(connectWebSocket, 5000); // auto-reconnect
    };
}

onMounted(async () => {
    await fetchModules();
    await fetchAnalytics();
    await fetchSettings();
    loading.value = false;

    connectWebSocket();
});

watch(
    () => route.params.garden,
    async (newModuleId) => {
        loading.value = true; // Tampilkan loading saat mengambil data
        await fetchModules();
        await fetchAnalytics(); // Ambil data device types untuk proyek baru
        loading.value = false; // Sembunyikan loading setelah data diambil
    }
);
watch(
    () => route.params.device,
    async (newGardentId) => {
        loading.value = true; // Tampilkan loading saat mengambil data
        await fetchModules();
        await fetchAnalytics(); // Ambil data device types untuk proyek baru
        loading.value = false; // Sembunyikan loading setelah data diambil
    }
);

// Watch toggle: mode manual
watch(checked_mode, async (newVal) => {
    if (!moduleIdNozzle.value) return;

    const gardenId = route.params.garden;
    const deviceId = route.params.device;
    const token = localStorage.getItem('token');

    const payload = {
        active: newVal // true = manual, false = otomatis
    };

    try {
        await axios.put(`/api/gardens/${gardenId}/devices/${deviceId}/settings/${moduleIdNozzle.value}/value`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Mode Manual updated:', payload);

        if (!newVal) {
            // Kalau mode manual dimatikan, fetch ulang data dari sensor
            await fetchAnalytics();
        }
    } catch (error) {
        console.error('❌ Gagal update mode manual:', error);
    }
});

// Watch toggle: nozzle
watch(checked, async (newVal) => {
    if (!checked_mode.value || !moduleIdNozzle.value) return;

    const gardenId = route.params.garden;
    const deviceId = route.params.device;
    const token = localStorage.getItem('token');

    const payload = {
        value: newVal ? '1' : '0' // 1 = ON, 0 = OFF
    };

    try {
        await axios.put(`/api/gardens/${gardenId}/devices/${deviceId}/settings/${moduleIdNozzle.value}/value`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Nozzle (pompa) updated:', payload);

        // ✅ Ambil ulang data untuk update `pumpStatus` di tampilan
        await fetchAnalytics();
    } catch (error) {
        console.error('❌ Gagal update nozzle:', error);
    }
});
</script>
