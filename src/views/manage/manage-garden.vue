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
            <Layout>
                <Content>
                    <div class="frame-div">
                        <Carousel autoplay loop>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/1111.jpg"/>
                            </CarouselItem>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/2222.jpg"/>
                            </CarouselItem>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/3333.jpg"/>
                            </CarouselItem>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/4444.jpg"/>
                            </CarouselItem>
                            <CarouselItem class="frame-carousel-item">
                                <img src="http://112.74.57.49:88/img/5555.jpg"/>
                            </CarouselItem>
                        </Carousel>
                    </div>
                </Content>
                <Form ref="enterpriseForm" :model="enterpriseForm" :rules="enterpriseRule" :label-width="100">
                    <FormItem><h1 class="general-form-title">添加企业</h1></FormItem>
                    <FormItem label="公司名称" prop="enterpriseName">
                        <Input v-model="enterpriseForm.name" placeholder="公司名称" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="企业地址" prop="address">
                        <Input v-model="enterpriseForm.address" placeholder="公司地址" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="联系电话" prop="telephone">
                        <Input v-model="enterpriseForm.phone" placeholder="联系电话" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="企业法人" prop="legalName">
                        <Input v-model="enterpriseForm.leaderName" placeholder="企业法人" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="入驻时间" prop="establish">
                        <Input v-model="enterpriseForm.settledTime" placeholder="成立时间" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('companyForm')">添加</Button>
                        <Button type="ghost" @click="handleReset('companyForm')" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </Layout>
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

                enterpriseForm: {
                    enterpriseName: '',
                    address: '',
                    phone: '',
                    leaderName: '',
                    settledTime: '',
                },
                enterpriseRule: {
                    name: [
                        {
                            required: true,
                            message: '企业名称不能为空!',
                            trigger: 'blur'
                        }
                    ],
                    address: [
                        {
                            required: true,
                            message: '企业地址不能为空!',
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
                            message: '入驻时间不能为空!',
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
                        httpUtil.httpRequestPost('/enterprise/addEnterprise', this.enterpriseForm).then(callback);
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