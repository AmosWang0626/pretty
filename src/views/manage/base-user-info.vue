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
            <Form ref="userInfoForm" :model="userInfoForm" :label-width="100">
                <FormItem><h1 class="general-form-title">用户信息</h1></FormItem>
                <FormItem label="手机号" prop="phoneNo">
                    <Input v-model="userInfoForm.phoneNo" style="width: 300px" disabled></Input>
                </FormItem>
                <FormItem label="昵称" prop="nickName">
                    <Input v-model="userInfoForm.nickName" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="userInfoForm.gender" type="button" style="width: 300px">
                        <Radio label="MAN">男</Radio>
                        <Radio label="WOMAN">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="年龄" prop="age">
                    <InputNumber :max="130" :min="1" v-model="userInfoForm.age"></InputNumber>
                </FormItem>
                <FormItem label="婚姻状况" prop="maritalStatus">
                    <Select v-model="userInfoForm.maritalStatus" style="width: 300px">
                        <Option v-for="item in maritalStatusList" :value="item.key" :key="item.value">
                            {{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="注册时间" prop="createTime">
                    <Input v-model="userInfoForm.createTime" style="width: 300px" disabled></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit">修改</Button>
                </FormItem>
            </Form>
        </div>
    </page-frame>
</template>
<script>
    import httpUtil from '../../libs/util';
    import dateUtil from '../../libs/date';
    import PageFrame from '../components/pageFrame';

    export default {
        data() {
            return {
                maritalStatusList: [],

                userInfoForm: {
                    phoneNo: '',
                    nickName: '',
                    gender: '',
                    age: 18,
                    maritalStatus: '',
                    createTime: ''
                }
            };
        },

        // 注册组件
        components: {PageFrame},

        created: function () {
            // 请求后台拿到业务信息
            let callbackBusiness = (res) => {
                if (res.flags === 'success') {
                    this.userInfoForm = res.data;
                    this.userInfoForm.createTime = dateUtil.formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:ss');
                } else {
                    res.flags === 'fail' && this.$Message.error(`${res.message}`);
                }
            };
            httpUtil.httpRequestGet('/passport/getUserInfo').then(callbackBusiness);

            // 请求后台拿到业务信息
            let callbackMaritalStatus = (res) => {
                if (res.flags === 'success') {
                    this.maritalStatusList = res.data;
                } else {
                    res.flags === 'fail' && this.$Message.error(`${res.message}`);
                }
            };
            httpUtil.httpRequestGet('/base/getMaritalStatus').then(callbackMaritalStatus);
        },

        methods: {
            handleSubmit() {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.$Message.info('修改' + `${res.message}`);
                        localStorage.setItem('nickName', this.userInfoForm.nickName);
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                // 修改个人信息
                httpUtil.httpRequestPost('/passport/modifyUserInfo', this.userInfoForm).then(callback);
            }
        }
    };
</script>