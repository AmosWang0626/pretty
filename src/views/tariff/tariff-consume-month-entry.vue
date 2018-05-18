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
            <Form ref="billMonthForm" :model="billMonthForm" :rules="billMonthRule" :label-width="90">
                <FormItem><h1 class="general-form-title">录入上月消费</h1></FormItem>
                <FormItem label="房屋编号" prop="houseNo">
                    <Input v-model="billMonthForm.houseNo" size="large" placeholder="请输入房屋编号"
                           style="width: 300px"></Input>
                </FormItem>
                <FormItem label="用水量">
                    <InputNumber v-model="billMonthForm.water" size="large"></InputNumber>
                </FormItem>
                <FormItem label="用电量">
                    <InputNumber v-model="billMonthForm.electric" size="large"></InputNumber>
                </FormItem>
                <FormItem label="网络状态">
                    <Switch :value="billMonthForm.network" size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </Switch>
                </FormItem>
                <FormItem label="操作人" prop="operator">
                    <Select v-model="billMonthForm.operator" style="width: 300px">
                        <Option value="ASSISTANT">业务助理</Option>
                        <Option value="MANAGER">业务经理</Option>
                    </Select>
                </FormItem>
                <FormItem label="账单备注">
                    <Input v-model="billMonthForm.expand" size="large" placeholder="账单备注..."
                           style="width: 300px"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('billMonthForm')">添加</Button>
                    <Button type="ghost" @click="handleReset('billMonthForm')" style="margin-left: 8px">重置</Button>
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
                // 会提交到后台的标准信息
                billMonthForm: {
                    houseNo: '',
                    water: 0,
                    electric: 0,
                    network: true,
                    operator: '',
                    expand: '',
                },

                // 用户输入校验
                billMonthRule: {
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
                        httpUtil.httpRequestPost('/bill/monthConsumeConfirm', this.billMonthForm).then(callback);
                        console.log(JSON.stringify(this.billMonthForm), '123');
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