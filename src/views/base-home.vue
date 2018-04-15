<style>
    .layout-content-page {
        margin-top: 15px;
    }

    .page-table {
        text-align: center;
    }
</style>
<template>
    <page-frame :fatherData='toChildData'>
        <div class="page-table" slot="slotTable">
            <!-- 表格相关 分别对应两种不同的样式 -->
            <Table :loading="loading" stripe border size="large" :columns="pageColumns"
                   :data="pageData.rows">
            </Table>
            <Page class="layout-content-page" :total="pageData.total"
                  :page-size="pageData.size" show-total show-sizer show-elevator
                  @on-change="changePage" @on-page-size-change="changePageSize"></Page>
            <!--<Page class="layout-content-page" :current="pageData.page"-->
            <!--:total="pageData.total" simple @on-change="changePage"></Page>-->
        </div>
    </page-frame>
</template>
<script>
    import httpUtil from '../libs/util';
    import dateUtil from '../libs/date';
    import PageFrame from './components/pageFrame';

    export default {
        data() {
            return {
                loading: true,
                page: 1,
                size: 10,
                pageColumns: [
                    {
                        title: '用户编号',
                        key: 'memberId'
                    },
                    {
                        title: '手机号',
                        key: 'phoneNo'
                    },
                    {
                        title: '昵称',
                        key: 'nickName'
                    },
                    {
                        title: '注册时间',
                        key: 'createTime'
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
                                            this.show(params.index);
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                pageData: '',

                toChildData: {
                    activeName: '3-9',
                    openNames: ['3'],
                }
            };
        },

        // 注册组件
        components: {PageFrame},

        created: function () {
            this.generalGetData();
        },

        methods: {
            show(index) {
                this.$Modal.info({
                    title: 'Property',
                    // 按ESC键 可关闭Modal
                    closable: true,
                    content: `昵称：${this.pageData.rows[index].nickName}<br>`
                    + `手机号：${this.pageData.rows[index].phoneNo}<br>`
                    + `注册时间：${dateUtil.formatDate(new Date(this.pageData.rows[index].createTime), 'yyyy-MM-dd hh:mm:ss')}`
                });
            },
            changePage: function (page) {
                this.loading = true;
                this.page = page;
                this.generalGetData();
            },
            changePageSize: function (size) {
                this.loading = true;
                this.size = size;
                this.generalGetData();
            },

            generalGetData: function () {
                let callback = (res) => {
                    this.loading = false;
                    if (res.flags === 'success') {
                        this.pageData = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/passport/page', {page: this.page, size: this.size}).then(callback);
            }
        }
    };
</script>