// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import axios from 'axios'
import router from './router/index'

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

import ElementUI from 'element-ui'
Vue.use(ElementUI);

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import store from './store/index'

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        sessionStorage.removeItem('user');
        next();
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        next({ path: '/login' })
    } else {
        if(!store.getters.IS_LOADED_MENU){
            store.dispatch('GenerateRoutes', { 'roles': user.roles }).then(() => { // 生成可访问的路由表
                store.commit('LOADED_MENU');
                router.addRoutes(store.getters.addRouters);// 动态添加可访问路由表
                next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            });
        }else{
            next()
        }
    }
});

import App from './components/App.vue'
window.vv = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
