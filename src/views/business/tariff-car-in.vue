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
            <Form ref="carComeInForm" :model="carComeInForm" :rules="carComeInRule" :label-width="90">
                <FormItem><h1 class="general-form-title">车辆进入</h1></FormItem>
                <FormItem label="车牌号" prop="carNo">
                    <Input v-model="carComeInForm.carNo" size="large" placeholder="请输入车牌号" width="300px"></Input>
                </FormItem>
                <FormItem label="车辆类型" prop="carType">
                    <Input v-model="carComeInForm.carType" size="large" placeholder="请输入车辆类型" width="300px"></Input>
                </FormItem>
                <FormItem label="生效时间" prop="comeDate">
                    <DatePicker type="datetime" size="large" placeholder="进入时间" width="300px"
                                v-model="carComeInForm.comeDate"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('carComeInForm')">添加</Button>
                    <Button type="ghost" @click="handleReset('carComeInForm')" style="margin-left: 8px">添加</Button>
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
                carComeInForm: {
                    carNo: '',
                    carType: '',
                    comeDate: new Date()
                },

                // 用户输入校验
                carComeInRule: {
                    carNo: [
                        {
                            required: true,
                            message: '车牌号不能为空呦!',
                            trigger: 'blur'
                        }
                    ],
                    carType: [
                        {
                            required: true,
                            message: '车辆类型也不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    comeDate: [
                        {
                            required: true,
                            type: 'date',
                            message: '车辆进入时间不能为空!',
                            trigger: 'change'
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
                            } else {
                                res.flags === 'fail' && this.$Message.error(`${res.message}`);
                            }
                        };
                        // 保存缴费标准信息
                        httpUtil.httpRequestPost('/car/comeIn', this.carComeInForm).then(callback);
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