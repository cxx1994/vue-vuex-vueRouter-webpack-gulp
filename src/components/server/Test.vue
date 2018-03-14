<template>
    <p style="font-family: PingFang SC;font-size: 40px">标准服务里面的页面!</p>
</template>

<script>
    export default {
        data() {
            return {
                a: 1
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted(){
            this.$message({
                message: '标准服务里面的页面!',
                type: 'success',
                center: true
            });
        }
    }
</script>