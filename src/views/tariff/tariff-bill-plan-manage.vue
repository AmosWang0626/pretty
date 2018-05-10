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
                        title: '用户编号',
                        key: 'memberId',
                    },
                    {
                        title: '应还款日期',
                        key: 'repayDate',
                        render: function (h, param) {
                            return h('div',
                                dateUtil.formatDate(new Date(param.row.repayDate), 'yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'billStatus',
                    },
                    {
                        title: '应缴纳本金',
                        key: 'sumBillAmount',
                    },
                    {
                        title: '应缴纳罚息',
                        key: 'sumLateCharge',
                    },
                    {
                        title: '逾期天数',
                        key: 'overdueDays',
                    },
                    {
                        title: '结清日期',
                        key: 'settleDate',
                        render: function (h, param) {
                            return h('div', param.row.settleDate != null ? dateUtil.formatDate(new Date(param.row.settleDate), 'yyyy-MM-dd hh:mm:ss') : null);
                        }
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
                                            if (this.pageColumnsData[params.index].totalRepayAmount === 0) {
                                                this.$Message.info('账单已结清,无须支付!');
                                            } else {
                                                this.payment(params.index);
                                            }
                                        }
                                    }
                                }, '支付'),
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
                                            this.billDetail(params.index);
                                        }
                                    }
                                }, '账单详情')
                            ]);
                        }
                    }
                ],
                pageColumnsData: [],
                paymentWayList: [],
                billDetailData: '',
                paymentWay: null
            };
        },

        // 注册组件 {pageFrame 页面模板, canEditTable 表格可编辑组件}
        components: {pageFrame, canEditTable},

        // 页面创建之后执行
        created: function () {
            this.generalGetData();

            // 获取支付方式
            let callbackPaymentWay = (res) => {
                if (res.flags === 'success') {
                    this.paymentWayList = res.data;
                } else {
                    res.flags === 'fail' && this.$Message.error(`${res.message}`);
                }
            };
            httpUtil.httpRequestGet('/base/getPaymentWay').then(callbackPaymentWay);
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

            billDetail(index) {
                this.getBillDetail(this.pageColumnsData[index].billNo);

                this.$Modal.info({
                    title: '账单详情',
                    closable: true,
                    render: (h) => {
                        return [
                            h('Card', {
                                props: {
                                    title: '户号: ',
                                    disHover: true,
                                    padding: 6
                                },
                                style: {
                                    marginTop: '10px'
                                }
                            }, this.billDetailData.houseNo),
                            h('Card', {
                                props: {
                                    title: '业务类型: ',
                                    disHover: true,
                                    padding: 6
                                },
                                style: {
                                    marginTop: '10px'
                                }
                            }, this.billDetailData.business),
                            h('Card', {
                                props: {
                                    title: '业务等级: ',
                                    disHover: true,
                                    padding: 6
                                },
                                style: {
                                    marginTop: '10px'
                                }
                            }, this.billDetailData.level),
                            h('Card', {
                                props: {
                                    title: '账单月份: ',
                                    disHover: true,
                                    padding: 6
                                },
                                style: {
                                    marginTop: '10px'
                                }
                            }, this.billDetailData.billMonth),
                            h('Card', {
                                props: {
                                    title: '账单金额: ',
                                    disHover: true,
                                    padding: 6
                                },
                                style: {
                                    marginTop: '10px'
                                }
                            }, this.billDetailData.billAmount),
                            h('Card', {
                                props: {
                                    title: '账单状态: ',
                                    disHover: true,
                                    padding: 6
                                },
                                style: {
                                    marginTop: '10px'
                                }
                            }, this.billDetailData.billStatus),
                        ];
                    }
                });
            },

            payment(index) {
                this.$Modal.confirm({
                    title: '支付',
                    closable: true,
                    render: (h) => {
                        return [
                            h('Input', {
                                props: {
                                    readonly: true,
                                    value: '账单金额 ' + this.pageColumnsData[index].totalRepayAmount + ' 元整（暂仅支持全额支付）',
                                },
                                style: {
                                    marginTop: '10px'
                                }
                            }),
                            h('Select', {
                                props: {
                                    placeholder: '请选择支付方式',
                                    value: this.paymentWay
                                },
                                on: {
                                    'on-change': (value) => {
                                        this.paymentWay = value;
                                    }
                                },
                                style: {
                                    marginTop: '10px'
                                }
                            }, this.paymentWayList.map(function (paymentWay) {
                                return h('Option', {
                                    props: {value: paymentWay.key}
                                }, paymentWay.value);
                            })),
                        ];
                    },
                    okText: '确认支付',
                    onOk: () => {
                        if (this.paymentWay == null) {
                            this.$Message.error('请先选择支付方式呦~~~');
                        } else {
                            this.paymentBill({
                                paymentWay: this.paymentWay,
                                planNo: this.pageColumnsData[index].planNo,
                                paymentAmount: this.pageColumnsData[index].totalRepayAmount
                            });
                        }
                    }
                });
            },

            // 请求后台 -- 获取基础数据
            paymentBill: function (param) {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.$Message.success('账单支付成功!');
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestPost('/bill/paymentBill', param).then(callback);
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
                httpUtil.httpRequestGet('/bill/pageBillPlan', {page: this.page, size: this.pageSize}).then(callback);
            },

            // 请求后台 -- 获取账单详情
            getBillDetail: function (billNo) {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.billDetailData = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/bill/billDetail', {billNo: billNo}).then(callback);
            }
        }
    };
</script>