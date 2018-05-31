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

                pageColumns: [
                    {
                        title: '问卷编号',
                        key: 'surveyId'
                    },
                    {
                        title: '问卷标题',
                        key: 'title',
                        editable: true
                    },
                    {
                        title: '问卷详情',
                        key: 'description',
                        editable: true
                    },


                    {
                        title: '操作',
                        align: 'center',
                        width: 180,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                                this.payment(params.index);
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        placement: 'top'
                                    },
                                    style: {
                                        margin: '0 5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.generateInvoice(params.row);
                                        }
                                    }
                                }, '答题'),
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
            this.generalGetData();
        },

        methods: {
            // 分页相关 -- 改变页面page
            changePage: function (page) {
                this.page = page;
                this.generalGetData();
            },

            generateInvoice(params) {
                this.$router.push({
                    path: '/answer',
                    name: 'answer',
                    params: {
                        id: JSON.stringify(params.surveyId)
                    }
                });
            },

            // 分页相关 -- 改变页面size
            changePageSize: function (pageSize) {
                this.pageSize = pageSize;
                this.generalGetData();
            },


            // 数据修改 -- 删除操作
            payment(index) {
                this.generalDelete(JSON.stringify(this.pageColumnsData[index].surveyId), '删除了第' + (index + 1) + '行数据');
            },

            // 请求后台 -- 获取基础数据
            generalGetData: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        // this.pageSize = res.data.size;
                        // this.pageTotal = res.data.total;
                        this.pageColumnsData = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/survey/allSurvey').then(callback);
            },


            // 请求后台 -- 删除操作
            generalDelete: function (val, message) {
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
                httpUtil.httpRequestPost('/survey/del', {surveyId: val}).then(callback);
            }
        }
    };
</script>