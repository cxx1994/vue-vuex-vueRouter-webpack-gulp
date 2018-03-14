

import { asyncRouterMap, constantRouterMap } from '../../router/index';

function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

const state = {
    roles: 'admin',
    'IS_LOADED_MENU': false,
    routers: constantRouterMap,
    addRouters: [],
    currentRouters: []
};

const getters = {
    roles: state => state.roles,
    addRouters: state => state.addRouters,
    currentRouters: state => state.currentRouters,
    IS_LOADED_MENU: state => state.IS_LOADED_MENU
};

const mutations = {
    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers;
        state.routers = constantRouterMap.concat(routers).concat([{ path: '*', redirect: '/404', hidden: true }]);
    },
    LOADED_MENU: (state) => {
        state.IS_LOADED_MENU = true;
    },
    RESET_MENU: (state) => {
        state.routers = constantRouterMap;
        state.IS_LOADED_MENU = false;
    },
    CHANGE_MENU: (state, moduleIndex) => {
        state.currentRouters = state.addRouters[moduleIndex];
    }
};

const actions = {
    GenerateRoutes({ commit }, data) {
        return new Promise(resolve => {
            const { roles } = data;
            let accessedRouters = asyncRouterMap.filter(v => {
                if (roles.indexOf('super_editor') >= 0) return true;
                if (hasPermission(roles, v)) {
                    if (v.children && v.children.length > 0) {
                        v.children = v.children.filter(child => {
                            if (hasPermission(roles, child)) {
                                return child
                            }
                            return false;
                        });
                        return v
                    } else {
                        return v
                    }
                }
                return false;
            });
            commit('SET_ROUTERS', accessedRouters);
            resolve();
        })
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}