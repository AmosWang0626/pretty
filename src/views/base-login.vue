<style>
    .login {
        height: 100vh;
        /* 远山 http://112.74.57.49/img/1523544261477.png*/
        /* 蓝天白云 http://112.74.57.49/img/1523544236014.png*/
        background: url("http://112.74.57.49/img/1523544261477.png");
        background-size: cover;
        position: relative;
        text-align: center;
    }

    .loginForm {
        padding-top: 10%;
        margin: 0 auto;
        width: 360px;
    }

    .login-logo {
        width: 350px;
    }
</style>

<template>
    <div class="login">
        <Form class="loginForm" ref="loginForm" :model="loginForm" :rules="loginRule">
            <FormItem>
                <img class="login-logo" src="http://112.74.57.49/img/property-logo-white.jpg">
            </FormItem>
            <FormItem prop="phoneNo">
                <Input type="text" v-model="loginForm.phoneNo" placeholder="请输入手机号" clearable autofocus size="large">
                <Icon type="ios-person-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="loginForm.password" placeholder="请输入密码" size="large" clearable>
                <Icon type="ios-locked-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <router-link to="/forgetPassword">忘记密码</router-link>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="login('loginForm')" size="large">登录</Button>
                <Button type="ghost" @click="toRegister" size="large">注册</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import httpUtil from '../libs/util';

    export default {
        data() {
            return {
                loginForm: {
                    phoneNo: '',
                    password: ''
                },
                loginRule: {
                    phoneNo: [
                        {
                            required: true,
                            message: '手机号不能为空',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            pattern: /^1([3-9])\d{9}$/,
                            message: '手机号格式错误!',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '密码不能为空!',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '密码长度不能低于6位呦!',
                            trigger: 'blur'
                        }
                    ]
                }
            };
        },
        methods: {
            login(name) {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('nikeName', res.data.nickName);
                        this.$router.push({path: '/home'});
                        this.$Message.success('登录' + res.message);
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 用户登录
                        httpUtil.httpRequestJsonPost('/passport/login', this.loginForm).then(callback);
                    } else {
                        this.$Message.error('请先确认输入信息格式~~~');
                    }
                });
            },
            toRegister() {
                this.$router.push({path: '/register'});
            }
        }
    };
</script>
