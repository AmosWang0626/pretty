<style>
    .login {
        width: 100%;
        height: 100vh;
        background: url("http://112.74.57.49/img/1522827455677.jpg");
        background-size: cover;
        position: relative;
        text-align: center;
    }

    .loginForm {
        top: 30%;
        right: 200px;
        width: 360px;
        position: absolute;
    }
</style>

<template>
    <div class="login">
        <Form class="loginForm" ref="loginForm" :model="loginForm" :rules="loginRule">
            <FormItem prop="user">
                <Input type="text" v-model="loginForm.user" placeholder="请输入用户名/账号" size="large" clearable autofocus>
                <Icon type="ios-person-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="loginForm.password" placeholder="请输入密码" size="large" clearable>
                <Icon type="ios-locked-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('loginForm')" size="large">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    user: '',
                    password: ''
                },
                loginRule: {
                    user: [
                        {
                            required: true,
                            message: '用户名/账号不能为空!',
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
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            }
        }
    };
</script>
