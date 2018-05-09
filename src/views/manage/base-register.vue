<style>
    .register {
        height: 100vh;
        background: url("http://112.74.57.49:88/img/1523544261477.png");
        background-size: cover;
        position: relative;
        text-align: center;
    }

    .registerForm {
        padding-top: 10%;
        margin: 0 auto;
        width: 360px;
    }

    .register-logo {
        width: 350px;
    }
</style>

<template>
    <div class="register">
        <Form class="registerForm" ref="registerForm" :model="registerForm" :rules="registerRule">
            <FormItem>
                <img class="register-logo" src="http://112.74.57.49:88/img/property-logo-white.jpg">
            </FormItem>
            <FormItem prop="nickName">
                <Input type="text" v-model="registerForm.nickName" placeholder="请输入昵称" clearable autofocus size="large">
                <Icon type="social-snapchat-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="phoneNo">
                <Input type="text" v-model="registerForm.phoneNo" placeholder="请输入手机号" clearable autofocus size="large">
                <Icon type="ios-person-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="verifyCode">
                <Input type="text" v-model="registerForm.verifyCode" placeholder="请输入短信验证码" size="large" clearable>
                <Icon type="ios-chatbubble-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="registerForm.password" placeholder="请输入密码" size="large" clearable>
                <Icon type="ios-locked-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="register('registerForm')" size="large">注册</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import httpUtil from '../../libs/util';

    export default {
        data() {
            return {
                registerForm: {
                    nickName: '',
                    phoneNo: '',
                    verifyCode: '',
                    password: ''
                },
                registerRule: {
                    nickName: [
                        {
                            required: true,
                            message: '昵称不能为空',
                            trigger: 'blur'
                        }
                    ],
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
                    verifyCode: [
                        {
                            required: true,
                            message: '验证码不能为空!',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            len: 6,
                            message: '验证码为6位呦!',
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
            register(name) {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('nickName', res.data.nickName);
                        localStorage.setItem('rolesId', res.data.rolesId);
                        this.$Message.success(res.message);
                        this.$router.push({path: '/home'});
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 用户登录
                        httpUtil.httpRequestPost('/passport/register', this.registerForm).then(callback);
                    } else {
                        this.$Message.error('请先确认输入信息格式~~~');
                    }
                });
            }
        }
    };
</script>
