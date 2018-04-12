<style>
    .login {
        height: 100vh;
        background: url("http://112.74.57.49/img/1522827455677.jpg");
        background-size: cover;
        position: relative;
        text-align: center;
    }

    .loginForm {
        padding-top: 10%;
        margin: 0 auto;
        width: 360px;
    }
</style>

<template>
    <div class="login">
        <Form class="loginForm" ref="loginForm" :model="loginForm" :rules="loginRule">
            <FormItem prop="user">
                <Input type="text" v-model="loginForm.phoneNo" placeholder="请输入用户名/账号" clearable autofocus size="large">
                <Icon type="ios-person-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="loginForm.password" placeholder="请输入密码" size="large" clearable>
                <Icon type="ios-locked-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="login()" size="large">登录</Button>
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
            login() {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        localStorage.setItem('token', res.data.token);
                        this.$Message.success(res.message);
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                httpUtil.httpRequestJsonPost('/web/login', this.loginForm).then(callback);
            }
        }
    };
</script>
