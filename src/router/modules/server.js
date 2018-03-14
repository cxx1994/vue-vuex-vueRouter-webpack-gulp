
import Home from '../../components/Home.vue'
import Index from '../../components/server/Index.vue'
import ServerHeadMenu from '../../components/ServerHeadMenu.vue'
import Test from '../../components/server/Test.vue'

const router = [{
    path: '/server',
    redirect: '/server/index',
    component: Home,
    name: '标准服务',
    meta: {
        role: ['admin','super_editor'],
        icon: 'el-icon-menu'
    },
    children: [
        {
            path: '/server/index',
            components: { default: Index, headMenu: ServerHeadMenu },
            name: '标准服务首页' ,
            meta: {role: ['super_editor'], hidden: true}
        },
        {
            path: '/server/sign',
            components: { default: Test, headMenu: ServerHeadMenu},
            name: '签约管理' ,
            meta: {role: ['super_editor'], icon: 'el-icon-menu'}
        },
        { path: '/server/order', components: { default: Test, headMenu: ServerHeadMenu}, name: '服务工单', meta: {role: ['super_editor'], icon: 'el-icon-menu'} },
        { path: '/server/list', components: { default: Test, headMenu: ServerHeadMenu}, name: '转诊列表', meta: {role: ['admin','super_editor'], icon: 'el-icon-menu'} },
        { path: '/server/triage', components: { default: Test, headMenu: ServerHeadMenu}, name: '转诊分诊', meta: {role: ['admin','super_editor'], icon: 'el-icon-menu'} }
    ]
}];
export default router
