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
            <Form ref="equipment" :model="equipment" :rules="equipmentRule" :label-width="100">
                <FormItem><h1 class="general-form-title">添加设备</h1></FormItem>
                <FormItem label="设备类型" prop="equipmentName">
                    <Input v-model="equipment.name" placeholder="设备类型" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="设备数量" prop="amount">
                    <Input v-model="equipment.amount" placeholder="设备数量" style="width: 300px"></Input>
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

                equipment: {
                    equipmentName: '',
                    amount: '',
                },
                equipmentRule: {
                    name: [
                        {
                            required: true,
                            message: '设备类型不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    amount: [
                        {
                            required: true,
                            message: '设备数量不能为空!',
                            trigger: 'blur'
                        }
                    ],
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
                        httpUtil.httpRequestPost('/enterprise/addEnterprise', this.equipment).then(callback);
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