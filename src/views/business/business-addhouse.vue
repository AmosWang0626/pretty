<style>
    .general-form-title {
        text-align: center;
    }

    .article-form-div {
        width: 100vh;
        height: 100vh;
    }
</style>
<template>
    <page-frame>
        <div class="article-form-div" slot="slotForm">
            <Form ref="businessForm" :model="businessForm" :rules="businessRule" :label-width="90">
                <FormItem><h1 class="general-form-title">添加房源</h1></FormItem>
                <FormItem label="房屋编号" prop="houseNo">
                    <Input v-model="businessForm.houseNo" size="large" placeholder="房屋编号" width="300px"></Input>
                </FormItem>
                <FormItem label="房屋标题" prop="name">
                    <Input v-model="businessForm.name" size="large" placeholder="请输入标题" width="300px"></Input>
                </FormItem>

                <FormItem label="图片上传">
                    <Upload action="/property/file/upload/"
                            name="file"
                            type="drag"
                            :on-success="uploadSuccess"
                            :headers="header">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>拖拽上传或选择文件上传</p>
                        </div>
                    </Upload>
                    {{this.businessForm.img}}
                </FormItem>

                <FormItem label="房屋类型" prop="type">
                    <Select v-model="businessForm.type" style="width:200px">
                        <Option value="HOUSE">居住</Option>
                        <Option value="OFFICE" >办公</Option>
                        <Option value="OTHER" >其他</Option>
                    </Select>
                </FormItem>

                <FormItem label="房屋面积" prop="area">
                    <Input v-model="businessForm.area" size="large" placeholder="请输入房屋总面积" width="300px"></Input>
                </FormItem>

                <FormItem label="房屋价格" prop="rent">
                    <Input v-model="businessForm.rent" size="large" placeholder="请输入房屋总价格" width="300px"></Input>
                </FormItem>

                <FormItem label="房屋地址" prop="address">
                    <Input v-model="businessForm.address" size="large" placeholder="请输入房屋地址" width="300px"></Input>
                </FormItem>

                <FormItem label="房屋状态" prop="rentStatus">
                    <Select v-model="businessForm.rentStatus" style="width:200px">
                        <Option value="UN_RENT">未租出</Option>
                        <Option value="RENT_ED" >已租出</Option>
                        <Option value="RENT_ING">租售中</Option>
                        <Option value="RENT_INVALID" >房屋租售失效</Option>
                    </Select>
                </FormItem>

                <FormItem label="房屋详情" prop="details">
                    <quill-editor v-model='businessForm.details'
                                   style="width: 750px;height: 250px;margin-bottom: 100px;"></quill-editor>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit('businessForm')">添加</Button>
                    <Button type="ghost" @click="handleReset('businessForm')" style="margin-left: 8px">重置</Button>
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
                header: {
                    token: localStorage.getItem('token'),
                    rolesId: localStorage.getItem('rolesId')
                },
                // 会提交到后台的标准信息
                businessForm: {
                    area: '',
                    rent: '',
                    address: '',
                    img: '',
                    houseNo: ''
                },

                // 用户输入校验
                businessRule: {
                    area: [
                        {
                            required: true,
                            message: '面积不能为空呦!',
                            trigger: 'blur'
                        }

                    ],
                    address: [
                        {
                            required: true,
                            message: '地址也不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    houseNo: [
                        {
                            required: true,
                            message: '房屋编号也不能为空!',
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
                            } else {
                                res.flags === 'fail' && this.$Message.error(`${res.message}`);
                            }
                        };
                        // 保存缴费标准信息
                        httpUtil.httpRequestPost('/rent/add', this.businessForm).then(callback);
                    } else {
                        this.$Message.error('请先确认输入信息格式~~~');
                    }
                });
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },

            uploadSuccess: function (res) {
                if (res && res.respCode === '1000') {
                    this.$Message.success(res.respMsg);
                    this.businessForm.img = res.body;
                } else {
                    this.$Message.error('上传图片失败');
                }
            }
        }
    };
</script>