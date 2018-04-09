<style>
    .standard {
        padding-top: 5%;
        margin: 0 auto;
        width: 360px;
    }
</style>

<template>
    <div class="standard">
        <Form ref="standardForm" :model="standardForm" :rules="standardRule" :label-width="90">
            <FormItem label="业务类型" prop="business">
                <Select v-model="standardForm.business" style="width: 300px">
                    <Option value="WATER">水费</Option>
                    <Option value="ELECTRICITY">电费</Option>
                    <Option value="NETWORK">网费</Option>
                    <Option value="PROPERTY">物业费</Option>
                    <Option value="PARKING">停车费</Option>
                    <Option value="SITE">场地使用费</Option>
                </Select>
            </FormItem>
            <FormItem label="标准等级" prop="level">
                <Select v-model="standardForm.level" style="width: 300px">
                    <Option value="ONE">一级标准</Option>
                    <Option value="TWO">二级标准</Option>
                    <Option value="THREE">三级标准</Option>
                </Select>
            </FormItem>
            <FormItem label="缴费单价">
                <InputNumber :max="1000" :min="0" :step="0.1"
                             v-model="standardForm.unitPrice"></InputNumber>
            </FormItem>
            <FormItem label="逾期利率">
                <InputNumber :max="0.1" :min="0" :step="0.0005"
                             v-model="standardForm.overdueRate"></InputNumber>
            </FormItem>
            <FormItem label="生效时间" prop="startDate">
                <Row style="width: 300px">
                    <Col span="11">
                        <DatePicker type="date" placeholder="Select date" v-model="standardForm.startDate"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <TimePicker type="time" placeholder="Select time" v-model="standardForm.startTime"
                                    disabled></TimePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="失效时间" prop="endDate">
                <Row style="width: 300px">
                    <Col span="11">
                        <DatePicker type="date" placeholder="Select date" v-model="standardForm.endDate"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <TimePicker type="time" placeholder="Select time" v-model="standardForm.endTime"
                                    disabled></TimePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="状态">
                <i-switch v-model="standardForm.status" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('standardForm')">Submit</Button>
                <Button type="ghost" @click="handleReset('standardForm')" style="margin-left: 8px">Cancel</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import myUtil from '../libs/util';

    export default {
        data() {
            return {
                standardForm: {
                    business: '',
                    level: '',
                    unitPrice: 0.1,
                    overdueRate: 0.001,
                    startDate: '',
                    endDate: '',
                    startTime: '00:00:00',
                    endTime: '23:59:59',
                    status: true,
                },
                standardRule: {
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
                    startDate: [
                        {
                            required: true,
                            type: 'date',
                            message: '标准起始时间不能为空!',
                            trigger: 'change'
                        }
                    ],
                    endDate: [
                        {
                            required: true,
                            type: 'date',
                            message: '标准截止时间不能为空!',
                            trigger: 'change'
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
                        myUtil.myJsonPost('/standard/add', this.standardForm);
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
