<style>
    .general-form-div {
        padding-top: 5%;
        margin: 0 auto;
        width: 360px;
    }

    .general-form-title {
        text-align: center;
    }
</style>
<template>
    <page-frame>
        <div class="general-form-div" slot="slotForm">
            <Form ref="updatePwdForm" :model="updatePwdForm" :label-width="100" :rules="updatePwdRule">
                <FormItem><h1 class="general-form-title">修改密码</h1></FormItem>
                <FormItem label="旧密码" prop="oldPassword">
                    <Input v-model="updatePwdForm.oldPassword" type="password" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPassword">
                    <Input v-model="updatePwdForm.newPassword" type="password" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="confirmPassword">
                    <Input v-model="updatePwdForm.confirmPassword" type="password" style="width: 300px"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('updatePwdForm')">修改</Button>
                </FormItem>
            </Form>
        </div>
    </page-frame>
</template>
<script>
    import httpUtil from '../../libs/util';
    import PageFrame from '../components/pageFrame';

    export default {
        data() {
            return {
                updatePwdForm: {
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                },

                updatePwdRule: {
                    oldPassword: [
                        {
                            required: true,
                            message: '原始密码不能为空!',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '原始密码长度不能低于6位呦!',
                            trigger: 'blur'
                        }
                    ],
                    newPassword: [
                        {
                            required: true,
                            message: '新密码不能为空!',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '新密码长度不能低于6位呦!',
                            trigger: 'blur'
                        }
                    ],
                    confirmPassword: [
                        {
                            required: true,
                            message: '确认密码不能为空!',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '确认密码长度不能低于6位呦!',
                            trigger: 'blur'
                        }
                    ]
                },
            };
        },
        // 注册组件
        components: {PageFrame},

        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let callback = (res) => {
                            if (res.flags === 'success') {
                                this.$Message.success('修改密码' + res.message);
                            } else {
                                res.flags === 'fail' && this.$Message.error(`${res.message}`);
                            }
                        };
                        // 修改密码
                        httpUtil.httpRequestPost('/passport/updatePassword', this.updatePwdForm).then(callback);
                    } else {
                        this.$Message.error('请先确认输入信息格式~~~');
                    }
                });
            }
        }
    };
</script>