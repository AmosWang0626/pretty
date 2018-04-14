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
    <page-frame :fatherData='toChildData'>
        <div class="general-form-div" slot="slotForm">
            <Form ref="standardForm" :model="standardForm" :rules="standardRule" :label-width="90">
                <FormItem><h1 class="general-form-title">资费标准添加</h1></FormItem>
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
                        <Option value="PROPERTY_ONE">物业费一级标准</Option>
                        <Option value="PROPERTY_TWO">物业费二级标准</Option>
                        <Option value="PROPERTY_THREE">物业费三级标准</Option>
                        <Option value="PROPERTY_FORE">物业费四级标准</Option>
                        <Option value="SITE_ONE">场地使用费一级标准</Option>
                        <Option value="SITE_TWO">场地使用费二级标准</Option>
                        <Option value="SITE_THREE">场地使用费三级标准</Option>
                        <Option value="SITE_FORE">场地使用费四级标准</Option>
                        <Option value="SITE_FIVE">场地使用费五级标准</Option>
                        <Option value="WATER_LIVE">水费家庭用水标准</Option>
                        <Option value="WATER_COMPANY">水费企业用水标准</Option>
                        <Option value="ELECTRICITY_LIVE">电费家庭用电标准</Option>
                        <Option value="ELECTRICITY_COMPANY">电费企业用电标准</Option>
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
                <FormItem label="生效时间" prop="startTime">
                    <Row>
                        <Col span="12">
                            <DatePicker type="date" placeholder="Select date"
                                        v-model="standardForm.startTime"></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="10">
                            <TimePicker type="time" disabled v-model="standardForm.defaultStart"></TimePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="失效时间" prop="endTime">
                    <Row>
                        <Col span="12">
                            <DatePicker type="date" placeholder="Select date"
                                        v-model="standardForm.endTime"></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="10">
                            <TimePicker type="time" disabled v-model="standardForm.defaultEnd"></TimePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="状态">
                    <i-switch v-model="standardForm.status" size="large">
                        <span slot="open">有效</span>
                        <span slot="close">失效</span>
                    </i-switch>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('standardForm')">添加</Button>
                    <Button type="ghost" @click="handleReset('standardForm')" style="margin-left: 8px">添加</Button>
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
                standardForm: {
                    business: '',
                    level: '',
                    unitPrice: 0.1,
                    overdueRate: 0.001,
                    startTime: '',
                    endTime: '',
                    defaultStart: '00:00:00',
                    defaultEnd: '23:59:59',
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
                    startTime: [
                        {
                            required: true,
                            type: 'date',
                            message: '标准起始时间不能为空!',
                            trigger: 'change'
                        }
                    ],
                    endTime: [
                        {
                            required: true,
                            type: 'date',
                            message: '标准截止时间不能为空!',
                            trigger: 'change'
                        }
                    ]
                },

                toChildData: {
                    activeName: '3-2',
                    openNames: ['3'],
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
                                this.$Message.info('添加' + `${res.message}`);
                            } else {
                                res.flags === 'fail' && this.$Message.error(`${res.message}`);
                            }
                        };
                        // 保存缴费标准信息
                        httpUtil.httpRequestJsonPost('/static/addStandard', this.standardForm).then(callback);
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