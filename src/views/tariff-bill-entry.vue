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
    <page-frame :pageFrameStyle='frameStyle'>
        <div class="general-form-div" slot="slotForm">
            <Form ref="billForm" :model="billForm" :rules="billRule" :label-width="90">
                <FormItem><h1 class="general-form-title">用户账单录入</h1></FormItem>
                <FormItem label="业务类型" prop="business">
                    <Select v-model="billForm.business" style="width: 300px" @on-change="handleBusinessSelect">
                        <Option v-for="item in businessList"
                                :value="item.key" :key="item.value">{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="标准等级" prop="level">
                    <Select v-model="billForm.level" style="width: 300px" @on-change="handleBusinessLevelSelect">
                        <Option v-for="item in businessLevelList"
                                :value="item.key" :key="item.value">{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="户号" prop="houseNo">
                    <Input v-model="billForm.houseNo" size="large" placeholder="请输入户号"></Input>
                </FormItem>
                <FormItem label="业务单价">
                    <InputNumber v-model="billForm.unitPrice" size="large" readonly></InputNumber>
                </FormItem>
                <FormItem label="使用量" prop="usedTotal">
                    <InputNumber v-model="billForm.usedTotal" size="large" :step="1"
                                 @on-change="handleUsedTotalChange"></InputNumber>
                </FormItem>
                <FormItem label="消费金额">
                    <InputNumber v-model="billForm.billAmount" size="large" readonly></InputNumber>
                </FormItem>
                <FormItem label="操作人" prop="operator">
                    <Select v-model="billForm.operator" style="width: 300px">
                        <Option value="ASSISTANT">业务助理</Option>
                        <Option value="MANAGER">业务经理</Option>
                    </Select>
                </FormItem>
                <FormItem label="账单备注">
                    <Input v-model="billForm.expand" size="large" placeholder="账单备注..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('billForm')">添加</Button>
                    <Button type="ghost" @click="handleReset('billForm')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </page-frame>
</template>
<script>
    import httpUtil from '../libs/util';
    import PageFrame from './components/pageFrame';

    export default {
        data() {
            return {
                // 给模板页设置样式
                frameStyle: {
                    openNames: ['3'],
                },

                // 下拉列表
                businessList: [],
                businessLevelList: [],
                paymentWayList: [],
                paymentStatusList: [],

                // 会提交到后台的标准信息
                billForm: {
                    business: '',
                    level: '',
                    unitPrice: 0,
                    usedTotal: 1,
                    billAmount: 0,
                    houseNo: '',
                    operator: '',
                    expand: '',
                },

                // 用户输入校验
                billRule: {
                    business: [
                        {
                            required: true,
                            message: '业务为必选呦!',
                            trigger: 'change'
                        }
                    ],
                    level: [
                        {
                            required: true,
                            message: '级别也是必选的呦!',
                            trigger: 'change'
                        }
                    ],
                    houseNo: [
                        {
                            required: true,
                            message: '户号不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    operator: [
                        {
                            required: true,
                            message: '操作人不能为空!',
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
            httpUtil.httpRequestGet('/base/getBillEntryBusiness').then(callbackBusiness);

            // 请求后台拿到业务信息
            let callbackPaymentStatus = (res) => {
                if (res.flags === 'success') {
                    this.paymentStatusList = res.data;
                } else {
                    res.flags === 'fail' && this.$Message.error(`${res.message}`);
                }
            };
            httpUtil.httpRequestGet('/base/getPaymentStatus').then(callbackPaymentStatus);

            // 请求后台拿到业务信息
            let callbackPaymentWay = (res) => {
                if (res.flags === 'success') {
                    this.paymentWayList = res.data;
                } else {
                    res.flags === 'fail' && this.$Message.error(`${res.message}`);
                }
            };
            httpUtil.httpRequestGet('/base/getPaymentWay').then(callbackPaymentWay);

        },

        methods: {
            // 选择业务之后,请求后台拿到业务等级
            handleBusinessSelect(business) {
                if (business != null) {
                    let callbackBusinessLevel = (res) => {
                        if (res.flags === 'success') {
                            this.businessLevelList = res.data;
                        } else {
                            res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        }
                    };
                    httpUtil.httpRequestGet('/base/getBusinessLevel', {business: business}).then(callbackBusinessLevel);
                }
            },

            // 选择业务等级之后,获取业务单价
            handleBusinessLevelSelect(level) {
                if (level != null) {
                    let callbackBusinessLevel = (res) => {
                        if (res.flags === 'success') {
                            this.billForm.unitPrice = res.data;
                        } else {
                            res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        }
                    };
                    httpUtil.httpRequestPost('/bill/unitPrice',
                        {
                            business: this.billForm.business,
                            level: this.billForm.level
                        }
                    ).then(callbackBusinessLevel);
                }
            },

            // 使用量改变,消费金额相应改变
            handleUsedTotalChange(usedTotal) {
                this.billForm.billAmount = usedTotal * this.billForm.unitPrice;
            },

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
                        httpUtil.httpRequestPost('/bill/billEntry', this.billForm).then(callback);
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