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
            <Form ref="enterpriseForm" :model="enterpriseForm" :rules="enterpriseRule" :label-width="100">
                <FormItem><h1 class="general-form-title">添加企业</h1></FormItem>
                <FormItem label="公司名称" prop="enterpriseName">
                    <Input v-model="enterpriseForm.enterpriseName" placeholder="公司名称" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="企业地址" prop="address">
                    <Input v-model="enterpriseForm.address" placeholder="公司地址" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="联系电话" prop="phone">
                    <Input v-model="enterpriseForm.phone" placeholder="联系电话" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="企业法人" prop="leaderName">
                    <Input v-model="enterpriseForm.leaderName" placeholder="企业法人" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="入驻时间" prop="settledTime">
                    <DatePicker type="datetime" size="large" placeholder="入驻时间" width="300px"
                                v-model="enterpriseForm.settledTime"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('enterpriseForm')">添加</Button>
                    <Button type="ghost" @click="handleReset('enterpriseForm')" style="margin-left: 8px">取消</Button>
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
                // 下拉列表
                businessList: [],

                enterpriseForm: {
                    enterpriseName: '',
                    address: '',
                    phone: '',
                    leaderName: '',
                    settledTime: new Date()
                },
                enterpriseRule: {
                    enterpriseName: [
                        {
                            required: true,
                            message: '企业名称不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    address: [
                        {
                            required: true,
                            message: '企业地址不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    phone: [
                        {
                            required: true,
                            message: '联系电话不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    legalName: [
                        {
                            required: true,
                            message: '企业法人不能为空!',
                            trigger: 'blur'
                        }
                    ]
                }
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
                                this.$Message.info('添加' + `${res.message}`);
                                this.$refs[name].resetFields();
                            } else {
                                res.flags === 'fail' && this.$Message.error(`${res.message}`);
                            }
                        };
                        // 保存公司信息
                        httpUtil.httpRequestPost('/enterprise/addEnterprise', this.enterpriseForm).then(callback);
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