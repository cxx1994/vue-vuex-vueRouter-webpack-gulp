
import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import permission from './modules/permission'
import platform from './modules/platform'
import server from './modules/server'


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        user,
        permission,
        platform,
        server
    },
    strict: debug,
    plugins: debug ? [] : []
})