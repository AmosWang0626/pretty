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
    import httpUtil from '../libs/util';
    import dateUtil from '../libs/date';
    import pageFrame from './components/pageFrame';
    import canEditTable from './components/canEditTable.vue';

    export default {
        data() {
            return {
                page: 1,
                pageSize: 10,
                pageTotal: 0,

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
                        key: 'unitPrice',
                        editable: true
                    },
                    {
                        title: '逾期利率',
                        key: 'overdueRate',
                        editable: true
                    },
                    {
                        title: '标准生效时间',
                        key: 'startTime',
                        render: function (h, param) {
                            return h('div',
                                dateUtil.formatDate(new Date(param.row.startTime), 'yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '标准失效时间',
                        key: 'endTime',
                        render: function (h, param) {
                            return h('div',
                                dateUtil.formatDate(new Date(param.row.endTime), 'yyyy-MM-dd'));
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        key: 'handle',
                        handle: ['edit', 'delete']
                    }
                ],
                pageColumnsData: [],

                // 给模板页设置样式
                frameStyle: {
                    activeName: '3-11',
                    openNames: ['3'],
                }
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

            // 数据修改 -- 整行修改
            handleChange(val, index) {
                this.generalUpdate(JSON.stringify(val[index]), '修改了第 ' + (index + 1) + ' 行的数据');
            },
            // 数据修改 -- 单元格修改
            handleCellChange(val, index, key) {
                this.generalUpdate(JSON.stringify(val[index]), '修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
            },
            // 数据修改 -- 删除操作
            handleDeleteChange(val, index) {
                this.generalDelete(JSON.stringify(val[index]), '删除了第' + (index + 1) + '行数据');
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
                httpUtil.httpRequestGet('/static/pageStandard', {page: this.page, size: this.pageSize}).then(callback);
            },

            // 请求后台 -- 更新操作
            generalUpdate: function (val, message) {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.$Message.success(message);
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestPost('/static/modifyStandard', val).then(callback);
            },

            // 请求后台 -- 删除操作
            generalDelete: function (val, message) {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.$Message.success(message);
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestPost('/static/deleteStandard', val).then(callback);
            }
        }
    };
</script>