<style>
    /* 表格相关UI */
    .page-table {
        text-align: center;
    }
</style>
<template>
    <page-frame>
        <!-- 下边的内容会插入到 components/pageFrame.vue 中的 <slot name="slotTable"></slot> -->
        <div class="page-table" slot="slotTable">
            <!-- 加上 :hover-show="true" 鼠标移入, 会显示编辑按钮 -->
            <can-edit-table refs="pageTable" :editIncell="true" :hover-show="true"
                            :columns-list="pageColumns" v-model="pageColumnsData"
                            @on-change="handleChange" @on-cell-change="handleCellChange">
            </can-edit-table>
        </div>
    </page-frame>
</template>
<script>
    import httpUtil from '../../libs/util';
    import pageFrame from '../components/pageFrame';
    import canEditTable from '../components/canEditTable.vue';

    export default {
        data() {
            return {
                surveyId: '',

                pageColumns: [
                    {
                        title: '问题详情',
                        key: 'question',

                    },
                    {
                        title: '题目类型',
                        key: 'answerType',
                    },
                    {
                        title: '原始答案',
                        render: function (h, param) {
                            return h('div',
                                param.row.surveyAnswer ? param.row.surveyAnswer.choiceText : param.row.surveyAnswer
                            );
                        }
                    },


                ],
                pageColumnsData: []
            };
        },

        // 注册组件 {pageFrame 页面模板, canEditTable 表格可编辑组件}
        components: {pageFrame, canEditTable},

        // 页面创建之后执行
        created: function () {
            this.surveyId = this.$route.params.id;
            if (this.surveyId) {
                this.generalGetData();
            } else {
                this.$router.push('/question');
            }
        },

        methods: {
            // 数据修改 -- 整行修改
            handleChange(val, index) {
                this.generalUpdate(JSON.stringify(val[index]), '修改了第 ' + (index + 1) + ' 行的数据');
            },
            // 数据修改 -- 单元格修改
            handleCellChange(val, index, key) {
                this.generalUpdate(JSON.stringify(val[index]), '修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
            },

            // 请求后台 -- 获取基础数据
            generalGetData: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.pageColumnsData = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestPost('/survey/getQueAnswers', {surveyId: this.surveyId}).then(callback);
            },

            // 请求后台 -- 更新操作
            generalUpdate: function (val, message) {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.$Message.success(message);
                        this.generalGetData();
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestPost('/survey/addAnswers', val).then(callback);

            },
        }
    };
</script>