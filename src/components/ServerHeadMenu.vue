<template>
    <div style="float: right;line-height: 30px;padding-top: 17px;">
        <el-badge is-dot class="item">消息</el-badge>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>