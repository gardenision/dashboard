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
            path: '/auth/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue')
        },
        {
            path: '/dashboard',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'garden',
                    children: [
                        {
                            path: '',
                            name: 'garden',
                            component: () => import('@/views/pages/dashboard/garden/Index.vue'),
                            meta: {requiresAuth: true, role:'user'}
                        },
                        {
                            path: ':garden',
                            children: [
                                {
                                    path: '',
                                    name: 'garden.device',
                                    component: () => import('@/views/pages/dashboard/garden/device/Index.vue'),
                                    meta: {requiresAuth: true, role:'user'}
                                },
                                {
                                    path: ':device',
                                    children: [
                                        {
                                            path: '',
                                            name: 'garden.device.module',
                                            component: () => import('@/views/pages/dashboard/garden/device/module/Index.vue'),
                                            meta: {requiresAuth: true, role:'user'}
                                        },
                                        {
                                            path: 'setting',
                                            name: 'garden.device.setting',
                                            component: () => import('@/views/pages/dashboard/garden/device/Setting.vue'),
                                            meta: {requiresAuth: true, role:'user'}
                                        },
                                        {
                                            path: 'analytic',
                                            name: 'garden.device.analytic',
                                            component: () => import('@/views/pages/dashboard/garden/device/Analytic.vue'),
                                            meta: {requiresAuth: true, role:'user'}
                                        },
                                        {
                                            path: 'report',
                                            name: 'garden.device.report',
                                            component: () => import('@/views/pages/dashboard/garden/device/Report.vue'),
                                            meta: {requiresAuth: true, role:'user'}
                                        }
                                    ]
                                },
                                {
                                    path: 'setting',
                                    name: 'garden.setting',
                                    component: () => import('@/views/pages/dashboard/garden/Setting.vue'),
                                    meta: {requiresAuth: true, role:'user'}
                                },
                                {
                                    path: 'analytic',
                                    name: 'garden.analytic',
                                    component: () => import('@/views/pages/dashboard/garden/Analytic.vue'),
                                    meta: {requiresAuth: true, role:'user'}
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
            meta: { requiresAuth: true, role: 'admin' },
            children: [
                {
                    path: '',
                    name: 'admin',
                    component: () => import('@/views/pages/admin/Index.vue'),
                    meta: { requiresAuth: true, role: 'admin' }
                },
                {
                    path: 'project',
                    children: [
                        {
                            path: '',
                            // name: 'admin.project',
                            name: 'project',
                            component: () => import('@/views/pages/admin/project/Index.vue'),
                            meta: { requiresAuth: true, role: 'admin' }
                        },
                        {
                            path: ':project',
                            children: [
                                {
                                    path: '',
                                    name: 'project.type',
                                    component: () => import('@/views/pages/admin/project/type/Index.vue'),
                                    meta: { requiresAuth: true, role: 'admin' }
                                },
                                {
                                    path: ':type',
                                    children: [
                                        {
                                            path: '', // Rute untuk Devices
                                            // name: 'admin.project.type.device',
                                            name: 'project.type.device',
                                            component: () => import('@/views/pages/admin/project/type/device/Index.vue'), // Pastikan path ini sesuai
                                            meta: { requiresAuth: true, role: 'admin' }
                                        },
                                        {
                                            path: '', // Rute untuk Modules
                                            // name: 'admin.project.type.module',
                                            name: 'project.type.module',
                                            component: () => import('@/views/pages/admin/project/type/module/Index.vue'), // Pastikan path ini sesuai
                                            meta: { requiresAuth: true, role: 'admin' }
                                        }
                                    ]
                                },
                                {
                                    path: '', 
                                    name: 'project.device',
                                    component: () => import('@/views/pages/admin/project/type/device/Index.vue'), 
                                    meta: { requiresAuth: true, role: 'admin' }
                                },
                                {
                                    path: '',
                                    name: 'project.module',
                                    component: () => import('@/views/pages/admin/project/type/module/Index.vue'), 
                                    meta: { requiresAuth: true, role: 'admin' }
                                }
                            ]
                        }
                    ]
                }
            ]
        }


    ]
});


router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token')
    // get role
    const role = localStorage.getItem('role');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' });
    }else if(to.meta.role && to.meta.role !== role){
        if (role === 'admin'){
            next({name: 'admin'});
        } else {
            next({name: 'dashboard'});
        }
    } else {
        next()
    }
});


export default router;
