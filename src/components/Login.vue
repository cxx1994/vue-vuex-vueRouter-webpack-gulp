<template>
    <el-form
            :model="form"
            :rules="rule"
            ref="form"
            label-position="left"
            label-width="0px"
            class="demo-ruleForm login-container"
            :loading="logining">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="form.account" auto-complete="off" placeholder="账号"> </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="form.checkPass" @keyup.enter.native="handleSubmit" auto-complete="off" placeholder="密码"> </el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住账号</el-checkbox>
        <el-form-item>
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {requestLogin} from '../api/api'
    export default {
        data() {
            return {
                logining: false,
                form: {
                    account: '',
                    checkPass: ''
                },
                rule: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        requestLogin({'name': this.form.account, 'password': this.form.checkPass}).then((res) => {
                            this.logining = false;
                            if(this.checked){
                                sessionStorage.setItem('account', this.form.account);
                            }else{
                                sessionStorage.removeItem('account');
                            }
                            let { message, code, data } = res.data;
                            if (code !== 200) {
                                this.$message.error(message);
                            } else {
                                sessionStorage.setItem('user', JSON.stringify(data));
                                this.$router.push({ path: '/module' });
                            }
                        }, () => {
                            this.logining = false;
                            this.$message.error('登录失败！');
                        });
                    } else {
                        this.$message.error('请输入正确的用户名和密码！');
                        return false;
                    }
                });
            }
        },
        mounted() {
            this.form.account = sessionStorage.getItem('account');
        }
    }

</script>

<style>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login-container .title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0 0 35px 0;
    }
</style>