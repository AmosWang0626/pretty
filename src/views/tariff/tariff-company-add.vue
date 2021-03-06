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
            <Form ref="companyForm" :model="companyForm" :rules="companyRule" :label-width="100">
                <FormItem><h1 class="general-form-title">注册公司</h1></FormItem>
                <FormItem label="业务类型" prop="business">
                    <Select v-model="companyForm.business" style="width: 300px">
                        <Option v-for="item in businessList"
                                :value="item.key" :key="item.value">{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="公司名称" prop="name">
                    <Input v-model="companyForm.name" placeholder="公司名称" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="省-市-区-街道" prop="city">
                    <al-selector v-model="companyForm.city" size="small" data-type="name"
                                 style="width: 400px"></al-selector>
                </FormItem>
                <FormItem label="详细地址" prop="address">
                    <Input v-model="companyForm.address" placeholder="公司地址" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="联系电话" prop="telephone">
                    <Input v-model="companyForm.telephone" placeholder="联系电话" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="社会信用代码" prop="organizationCode">
                    <Input v-model="companyForm.organizationCode" placeholder="社会信用代码" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="企业法人" prop="legalName">
                    <Input v-model="companyForm.legalName" placeholder="企业法人" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="成立时间" prop="establish">
                    <Input v-model="companyForm.establish" placeholder="成立时间" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="注册资金" prop="registerCapital">
                    <Input v-model="companyForm.registerCapital" placeholder="注册资金" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="状态">
                    <i-switch v-model="companyForm.status" size="large">
                        <span slot="open">有效</span>
                        <span slot="close">失效</span>
                    </i-switch>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('companyForm')">添加</Button>
                    <Button type="ghost" @click="handleReset('companyForm')" style="margin-left: 8px">取消</Button>
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

                companyForm: {
                    business: '',
                    name: '',
                    city: [],
                    address: '',
                    telephone: '',
                    organizationCode: '',
                    legalName: '',
                    establish: '',
                    registerCapital: '',
                    status: true,
                },
                companyRule: {
                    business: [
                        {
                            required: true,
                            message: '业务为必选呦!',
                            trigger: 'change'
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: '公司名称不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    city: [
                        {
                            required: true,
                            type: 'array',
                            min: 4,
                            message: '所在省-市-区-街道不能为空!',
                            trigger: 'on-change'
                        }
                    ],
                    address: [
                        {
                            required: true,
                            message: '详细地址不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    telephone: [
                        {
                            required: true,
                            message: '联系电话不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    organizationCode: [
                        {
                            required: true,
                            message: '社会信用代码不能为空!',
                            trigger: 'blur'
                        }, {
                            type: 'string',
                            len: 18,
                            message: '社会信用代码错误! 18位呦!',
                            trigger: 'blur'
                        }
                    ],
                    legalName: [
                        {
                            required: true,
                            message: '企业法人不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    establish: [
                        {
                            required: true,
                            message: '成立时间不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    registerCapital: [
                        {
                            required: true,
                            message: '注册资金不能为空!',
                            trigger: 'blur'
                        }
                    ]
                }
            };
        },

        // 注册组件
        components: {PageFrame},

        created: function () {
            // 请求后台拿到业务信息
            let callbackBusiness = (res) => {
                if (res.flags === 'success') {
                    this.businessList = res.data;
                } else {
                    res.flags === 'fail' && this.$Message.error(`${res.message}`);
                }
            };
            httpUtil.httpRequestGet('/base/getBusiness').then(callbackBusiness);
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
                        // 保存公司信息
                        httpUtil.httpRequestPost('/static/addCompany', this.companyForm).then(callback);
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