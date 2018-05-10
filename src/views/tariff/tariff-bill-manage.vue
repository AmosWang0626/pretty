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
                        title: '户号',
                        key: 'houseNo',
                    },
                    {
                        title: '业务类型',
                        key: 'business',
                    },
                    {
                        title: '缴费标准等级',
                        key: 'level',
                    },
                    {
                        title: '缴费单价',
                        key: 'unitPrice',
                    },
                    {
                        title: '使用量',
                        key: 'usedTotal',
                    },
                    {
                        title: '账单金额',
                        key: 'billAmount',
                    },
                    {
                        title: '账单月份',
                        key: 'billMonth',
                    },
                    {
                        title: '账单状态',
                        key: 'billStatus',
                    },
                    {
                        title: '操作',
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
                                            this.payment(params.index);
                                        }
                                    }
                                }, '支付')
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
            // 分页相关 -- 改变页面size
            changePageSize: function (pageSize) {
                this.pageSize = pageSize;
                this.generalGetData();
            },

            payment(index) {
                this.$Modal.info({
                    title: '支付账单',
                    closable: true,
                    content: '<h3>确认支付 <strong>' + this.pageColumnsData[index].billAmount + '</strong> 元整 ?</h3>',

                    okText: '确认支付',
                    onOk: () => {
                        this.$Message.info('支付成功!');
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
                httpUtil.httpRequestGet('/bill/pageBill', {page: this.page, size: this.pageSize}).then(callback);
            }
        }
    };
</script>