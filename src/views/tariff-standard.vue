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
                        title: '业务类型',
                        key: 'business'
                    },
                    {
                        title: '业务等级',
                        key: 'level'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '逾期利率',
                        key: 'overdueRate'
                    },
                    {
                        title: '标准生效时间',
                        key: 'startTime'
                    },
                    {
                        title: '标准失效时间',
                        key: 'endTime'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    }
                ],
                pageData: '',

                toChildData: {
                    activeName: '3-1',
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
                    }
                };
                httpUtil.httpRequestGet('/static/pageStandard', {
                    params: {
                        page: this.page,
                        size: this.size
                    }
                }).then(callback);
            }
        }
    };
</script>