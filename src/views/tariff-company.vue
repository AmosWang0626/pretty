<style>
    .company {
        padding-top: 3%;
        margin: 0 auto;
        width: 360px;
    }
</style>

<template>
    <div class="company">
        <Form ref="companyForm" :model="companyForm" :rules="companyRule" :label-width="100">
            <FormItem label="业务类型" prop="business">
                <Select v-model="companyForm.business" style="width: 300px">
                    <Option value="WATER">水费</Option>
                    <Option value="ELECTRICITY">电费</Option>
                    <Option value="NETWORK">网费</Option>
                    <Option value="PROPERTY">物业费</Option>
                    <Option value="PARKING">停车费</Option>
                    <Option value="SITE">场地使用费</Option>
                </Select>
            </FormItem>
            <FormItem label="公司名称" prop="name">
                <Input v-model="companyForm.name" placeholder="公司名称" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="省-市-区-街道" prop="city">
                <al-selector v-model="companyForm.city" size="small" style="width: 400px"
                             data-type="name"></al-selector>
            </FormItem>
            <FormItem label="详细地址" prop="address">
                <Input v-model="companyForm.address" placeholder="公司地址" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="联系电话" prop="telephone">
                <Input v-model="companyForm.telephone" placeholder="联系电话" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="组织机构代码" prop="organizationCode">
                <Input v-model="companyForm.organizationCode" placeholder="组织机构代码" style="width: 300px"></Input>
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
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('companyForm')">保存</Button>
                <Button type="ghost" @click="handleReset('companyForm')" style="margin-left: 8px">Cancel</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    /* eslint-disable no-console */
    import myUtil from '../libs/util';

    export default {
        data() {
            return {
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
                            message: '所在省-市-区-街道不能为空!',
                            trigger: 'change'
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
                            message: '组织机构代码不能为空!',
                            trigger: 'blur'
                        }, {
                            type: 'string',
                            len: 10,
                            message: '组织机构代码错误! 10位呦!',
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
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 保存公司信息
                        myUtil.myJsonPost('/static/addCompany', this.companyForm);
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
