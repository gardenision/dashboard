<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Log Sensor / Hari</div>
    <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Chart from 'primevue/chart';

const chartData = ref();
const chartOptions = ref();

function setChartOptions() {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
}

function getLast7DaysLabels(dataLength) {
  const labels = [];
  const today = new Date();

  // Dari 7 hari lalu sampai kemarin (hari ini exclude)
  for (let i = dataLength; i > 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    labels.push(d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }));
  }

  return labels;
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const response = await axios.get('/api/project', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const logSensorDataRaw = response.data.total_logs_sensor_perday || [];

    // Ambil 7 hari terakhir tanpa hari ini (buang index 0)
    const logSensorData = logSensorDataRaw.slice(1, 8);

    // Label tanggal dari 7 hari lalu sampai kemarin
    const labels = getLast7DaysLabels(logSensorData.length);

    chartData.value = {
      labels,
      datasets: [{
        label: 'Jumlah Log Sensor',
        data: logSensorData,
        fill: false,
        borderColor: '#06b6d4',
        tension: 0.4
      }]
    };

    chartOptions.value = setChartOptions();
  } catch (error) {
    console.error('Gagal memuat data sensor per hari:', error);
  }
});
</script>

