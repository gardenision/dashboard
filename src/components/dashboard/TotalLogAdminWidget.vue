<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Log Admin / Hari</div>
    <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Chart from 'primevue/chart';

const chartData = ref();
const chartOptions = ref();

// Fungsi: Konfigurasi chart
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

    const logs = response.data.total_logs_perday;

    // Ambil 7 hari terakhir tanpa hari ini
    const last7DaysData = logs.slice(1, 8); // index 1 s/d 7 (tanpa index 0)

    // Buat label 7 hari ke belakang dari hari ini
    const labels = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (7 - i));
      return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    });

    chartData.value = {
      labels,
      datasets: [{
        label: 'Jumlah Log',
        data: last7DaysData,
        fill: false,
        borderColor: '#6eaa5e',
        tension: 0.4
      }]
    };

    chartOptions.value = setChartOptions();
  } catch (error) {
    console.error('Gagal memuat data log sensor per hari:', error);
  }
});
</script>


<!-- <script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Chart from 'primevue/chart';

const chartData = ref();
const chartOptions = ref();

// Fungsi: Simpan log ke localStorage
function saveLogToLocalStorage(todayValue) {
  const today = new Date().toISOString().split('T')[0]; // format: yyyy-mm-dd
  const key = 'logUserHistory';

  const raw = localStorage.getItem(key);
  let history = raw ? JSON.parse(raw) : [];

  const alreadyLogged = history.find(item => item.date === today);

  if (!alreadyLogged) {
    history.push({ date: today, value: todayValue });

    // Hanya simpan 7 hari terakhir
    if (history.length > 7) {
      history = history.slice(history.length - 7);
    }

    localStorage.setItem(key, JSON.stringify(history));
  }

  return history;
}

// Fungsi: Konfigurasi chart
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

    const response = await axios.get('/api/garden', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const todayValue = response.data.total_user_logs_perday[0] || 0;
    const history = saveLogToLocalStorage(todayValue);

    const labels = history.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }); // contoh: 04 Jul
    });

    const data = history.map(item => item.value);

    chartData.value = {
      labels,
      datasets: [{
        label: 'Jumlah Log Sensor',
        data,
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
</script> -->
