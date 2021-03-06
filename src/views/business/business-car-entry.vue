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
            <Form ref="consumeForm" :model="consumeForm" :rules="consumeRule" :label-width="90">
                <FormItem><h1 class="general-form-title">停车费录入</h1></FormItem>
                <FormItem label="标准等级" prop="level">
                    <Select v-model="consumeForm.level" style="width: 300px" @on-change="handleBusinessLevelSelect">
                        <Option v-for="item in businessLevelList"
                                :value="item.key" :key="item.key">{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="消费单价">
                    <InputNumber v-model="consumeForm.unitPrice" size="large" readonly></InputNumber>
                </FormItem>
                <FormItem label="离开时间" prop="leaveDate">
                    <DatePicker type="datetime" size="large" placeholder="进入时间" width="300px"
                                v-model="consumeForm.leaveDate" @on-change="handleUsedTotalChange"></DatePicker>
                </FormItem>
                <FormItem label="使用量" prop="usedTotal">
                    <InputNumber v-model="consumeForm.usedTotal" size="large" readonly></InputNumber>
                </FormItem>
                <FormItem label="消费金额">
                    <InputNumber v-model="consumeForm.consumeAmount" size="large" readonly></InputNumber>
                </FormItem>
                <FormItem label="支付方式" prop="paymentWay">
                    <Select v-model="consumeForm.paymentWay" style="width: 300px">
                        <Option v-for="item in paymentWayList"
                                :value="item.key" :key="item.value">{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="支付人编号">
                    <InputNumber v-model="consumeForm.memberId" size="large" :step="1"></InputNumber>
                </FormItem>
                <FormItem label="操作人" prop="operator">
                    <Select v-model="consumeForm.operator" style="width: 300px">
                        <Option value="ASSISTANT">业务助理</Option>
                        <Option value="MANAGER">业务经理</Option>
                    </Select>
                </FormItem>
                <FormItem label="消费备注" prop="consumeExpand">
                    <Input v-model="consumeForm.consumeExpand" size="large" placeholder="消费备注 ---> 车牌号等"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('consumeForm')">添加</Button>
                    <Button type="ghost" @click="handleReset('consumeForm')" style="margin-left: 8px">重置</Button>
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
                businessLevelList: [],
                paymentWayList: [],

                // 会提交到后台的标准信息
                consumeForm: {
                    id: '',
                    business: 'PARKING',
                    level: '',
                    unitPrice: 0.1,
                    comeDate: null,
                    leaveDate: new Date(),
                    usedTotal: 1,
                    consumeAmount: 0,
                    rent: 0,
                    operator: '',
                    paymentWay: '',
                    memberId: 9999,
                    consumeExpand: '',
                },

                // 用户输入校验
                consumeRule: {
                    level: [
                        {
                            required: true,
                            message: '级别也是必选的呦!',
                            trigger: 'change'
                        }
                    ],
                    paymentWay: [
                        {
                            required: true,
                            message: '支付方式为必选呦!',
                            trigger: 'change'
                        }
                    ],
                    paymentStatus: [
                        {
                            required: true,
                            message: '支付状态也是必选的呦!',
                            trigger: 'change'
                        }
                    ],
                    operator: [
                        {
                            required: true,
                            message: '操作人不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    consumeExpand: [
                        {
                            required: true,
                            message: '消费备注必填哟!',
                            trigger: 'blur'
                        }
                    ]
                },

            };
        },

        // 注册组件
        components: {PageFrame},

        created: function () {
            this.getNeedPaymentData();
            this.handleUsedTotalChange();
            this.getBaseDate();
        },

        methods: {
            // 获取基础数据
            getBaseDate: function () {
                // 选择业务之后,请求后台拿到业务等级
                let callbackBusinessLevel = (res) => {
                    if (res.flags === 'success') {
                        this.businessLevelList = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                httpUtil.httpRequestGet('/base/getBusinessLevel', {business: 'PARKING'}).then(callbackBusinessLevel);

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

            // 选择业务等级之后,获取业务单价
            handleBusinessLevelSelect(level) {
                if (level != null) {
                    let callbackBusinessLevel = (res) => {
                        if (res.flags === 'success') {
                            this.consumeForm.unitPrice = res.data;
                            this.handleUsedTotalChange();
                        } else {
                            res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        }
                    };
                    httpUtil.httpRequestPost('/bill/unitPrice',
                        {
                            business: this.consumeForm.business,
                            level: this.consumeForm.level
                        }
                    ).then(callbackBusinessLevel);
                }
            },

            // 使用量改变,消费金额相应改变
            handleUsedTotalChange: function () {
                let usedTotal = Math.ceil((this.consumeForm.leaveDate.getTime() - this.consumeForm.comeDate) / 3600000);
                this.consumeForm.usedTotal = usedTotal;
                this.consumeForm.consumeAmount = usedTotal * this.consumeForm.unitPrice;
            },

            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let callback = (res) => {
                            if (res.flags === 'success') {
                                this.$Message.info('支付' + `${res.message}`);
                                this.paymentSuccess();
                            } else {
                                res.flags === 'fail' && this.$Message.error(`${res.message}`);
                            }
                        };
                        // 保存缴费标准信息
                        httpUtil.httpRequestPost('/bill/consumeConfirm', this.consumeForm).then(callback);
                    } else {
                        this.$Message.error('请先确认输入信息格式~~~');
                    }
                });
            },

            handleReset(name) {
                this.$refs[name].resetFields();
            },

            // 支付成功, 给用户停车信息销账
            paymentSuccess: function () {
                this.consumeForm.rent = this.consumeForm.consumeAmount;
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.$router.push('/carOut');
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                httpUtil.httpRequestPost('/car/rentCar', this.consumeForm).then(callback);
            },

            // 从上个页面传入的数据
            getNeedPaymentData() {
                this.consumeForm.id = this.$route.params.id;
                this.consumeForm.comeDate = this.$route.params.comeDate;
            }
        }
    };
</script>