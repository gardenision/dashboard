import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/pages/Home.vue')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/dashboard',
            component: AppLayout,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: 'garden',
                    children: [
                        {
                            path: '',
                            name: 'garden',
                            component: () => import('@/views/pages/dashboard/garden/Index.vue')
                        },
                        {
                            path: ':garden',
                            children: [
                                {
                                    path: '',
                                    name: 'garden.device',
                                    component: () => import('@/views/pages/dashboard/garden/device/Index.vue')
                                },
                                {
                                    path: ':device',
                                    children: [
                                        {
                                            path: '',
                                            name: 'garden.device.module',
                                            component: () => import('@/views/pages/dashboard/garden/device/module/Index.vue')
                                        },
                                        {
                                            path: 'setting',
                                            name: 'garden.device.setting',
                                            component: () => import('@/views/pages/dashboard/garden/device/Setting.vue')
                                        },
                                        {
                                            path: 'analytic',
                                            name: 'garden.device.analytic',
                                            component: () => import('@/views/pages/dashboard/garden/device/Analytic.vue')
                                        }
                                    ]
                                },
                                {
                                    path: 'setting',
                                    name: 'garden.setting',
                                    component: () => import('@/views/pages/dashboard/garden/Setting.vue')
                                },
                                {
                                    path: 'analytic',
                                    name: 'garden.analytic',
                                    component: () => import('@/views/pages/dashboard/garden/Analytic.vue')
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: '/admin',
            component: AppLayout,
            children: [
                {
                    path: '',
                    name: 'admin',
                    component: () => import('@/views/pages/admin/Index.vue')
                },
                {
                    path: 'project',
                    children: [
                        {
                            path: '',
                            name: 'admin.project',
                            component: () => import('@/views/pages/admin/project/Index.vue')
                        },
                        {
                            path: ':project',
                            children: [
                                {
                                    path: '',
                                    name: 'admin.project.type',
                                    component: () => import('@/views/pages/admin/project/type/Index.vue')
                                },
                                {
                                    path: ':type',
                                    children: [
                                        {
                                            path: '',
                                            name: 'admin.project.type.module',
                                            component: () => import('@/views/pages/admin/project/type/module/Index.vue')
                                        },
                                        {
                                            path: ':module',
                                            children: [
                                                {
                                                    path: '',
                                                    name: 'admin.project.type.module.edit',
                                                    component: () => import('@/views/pages/admin/project/type/module/Edit.vue')
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

export default router;
