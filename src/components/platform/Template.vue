<template>
    <p style="font-family: PingFang SC;font-size: 40px">模板管理页面!</p>
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
                message: '这是模板管理页面!',
                type: 'success',
                center: true
            });
        }
    }
</script>