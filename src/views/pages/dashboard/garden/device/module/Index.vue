<template>
    <Title title="Modules" @refresh="onRefresh()" />
    <Skeleton v-if="loading" height="50vh" />
    <div v-else class="grid grid-cols-12 gap-8">
        <div class="col-span-12 grid grid-cols-12 gap-8">
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Orders</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">152</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                        </div>
                    </div>
                    <span class="text-primary font-medium">24 new </span>
                    <span class="text-muted-color">since last visit</span>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Orders</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">152</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                        </div>
                    </div>
                    <span class="text-primary font-medium">24 new </span>
                    <span class="text-muted-color">since last visit</span>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Orders</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">152</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                        </div>
                    </div>
                    <span class="text-primary font-medium">24 new </span>
                    <span class="text-muted-color">since last visit</span>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Orders</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">152</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                        </div>
                    </div>
                    <span class="text-primary font-medium">24 new </span>
                    <span class="text-muted-color">since last visit</span>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Orders</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">152</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                        </div>
                    </div>
                    <span class="text-primary font-medium">24 new </span>
                    <span class="text-muted-color">since last visit</span>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6">
            <div class="card">
                <h5 class="card-title text-primary">Sensor 1</h5>
                <p class="card-text">Lorem ipsum dolor sit amet.</p>
                <Chart type="line" :data="lineData" :options="lineOptions"></Chart>
            </div>
            <div class="card">
                <h5 class="card-title text-primary">Sensor 2</h5>
                <p class="card-text">Lorem ipsum dolor sit amet.</p>
                <Chart type="line" :data="lineData" :options="lineOptions"></Chart>
            </div>
        </div>
        <div class="card col-span-12 lg:col-span-6">
            <div class="card-body">
                <h5 class="card-title text-primary">Actuators</h5>
                <div class="grid gap-8">
                    <div class="col-span-12 lg:col-span-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Actuator 1</h5>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ipsum in lorem tempus porttitor.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 lg:col-span-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Actuator 2</h5>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ipsum in lorem tempus porttitor.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 lg:col-span-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Actuator 3</h5>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ipsum in lorem tempus porttitor.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Title from '@/components/dashboard/Title.vue';
import { Skeleton } from 'primevue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(true);

const garden = ref({});
const device = ref({});
const modules = ref([]);

const lineData = ref(null);
const lineOptions = ref(null);

onMounted(() => {
    setColorOptions();
});

function setColorOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    lineData.value = {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
        datasets: [
            {
                label: 'Today',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                tension: 0.4
            },
            {
                label: 'Yesterday',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                borderColor: documentStyle.getPropertyValue('--p-primary-200'),
                tension: 0.4
            }
        ]
    };

    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

function getGarden(id) {
    return {
        id: id,
        name: 'Garden 1'
    };
}

function getDevice(id) {
    return {
        id: id,
        name: 'Device 1'
    };
}

function getModules() {
    return [
        {
            id: 1,
            name: 'Module 1'
        },
        {
            id: 2,
            name: 'Module 2'
        },
        {
            id: 3,
            name: 'Module 3'
        }
    ];
}

function onRefresh() {
    console.log('refresh');
}

onMounted(() => {
    setTimeout(() => {
        garden.value = getGarden(router.currentRoute.value.params.garden);
        device.value = getDevice(router.currentRoute.value.params.device);

        modules.value = getModules();

        loading.value = false;
    }, 1000);
});
</script>
