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
    <page-frame :pageFrameStyle='frameStyle'>
        <div class="article-form-div" slot="slotForm">
            <Form ref="businessForm" :model="businessForm" :rules="businessRule" :label-width="80">
                <FormItem><h1 class="general-form-title">服务在线申请</h1></FormItem>
                <FormItem label="服务类型" prop="serviceType">
                    <Select v-model="businessForm.serviceType" style="width: 750px">
                        <Option v-for="item in serviceTypeList"
                                :value="item.key" :key="item.value">{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="申请原因" prop="content">
                    <quill-editor v-model='businessForm.content' style="width: 750px;height: 300px"></quill-editor>
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
    import httpUtil from '../libs/util';
    import PageFrame from './components/pageFrame';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    export default {
        data() {
            return {
                // 给模板页设置样式
                frameStyle: {
                    openNames: ['4'],
                },

                businessForm: {
                    serviceType: '',
                    content: ''
                },

                // 服务类型List
                serviceTypeList: [],

                // 用户输入校验
                businessRule: {
                    serviceType: [
                        {
                            required: true,
                            message: '类型为必选呦!',
                            trigger: 'change'
                        }
                    ],
                    content: [
                        {
                            required: true,
                            message: '内容不能为空呦!',
                            trigger: 'blur'
                        }
                    ]
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
                        // 保存缴费标准信息
                        httpUtil.httpRequestPost('/bill/billEntry', this.businessForm).then(callback);
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