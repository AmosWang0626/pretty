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
    <page-frame :pageFrameStyle='frameStyle'>
        <!-- 下边的内容会插入到 components/pageFrame.vue 中的 <slot name="slotTable"></slot> -->
        <div class="page-table" slot="slotTable">
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
                // 给模板页设置样式
                frameStyle: {
                    openNames: ['3'],
                },

                page: 1,
                pageSize: 10,
                pageTotal: 0,

                pageColumns: [
                    {
                        title: '交易编号',
                        key: 'id',
                    },
                    {
                        title: '支付方式',
                        key: 'paymentWay'
                    },
                    {
                        title: '交易金额',
                        key: 'paymentAmount',
                    },
                    {
                        title: '支付状态',
                        key: 'paymentStatus',
                    },
                    {
                        title: '交易时间',
                        key: 'paymentDate',
                        render: function (h, param) {
                            return h('div', param.row.paymentDate != null ? dateUtil.formatDate(new Date(param.row.paymentDate), 'yyyy-MM-dd hh:mm:ss') : null);
                        }
                    },
                    {
                        title: '错误码',
                        key: 'errorCode',
                    },
                    {
                        title: '错误信息',
                        key: 'errorMessage',
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
            // 分页相关 -- 改变页面size
            changePageSize: function (pageSize) {
                this.pageSize = pageSize;
                this.generalGetData();
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
                httpUtil.httpRequestGet('/data/pagePaymentRecord', {
                    page: this.page,
                    size: this.pageSize
                }).then(callback);
            }
        }
    };
</script>