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
            <Table stripe border size="large" ref="table" :key="index" :columns="pageColumns" :data="pageColumnsData"></Table>
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
                        title: '房屋名字',
                        key: 'name',

                    },
                    {
                        title: '房屋编号',
                        key: 'houseNo',

                    },

                    {
                        title: '类型',
                        key: 'type',
                    },

                    {
                        title: '面积',
                        key: 'area',
                    },
                    {
                        title: '地址',
                        key: 'address',
                    },
                    {
                        title: '价格',
                        key: 'rent',
                        editable: true
                    },
                    {
                        title: '详情',
                        key: 'details',
                        editable: true
                    },
                    {
                        title: '图片',
                        key: 'img',
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        render: function (h, param) {
                            return h('div', param.row.createTime != null ? dateUtil.formatDate(new Date(param.row.createTime), 'yyyy-MM-dd hh:mm:ss') : null);
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
                httpUtil.httpRequestGet('/rent/pagehouse', {page: this.page, size: this.pageSize}).then(callback);
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
                httpUtil.httpRequestPost('/passport/modifyUserInfo', val).then(callback);
            },


            // 分页相关 -- 改变页面size
            changePageSize: function (pageSize) {
                this.pageSize = pageSize;
                this.generalGetData();
            },

            //


        }
    };
</script>