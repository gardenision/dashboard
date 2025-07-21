<!-- 
<template>
    <div class="card">
        <DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="name" header="Nama Garden" style="width: 25%"></Column>
            <Column field="country.name" header="Jumlah Device" style="width: 25%"></Column>
            <Column field="company" header="Status Device" style="width: 25%"></Column>
            <Column field="representative.name" header="Terakhir Update" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CustomerService } from '@/service/CustomerService';


onMounted(() => {
    CustomerService.getCustomersMedium().then((data) => (customers.value = data));
});

const customers = ref();

</script> -->


<!-- <template>
  <div class="card">
    <DataTable :value="gardens" :loading="loading" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 60rem">
      <Column field="name" header="Nama Garden" style="width: 25%"></Column>
      <Column field="totalDevice" header="Total Device" style="width: 25%"></Column>
      <Column field="totalSensor" header="Total Sensor" style="width: 25%"></Column>
      <Column field="totalActuator" header="Total Aktuator" style="width: 25%"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const gardens = ref([]);
const loading = ref(true);
const route = useRoute();


const fetchGardensWithStats = async () => {
  loading.value = true;
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const gardenRes = await axios.get('/api/gardens', { headers });
    const gardenList = Array.isArray(gardenRes.data?.data)
      ? gardenRes.data.data
      : Array.isArray(gardenRes.data)
        ? gardenRes.data
        : [];
    console.log('All gardens:', gardenList);

    const results = [];

    for (const garden of gardenList) {
      const deviceRes = await axios.get(`/api/gardens/${garden.id}/devices`, { headers });
      const devices = Array.isArray(deviceRes.data?.data)
        ? deviceRes.data.data
        : Array.isArray(deviceRes.data)
          ? deviceRes.data
          : [];
      console.log(`Devices for garden ${garden.name}:`, devices);

    
      let totalSensor = 0;
      let totalActuator = 0;

      for (const device of devices) {
        const modulesRes = await axios.get(`/api/gardens/${garden.id}/devices/${device.id}/modules`, { headers });
        const modules = modulesRes.data?.modules || [];
        console.log(`Modules for device ${device.id}:`, modules);

        for (const module of modules) {
          const type = module.module?.type;
          if (type === 'sensor') totalSensor++;
          else if (type === 'actuator') totalActuator++;
        }
      }

      results.push({
        name: garden.name,
        totalDevice: devices.length,
        totalSensor,
        totalActuator
      });
    }

    gardens.value = results;
  } catch (err) {
    console.error('Error fetching garden stats:', err);
  } finally {
    loading.value = false;
  }
};


onMounted(fetchGardensWithStats);

</script> -->

<template>
  <div class="card">
    <DataTable :value="gardens" :loading="loading" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 60rem">
      <Column field="name" header="Nama Garden" style="width: 25%"></Column>
      <Column field="totalDevice" header="Total Device" style="width: 25%"></Column>
      <Column field="totalSensor" header="Total Sensor" style="width: 25%"></Column>
      <Column field="totalActuator" header="Total Aktuator" style="width: 25%"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const gardens = ref([]);
const loading = ref(true);
const maxDeviceId = 3; // coba maksimal 10 device ID per garden

const fetchGardensWithStats = async () => {
  loading.value = true;
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  try {
    // Ambil semua garden milik user
    const gardenRes = await axios.get('/api/gardens', { headers });
    const gardenList = Array.isArray(gardenRes.data) ? gardenRes.data : gardenRes.data.data;
    console.log("All gardens:", gardenList);

    const results = [];

    for (const garden of gardenList) {
      let totalDevice = 0;
      let totalSensor = 0;
      let totalActuator = 0;

      for (let deviceId = 1; deviceId <= maxDeviceId; deviceId++) {
        try {
          const res = await axios.get(`/api/gardens/${garden.id}/devices/${deviceId}/modules`, { headers });

          const modules = res.data.modules || [];

          if (modules.length > 0) {
            totalDevice++; // device valid kalau punya module

            for (const module of modules) {
              const type = module.module?.type;
              if (type === 'sensor') totalSensor++;
              else if (type === 'actuator') totalActuator++;
            }
          }
        } catch (err) {
          // console.log(`Device ${deviceId} not found in garden ${garden.name}`);
          continue; // lewati jika gagal fetch
        }
      }

      results.push({
        name: garden.name,
        totalDevice,
        totalSensor,
        totalActuator
      });
    }

    gardens.value = results;
  } catch (err) {
    console.error('Error fetching garden stats:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchGardensWithStats);
</script>
