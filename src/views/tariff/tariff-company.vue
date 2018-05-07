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
                // 给模板页设置样式
                frameStyle: {
                    openNames: ['3'],
                },

                loading: true,
                page: 1,
                pageSize: 10,
                pageTotal: 0,

                pageColumns: [
                    {
                        title: '公司名称',
                        key: 'name'
                    },
                    {
                        title: '公司类型',
                        key: 'business'
                    },
                    {
                        title: '公司地址',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '注册时间',
                        key: 'createTime',
                        render: function (h, param) {
                            return h('div',
                                dateUtil.formatDate(new Date(param.row.createTime), 'yyyy-MM-dd hh:mm:ss'));
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
                httpUtil.httpRequestGet('/static/pageCompany', {page: this.page, size: this.pageSize}).then(callback);
            }
        }
    };
</script>