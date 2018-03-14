<template>
    <el-container :class="{'aside-collapse': isCollapse}">
        <el-header class="header">
            <el-col class="logo">{{sysName}}</el-col>
            <el-col :span="6">
                <el-dropdown placement="bottom-start">
                    <el-button class="module-change" type="primary" icon="el-icon-menu" @click="change=!change"> </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <template v-for="(value) in addRouters">
                            <router-link v-if="!value.meta.hidden" :to="value.path">
                                <el-dropdown-item>
                                    <i :class="value.meta.icon"></i>
                                    <span>{{value.name}}</span>
                                </el-dropdown-item>
                            </router-link>
                        </template>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="8">
                <transition name="fade" mode="out-in">
                    <router-view name="headMenu"/>
                </transition>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar"/> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse? '64px' : '230px'">
                <el-menu
                        default-active="100"
                        :router="true"
                        :collapse="isCollapse"
                        class="el-menu-vertical-d"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">

                    <template v-for="(value, key) in currentRouters.children">
                        <template v-if="value.children && value.children.length">
                            <el-submenu :index="key+''">
                                <template slot="title">
                                    <i :class="value.meta.icon"></i>
                                    <span>{{value.name}}</span>
                                </template>
                                <template v-for="(value1) in value.children">
                                    <el-menu-item :index="value1.path">{{value1.name}}</el-menu-item>
                                </template>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item v-if="!value.meta.hidden" :index="value.path">
                                <i :class="value.meta.icon"></i>
                                <span>{{value.name}}</span>
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
                <el-button class="menu-fold" @click="isCollapse=!isCollapse">
                    <i class="el-icon-arrow-left" v-show="!isCollapse"></i>
                    <i class="el-icon-arrow-right" v-show="isCollapse"></i>
                </el-button>
            </el-aside>
            <el-main>
                <section>
                    <el-col :span="24">
                        <strong class="title">{{$route.name}}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view/>
                        </transition>
                    </el-col>
                </section>

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data() {
            return {
                sysName: '医总管运营中心',
                change: false,
                isCollapse: false,
                sysUserName: '??',
                sysUserAvatar: '',
                dialogVisible: false
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleselect: function (a, b) {
            },
            //退出登录
            logout: function () {
                this.$confirm('确认退出吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    this.$store.commit('RESET_MENU');
                    //this.$router.push('/login');
                    location.reload();
                }, () => {
                });
            }
        },
        created: function () {
        },
        mounted() {
            let user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name;
                this.sysUserAvatar = user.avatar || '';
            }

        },
        watch: {
            updateMenu: function () {
                this.getNextArea(this.$store.state.currentAddress);
            }
        },
        computed: {
            ...mapGetters([
                'currentRouters',
                'addRouters'
            ])
        }

    }

</script>

<style>

</style>