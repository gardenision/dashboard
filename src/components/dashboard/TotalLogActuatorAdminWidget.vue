<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Log Aktuator / Hari</div>
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

    // Ambil data 7 hari terakhir (tanpa hari ini)
    const logs = response.data.total_logs_actuator_perday.slice(1, 8);

    // Buat label 7 hari ke belakang dari hari ini
    const labels = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (7 - i));
      return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    });

    chartData.value = {
      labels,
      datasets: [{
        label: 'Jumlah Log Aktuator',
        data: logs,
        fill: false,
        borderColor: '#FFB162',
        tension: 0.4
      }]
    };

    chartOptions.value = setChartOptions();
  } catch (error) {
    console.error('Gagal memuat data aktuator per hari:', error);
  }
});
</script>
