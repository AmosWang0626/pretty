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
            <Table stripe border size="large" :columns="pageColumns"
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
    import PageFrame from './components/pageFrame';

    export default {
        data() {
            return {
                page: 1,
                size: 10,
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
                pageData: '',

                toChildData: {
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
                this.page = page;
                this.generalGetData();
            },
            changePageSize: function (size) {
                this.size = size;
                this.generalGetData();
            },

            generalGetData: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.pageData = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/static/pageCompany', {page: this.page, size: this.size}).then(callback);
            }
        }
    };
</script>