<template>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Projects</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{totalProjects}}</div>
                </div>
                <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-map-marker text-blue-500 !text-xl"></i>
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
                    <span class="block text-muted-color font-medium mb-4">Device</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalDevices }}</div>
                </div>
                <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-microchip text-orange-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">2 new </span>
            <span class="text-muted-color">since last week</span>
        </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Active Sensor</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalActiveSensors }} </div>
                </div>
                <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(70,146,221,1)"><path d="M6 8V19H18V8H15V2H17V6H22V8H20V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V8H2V6H7V2H9V8H6ZM13 2V8H11V2H13Z"></path></svg>
                </div>
            </div>
            <span class="text-primary font-medium">{{ totalUnactiveSensors ?? 0 }}</span>
            <span class="text-muted-color"> unactive</span>
        </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Actuators</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalActuators }}</div>
                </div>
                <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-mobile text-purple-500 !text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">{{ totalActuators }} </span>
            <span class="text-muted-color"> working</span>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const totalProjects = ref(0)
const totalDevices = ref(0)
const totalActiveSensors = ref(0)
const totalUnactiveSensors = ref(0)
const totalActuators = ref(0)


const fetchData = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (!userId || !token) {
    console.error('userId or token is missing from localStorage');
    return;
  }

  try {
    const response = await axios.get('/api/project', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = response.data;

    totalProjects.value = data.total_projects;
    totalDevices.value = data.total_devices;
    totalActiveSensors.value = data.total_active_sensors;
    totalUnactiveSensors.value = data.total_inactive_sensors;
    totalActuators.value = data.total_actuators;

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};


// onMounted(fetchData)
onMounted(async () => {
    await fetchData();

});
</script>


