<style>
    .forgetPwd {
        height: 100vh;
        background: url("http://112.74.57.49/img/1523544261477.png");
        background-size: cover;
        position: relative;
        text-align: center;
    }

    .forgetPwdForm {
        padding-top: 10%;
        margin: 0 auto;
        width: 360px;
    }

    .forgetPwd-logo {
        width: 350px;
    }
</style>

<template>
    <div class="forgetPwd">
        <Form class="forgetPwdForm" ref="forgetPwdForm" :model="forgetPwdForm" :rules="forgetPwdRule">
            <FormItem>
                <img class="forgetPwd-logo" src="http://112.74.57.49/img/property-logo-white.jpg">
            </FormItem>
            <FormItem prop="phoneNo">
                <Input type="text" v-model="forgetPwdForm.phoneNo" placeholder="请输入手机号" clearable autofocus
                       size="large">
                <Icon type="ios-person-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="verifyCode">
                <Input type="text" v-model="forgetPwdForm.verifyCode" placeholder="请输入短信验证码" size="large" clearable>
                <Icon type="ios-chatbubble-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="forgetPwdForm.password" placeholder="请输入密码" size="large" clearable>
                <Icon type="ios-locked-outline" slot="prepend" size="20"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="forgetPwd('forgetPwdForm')" size="large">找回密码</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import httpUtil from '../libs/util';

    export default {
        data() {
            return {
                forgetPwdForm: {
                    phoneNo: '',
                    verifyCode: '',
                    password: ''
                },
                forgetPwdRule: {
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
            forgetPwd(name) {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('nikeName', res.data.nickName);
                        this.$Message.success(res.message);
                        this.$router.push({path: '/home'});
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 用户登录
                        httpUtil.httpRequestJsonPost('/passport/forgetPassword', this.forgetPwdForm).then(callback);
                    } else {
                        this.$Message.error('请先确认输入信息格式~~~');
                    }
                });
            }
        }
    };
</script>
