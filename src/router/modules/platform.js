
import Home from '../../components/Home.vue'
import Index from '../../components/platform/Index.vue'
import platformMenu from '../../components/PlatformHeadMenu.vue'
import RouterView from '../../components/RouterView.vue'
import Label from '../../components/platform/Label.vue'
import DirectoryManage from '../../components/platform/DirectoryManage.vue'
import Template from '../../components/platform/Template.vue'
import Organization from '../../components/platform/Organization.vue'
import DirectorySetting from '../../components/platform/DirectorySetting.vue'
import Sms from '../../components/platform/Sms.vue'

const router = [{
    path: '/platform',
    redirect: '/platform/index',
    component: Home,
    name: '平台配置',
    meta: {
        role: ['admin','super_editor'],
        icon: 'el-icon-location'
    },
    children: [
        {
            path: '/platform/index',
            components: { default: Index, headMenu: platformMenu },
            name: '平台配置首页' ,
            meta: {role: ['super_editor'], hidden: true}
        },
        {
            path: '/platform/label',
            components: { default: Label, headMenu: platformMenu },
            name: '标签管理' ,
            meta: {role: ['super_editor'], icon: 'el-icon-location'}
        },
        {
            path: '/platform/directory',
            components: { default: DirectoryManage, headMenu: platformMenu },
            name: '目录管理',
            meta: {role: ['super_editor'], icon: 'el-icon-location'}
        },
        {
            path: '/platform/template',
            components: { default: Template, headMenu: platformMenu },
            name: '模板管理',
            meta: {role: ['admin','super_editor'], icon: 'el-icon-location'} },
        {
            path: '/platform/organization',
            components: { default: RouterView, headMenu: platformMenu },
            name: '机构管理',
            meta: {role: ['admin','super_editor'], icon: 'el-icon-location'},
            children: [
                {
                    path: '/platform/organization/basic',
                    component: Organization,
                    name: '基本信息',
                    meta: {
                        role: ['admin','super_editor'],
                    }
                },
                { path: '/platform/organization/catalog', component: DirectorySetting, name: '目录配置', meta: {role: ['admin','super_editor'],} },
                { path: '/platform/organization/sms', component: Sms, name: '短信额度', meta: {role: ['admin','super_editor'],} }
            ]
        }
    ]
}];
export default router