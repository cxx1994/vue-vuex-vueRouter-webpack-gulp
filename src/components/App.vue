<template>
    <div id="app">
        <transition name="fade"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {
        }
    }

</script>

<style>
    body {
        margin: 0;
        padding: 0;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
    }
    #app {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
</style>