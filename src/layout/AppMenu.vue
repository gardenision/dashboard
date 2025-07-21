<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

import { useRoute } from 'vue-router';

const route = useRoute();

// get role user
const role = localStorage.getItem('role') || 'user'

const model = ref([
    {
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: { name: role === 'admin' ? 'admin' : 'dashboard' } },
            // { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: { name: 'admin' } },
            ...(role === 'user' ? [
                { label: 'Gardens', icon: 'mdi mdi-tree-outline text-xl', to: { name: 'garden' } }
            ] : []),


            ...(role === 'admin' ? [
                { label: 'Admin', icon: 'mdi mdi-tree-outline text-xl', to: {name: 'project'} }
            ]:[]),


        ]
    },
    ...(role === 'user' ? [
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
            { label: 'Analytic', icon: 'pi pi-fw pi-chart-bar', to: { name: 'garden.device.analytic' } },
            { label: 'Report', icon: 'pi pi-fw pi-list-check', to: { name: 'garden.device.report' } }
        ]
    }
    ] : []),

    ...(role === 'admin' ? [
        {
            label: 'Project',
            prefix: 'project.',
            items: [
                {label: 'Type', icon: 'pi pi-fw pi-desktop', to: { name: 'project.type' }},
                // { label: 'Device', icon: 'pi pi-fw pi-desktop', to: { name: 'project.device' } },
                // { label: 'Modules', icon: 'pi pi-fw pi-desktop', to: { name: 'project.module' } },
            ]
        },
        {
            label: 'Type',
            prefix: 'project.type.',
            items: [
                { label: 'Device', icon: 'pi pi-fw pi-desktop', to: { name: 'project.type.device' } },
                { label: 'Modules', icon: 'pi pi-fw pi-desktop', to: { name: 'project.type.module' } },
            ]
        }

    ]:[])

    // ...(role === 'admin' ? [
    // // {
    // //     label: 'Projects',
    // //     // icon: 'pi pi-fw pi-folder',
    // //     to: { name: 'admin.project' } // halaman list project
    // // },
    // {
    //     label: 'Projects',
    //     prefix: 'admin.project.',
    //     items: [
    //             {
    //                 label: 'Device Types',
    //                 icon: 'pi pi-fw pi-th-large',
    //                 to: { name: 'admin.project.type' }
    //             },
    //             {
    //                 label: 'Modules',
    //                 icon: 'pi pi-fw pi-cog',
    //                 to: { name: 'admin.project.type.module' }
    //             },
    //             {
    //                 label: 'Edit Module',
    //                 icon: 'pi pi-fw pi-pencil',
    //                 to: { name: 'admin.project.type.module.edit' }
    //             }
    //     ]
    // },
    // {
    //     label: 'Device Types',
    //     prefix: 'admin.project.type.',
    //     items: [
    //         {
    //             label: 'Modules',
    //             icon: 'pi pi-fw pi-cog',
    //             to: {name: 'admin.project.type.module'}
    //         },
    //         {
    //             label: 'Devices',
    //             icon: 'pi pi-fw pi-desktop',
    //             to: {
    //                 name: 'admin.project.type.device'}
    //         }
    //     ]
    // }
    // ] : [])
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
