<style>
    .general-form-title {
        text-align: center;
    }

    .article-form-div {
        width: 100vh;
        height: 100vh;
    }
</style>

<template>
    <page-frame>
        <div class="article-form-div" slot="slotForm">
            <Form ref="businessForm" :model="businessForm" :rules="businessRule" :label-width="80">
                <FormItem><h1 class="general-form-title">提出建议或服务评论</h1></FormItem>
                <FormItem label="手机号" prop="phone">
                    <input v-model="businessForm.phone" placeholder="请输入手机号" style="width: 300px;height: 40px">
                </FormItem>
                <FormItem label="昵称" prop="name">
                    <input v-model="businessForm.name" placeholder="edit me" style="width: 300px;height: 40px">
                </FormItem>
                <FormItem label="主旨" prop="title">
                    <Select v-model="businessForm.title" style="width:200px">
                        <Option value="建议">建议</Option>
                        <Option value="评论" >评论</Option>
                    </Select>
                </FormItem>

                <FormItem label="意见（建议）详情" prop="text">
                    <quill-editor v-model='businessForm.text' style="width: 750px;height: 300px"></quill-editor>
                </FormItem>
                <FormItem>
                    <div style="margin-top: 80px">
                        <Button type="primary" @click="handleSubmit('businessForm')">添加</Button>
                        <Button type="ghost" @click="handleReset('businessForm')" style="margin-left: 8px">重置</Button>
                    </div>
                </FormItem>
            </Form>
        </div>
    </page-frame>
</template>
<script>
    import httpUtil from '../../libs/util';
    import PageFrame from '../components/pageFrame';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    export default {
        data() {
            return {

                businessForm: {
                    type: '',
                    text: ''

                },

                // 服务类型List
                serviceTypeList: [],

                // 用户输入校验
                businessRule: {
                    type: [
                        {
                            required: true,
                            message: '类型为必选呦!',
                            trigger: 'change'
                        }
                    ],
                    text: [
                        {
                            required: true,
                            message: '内容不能为空呦!',
                            trigger: 'blur'
                        }
                    ],
                    phone: [
                        {
                            required: true,
                            message: '内容不能为空呦!',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            pattern: /^1([3-9])\d{9}$/,
                            message: '手机号格式错误!',
                            trigger: 'blur'
                        }
                    ],
                }
            };
        },

        // 注册组件
        components: {
            PageFrame
        },

        created:
            function () {
                // 请求后台拿到业务信息
                let callbackBusiness = (res) => {
                    if (res.flags === 'success') {
                        this.serviceTypeList = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                httpUtil.httpRequestGet('/base/getServiceType').then(callbackBusiness);
            },

        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let callback = (res) => {
                            if (res.flags === 'success') {
                                this.$Message.info('添加' + `${res.message}`);
                                this.$refs[name].resetFields();
                            } else {
                                res.flags === 'fail' && this.$Message.error(`${res.message}`);
                            }
                        };
                        // 提交申请信息
                        httpUtil.httpRequestPost('/proposal/save', this.businessForm).then(callback);
                    } else {
                        this.$Message.error('请先确认输入信息格式~~~');
                    }
                });
            },

            handleReset(name) {
                this.$refs[name].resetFields();
            }
        }
    };
</script>