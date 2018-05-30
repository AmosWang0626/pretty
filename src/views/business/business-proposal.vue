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
            <!-- 加上 :hover-show="true" 鼠标移入, 会显示编辑按钮 -->
            <can-edit-table refs="pageTable" :editIncell="true" :hover-show="true"
                            :columns-list="pageColumns" v-model="pageColumnsData" @on-delete="handleDeleteChange"
                            @on-change="handleChange" @on-cell-change="handleCellChange">
            </can-edit-table>
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
                        title: '意见主旨',
                        key: 'title',

                    },
                    {
                        title: '业主名称',
                        key: 'name',

                    },

                    {
                        title: '联系电话',
                        key: 'phone',
                    },

                    {
                        title: '详情',
                        key: 'text',
                        type: 'html'
                    },
                    {
                        title: '查看',
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
                                            this.showDetail(params.index);
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    },

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
                httpUtil.httpRequestGet('/proposal/pageproposal', {page: this.page, size: this.pageSize}).then(callback);
            },
            // 分页相关 -- 改变页面size
            changePageSize: function (pageSize) {
                this.pageSize = pageSize;
                this.generalGetData();
            },

            //
            showDetail(index) {
                this.$Modal.info({
                    title: '意见建议',
                    // 按ESC键 可关闭Modal
                    closable: true,
                    content: `业主名称：${this.pageColumnsData[index].name}<br>`
                    + `手机号：${this.pageColumnsData[index].phone}<br>`
                    + `主旨：${this.pageColumnsData[index].title}<br>`
                    + `详情：${this.pageColumnsData[index].text}`
                });
            },


        }
    };
</script>