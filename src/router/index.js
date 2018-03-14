
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Module from '../components/Module.vue'
import Home from '../components/Home.vue'

import PlatformRoutes from './modules/platform'
import server from './modules/server'

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/module',
        component: Module
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/',
        redirect: '/home'
    }
];

//设置路由
export default new VueRouter({
    // mode: "history",
    base: __dirname,
    routes: constantRouterMap
});

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
    ...PlatformRoutes,
    ...server
];