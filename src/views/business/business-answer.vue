<style>
    /* 表格相关UI */
    .page-table {
        text-align: center;
    }

    /* 表格分页相关UI */
    .layout-content-page {
        margin-top: 15px;
    }
</style>
<template>
    <page-frame>
        <!-- 下边的内容会插入到 components/pageFrame.vue 中的 <slot name="slotTable"></slot> -->
        <div class="page-table" slot="slotTable">
            <!-- 加上 :hover-show="true" 鼠标移入, 会显示编辑按钮 -->
            <Table stripe border size="large"
                   :columns="pageColumns" :data="pageColumnsData">
            </Table>
            <!-- 两种不同风格的分页样式 -->
            <Page class="layout-content-page" :page-size="pageSize"
                  :total="pageTotal" show-total show-sizer show-elevator
                  @on-change="changePage" @on-page-size-change="changePageSize"></Page>
            <!--<Page class="layout-content-page" :total="pageData.total" :current="pageData.page"
                  @on-change="changePage" simple></Page>-->
        </div>
    </page-frame>
</template>
<script>
    import httpUtil from '../../libs/util';
    import dateUtil from '../../libs/date';
    import pageFrame from '../components/pageFrame';
    import canEditTable from '../components/canEditTable.vue';

    export default {
        data() {
            return {
                page: 1,
                pageSize: 10,
                pageTotal: 0,
                surveyId: '',

                pageColumns: [

                    {
                        title: '问题详情',
                        key: 'question',

                    },
                    {
                        title: '题目类型',
                        key: 'answerType',
                        editable: true
                    },
                    {
                        title: '答案编辑',
                        key: 'choiceText',
                        editable: true
                    },

                    {
                        title: '操作',
                        key: 'action',
                        width: 220,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showDetail(params.index);
                                        }
                                    }
                                }, '答题')

                            ]);
                        }
                    }
                ],
                pageColumnsData: []
            };
        },

        // 注册组件 {pageFrame 页面模板, canEditTable 表格可编辑组件}
        components: {pageFrame, canEditTable},

        // 页面创建之后执行
        created: function () {
            this.surveyId = this.$route.params.id;
            // this.generalGetData();
        },

        methods: {
            // 分页相关 -- 改变页面page
            changePage: function (page) {
                this.page = page;
                this.generalGetData();
            },
            // 分页相关 -- 改变页面size
            changePageSize: function (pageSize) {
                this.pageSize = pageSize;
                this.generalGetData();
            },

            // 请求后台 -- 获取基础数据
            generalGetData: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        // this.pageSize = res.data.size;
                        // this.pageTotal = res.data.total;
                        this.pageColumnsData = res.data.surveyDataList;
                        console.info(JSON.stringify(res.data));
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestPost('/survey/getQuestion', {surveyId: this.surveyId}).then(callback);
            },



        }
    };
</script>