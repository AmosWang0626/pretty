<style>
    .layout-content-page {
        margin-top: 15px;
    }

    .page-table {
        text-align: center;
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
    import httpUtil from '../libs/util';
    import PageFrame from './components/pageFrame';

    export default {
        data() {
            return {
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
                        key: 'createTime'
                    }
                ],
                pageColumnsData: [],

                frameStyle: {
                    activeName: '3-3',
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