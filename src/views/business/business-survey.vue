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
            <Form ref="surveyForm" :model="surveyForm" :rules="surveyRule" :label-width="90">
                <FormItem><h1 class="general-form-title">问卷编辑</h1></FormItem>
                <FormItem label="问卷编号" prop="surveyId">
                    <Input v-model="surveyForm.surveyId" size="large" placeholder="问卷编号" width="300px"></Input>
                </FormItem>
                <FormItem label="问卷标题" prop="title">
                    <Input v-model="surveyForm.title" size="large" placeholder="问卷标题" width="300px"></Input>
                </FormItem>
                <FormItem label="问卷详情描述" prop="description">
                    <Input v-model="surveyForm.description" size="large" placeholder="问卷详情描述" width="300px"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="surveySubmit('surveyForm')">添加问卷</Button>
                    <Button type="ghost" @click="surveyReset('surveyForm')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>

            <Form ref="surveyQuesForm" :model="surveyQuesForm" :rules="surveyQuesRule" :label-width="90">
                <FormItem><h1 class="general-form-title">问题编辑</h1></FormItem>
                <FormItem label="问卷编号" prop="surveyId">
                    <Input v-model="surveyQuesForm.surveyId" size="large" placeholder="问卷编号" width="300px"></Input>
                </FormItem>

                <FormItem label="问题类型" prop="answerType">
                    <Select v-model="surveyQuesForm.answerType" style="width:200px">
                        <Option value="问答题">问答题</Option>
                        <Option value="选择题">选择题</Option>
                    </Select>
                </FormItem>
                <FormItem label="问题内容" prop="question">
                    <Input v-model="surveyQuesForm.question" size="large" placeholder="问题内容" width="300px"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="surveyQuesSubmit('surveyQuesForm')">添加问题</Button>
                    <Button type="ghost" @click="surveyReset('surveyQuesForm')" style="margin-left: 8px">重置</Button>
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
                surveyForm: {
                    surveyId: '',
                    title: '',
                    description: ''
                },

                // 会提交到后台的标准信息
                surveyQuesForm: {
                    surveyId: '',
                    answerType: '',
                    question: ''
                },

                // 用户输入校验
                surveyRule: {
                    surveyId: [
                        {
                            required: true,
                            message: '编号不能为空呦!',
                            trigger: 'blur'
                        }
                    ]
                },

                // 用户输入校验
                surveyQuesRule: {
                    surveyId: [
                        {
                            required: true,
                            message: '编号不能为空呦!',
                            trigger: 'blur'
                        }
                    ]
                }
            };
        },

        // 注册组件
        components: {PageFrame},

        methods: {
            surveySubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let callback = (res) => {
                            if (res.flags === 'success') {
                                this.$Message.info('添加' + `${res.message}`);
                                this.surveyQuesForm.surveyId = this.surveyForm.surveyId;
                            } else {
                                res.flags === 'fail' && this.$Message.error(`${res.message}`);
                            }
                        };
                        // 保存缴费标准信息
                        httpUtil.httpRequestPost('/survey/addSurvey', this.surveyForm).then(callback);
                    } else {
                        this.$Message.error('请先确认输入信息格式~~~');
                    }
                });
            },
            surveyReset(name) {
                this.$refs[name].resetFields();
            },

            surveyQuesSubmit(name) {
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
                        httpUtil.httpRequestPost('/survey/addQues', this.surveyQuesForm).then(callback);
                    } else {
                        this.$Message.error('请先确认输入信息格式~~~');
                    }
                });
            }
        }
    };
</script>