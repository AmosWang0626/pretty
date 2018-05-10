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
            <Table :loading="loading" stripe border size="large" :columns="pageColumns"
                   :data="pageColumnsData">
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
    import PageFrame from '../components/pageFrame';

    export default {
        data() {
            return {
                loading: true,
                page: 1,
                pageSize: 10,
                pageTotal: 0,

                pageColumns: [
                    {
                        title: '用户编号',
                        key: 'memberId'
                    },
                    {
                        title: '服务类型',
                        key: 'type'
                    },
                    {
                        title: '申请原由',
                        key: 'details',
                        type: 'html'
                    },
                    {
                        title: '状态',
                        key: 'type'
                    },
                    {
                        title: '解决方案',
                        key: 'evaluate'
                    },
                    {
                        title: '申请时间',
                        key: 'createTime',
                        render: function (h, param) {
                            return h('div',
                                dateUtil.formatDate(new Date(param.row.createTime), 'yyyy-MM-dd hh:mm:ss'));
                        }
                    },
                    {
                        title: '处理时间',
                        key: 'detailTime',
                        render: function (h, param) {
                            return h('div',
                                param.row.detailTime == null ? '' :
                                    dateUtil.formatDate(new Date(param.row.detailTime), 'yyyy-MM-dd hh:mm:ss'));
                        }
                    },
                    {
                        title: '解决时间',
                        key: 'endTime',
                        render: function (h, param) {
                            return h('div',
                                param.row.endTime == null ? '' :
                                    dateUtil.formatDate(new Date(param.row.endTime), 'yyyy-MM-dd hh:mm:ss'));
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                }, '详情')
                            ]);
                        }
                    }
                ],
                pageColumnsData: []
            };
        },

        // 注册组件
        components: {PageFrame},

        created: function () {
            this.generalGetData();
        },

        methods: {
            // 分页相关 -- 改变页面page
            changePage: function (page) {
                this.loading = true;
                this.page = page;
                this.generalGetData();
            },
            // 分页相关 -- 改变页面size
            changePageSize: function (pageSize) {
                this.loading = true;
                this.pageSize = pageSize;
                this.generalGetData();
            },

            // 请求后台 -- 获取基础数据
            generalGetData: function () {
                let callback = (res) => {
                    this.loading = false;
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
                httpUtil.httpRequestGet('/service/list', {page: this.page, size: this.pageSize}).then(callback);
            },

            // 显示详情
            showDetail(index) {
                this.$Modal.info({
                    title: 'Property',
                    // 按ESC键 可关闭Modal
                    closable: true,
                    content: `昵称：${this.pageColumnsData[index].nickName}<br>`
                    + `手机号：${this.pageColumnsData[index].phoneNo}<br>`
                    + `注册时间：${dateUtil.formatDate(new Date(this.pageColumnsData[index].createTime), 'yyyy-MM-dd hh:mm:ss')}`
                });
            }
        }
    };
</script>