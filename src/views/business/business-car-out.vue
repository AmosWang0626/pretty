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
            <Table stripe border size="large" ref="table" :key="pageColumns.id" :columns="pageColumns"
                   :data="pageColumnsData"></Table>
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
                        title: 'ID',
                        key: 'id',
                    },
                    {
                        title: '进入时间',
                        key: 'comeDate',
                        render: function (h, param) {
                            return h('div', param.row.comeDate != null ? dateUtil.formatDate(new Date(param.row.comeDate), 'yyyy-MM-dd hh:mm:ss') : null);
                        }
                    },
                    {
                        title: '离开时间',
                        key: 'leaveDate',
                        render: function (h, param) {
                            return h('div', param.row.leaveDate != null ? dateUtil.formatDate(new Date(param.row.leaveDate), 'yyyy-MM-dd hh:mm:ss') : null);
                        }
                    },

                    {
                        title: '类型',
                        key: 'carType',
                    },

                    {
                        title: '车牌号',
                        key: 'carNo',
                    },
                    {
                        title: '费用',
                        key: 'rent',
                    },
                    {
                        title: '收费',
                        align: 'center',
                        width: 100,
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
                                            this.generateInvoice(params.row);
                                        }
                                    }
                                }, '收费')
                            ]);
                        }
                    }
                ],
                pageColumnsData: []
            };
        },

        // 注册组件 {pageFrame 页面模板, canEditTable 表格可编辑组件}
        components: {pageFrame, canEditTable},

        created: function () {
            this.generalGetData();
        },

        methods: {
            // 分页相关 -- 改变页面page
            changePage: function (page) {
                this.page = page;
                this.generalGetData();
            },
            // 跳转支付
            generateInvoice(params) {
                this.$router.push({
                    path: '/carEntry',
                    name: 'carEntry',
                    params: {
                        id: JSON.stringify(params.id),
                        comeDate: JSON.stringify(params.comeDate)
                    }
                });
            },
            // 请求后台 -- 获取基础数据
            generalGetData: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.pageSize = res.data.size;
                        this.pageTotal = res.data.total;
                        this.pageColumnsData = res.data.rows;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/car/pagecar', {page: this.page, size: this.pageSize}).then(callback);
            },
            // 分页相关 -- 改变页面size
            changePageSize: function (pageSize) {
                this.pageSize = pageSize;
                this.generalGetData();
            }
        }
    };
</script>