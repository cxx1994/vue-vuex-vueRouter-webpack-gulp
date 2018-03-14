<template>
    <el-row>
        <el-col class="title">
            <span>请选择要进入的模块</span>
        </el-col>
        <el-col class="module" v-for="(value, index) in addRouters" :key="index">
            <router-link v-if="!value.meta.hidden" :to="value.path">
                <el-card class="module-body" :body-style="{ textAlign: 'center' }">
                    <i :class="value.meta.icon" class="module-icon"></i>
                    <div class="bottom">
                        <span>{{value.name}}</span>
                    </div>
                </el-card>
            </router-link>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "module-change",
        data() {
            return {
                currentDate: new Date()
            };
        },
        methods: {
        },
        mounted(){
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth,
                margin = (clientWidth - 260*this.addRouters.length - 5)/(this.addRouters.length + 1);
            [...document.getElementsByClassName('module')].forEach(v => v.style.marginLeft = `${margin}px`)
        },
        computed: {
            addRouters: function () {
                return this.$store.getters.addRouters;
            }
        }
    }
</script>

<style scoped>
    .title{
        text-align: center;
        font-size: 28px;
        padding: 100px 0;
    }
    .module{
        width: 260px;
    }
    .module-body{
        width: 260px;
        position: relative;
        left: 0;
        top: 0;
        transition: all .5s ease-in-out;
    }
    .module-body:hover{
        left: 4px;
        top: 4px;
    }
    .module-icon{
        font-size: 150px;
    }
    .bottom {
        padding: 14px;
        font-size: 30px;
    }
</style>