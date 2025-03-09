<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const model = ref([
    {
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: { name: 'dashboard' } },
            { label: 'Gardens', icon: 'mdi mdi-tree-outline text-xl', to: { name: 'garden' } }
        ]
    },
    {
        label: 'Garden',
        prefix: 'garden.',
        items: [
            { label: 'Devices', icon: 'pi pi-fw pi-desktop', to: { name: 'garden.device' } },
            { label: 'Setting', icon: 'pi pi-fw pi-cog', to: { name: 'garden.setting' } },
            { label: 'Analytic', icon: 'pi pi-fw pi-chart-bar', to: { name: 'garden.analytic' } }
        ]
    },
    {
        label: 'Device',
        prefix: 'garden.device.',
        items: [
            { label: 'Modules', icon: 'pi pi-fw pi-desktop', to: { name: 'garden.device.module' } },
            { label: 'Setting', icon: 'pi pi-fw pi-cog', to: { name: 'garden.device.setting' } },
            { label: 'Analytic', icon: 'pi pi-fw pi-chart-bar', to: { name: 'garden.device.analytic' } }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator && (!item.prefix || route.name.startsWith(item.prefix))" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
