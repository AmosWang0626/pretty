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
            <!-- :hover-show="true" 加上 鼠标移入 显示编辑按钮 -->
            <can-edit-table
                    refs="pageTable"
                    v-model="columnsData"
                    @on-cell-change="handleCellChange"
                    @on-change="handleChange"
                    @on-delete="handleDeleteChange"
                    :editIncell="true"
                    :hover-show="true"
                    :columns-list="pageColumns">
            </can-edit-table>
            <!--<Table :loading="loading"  :columns="pageColumns"-->
            <!--:data="">-->
            <!--</Table>-->
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
    // import dateUtil from '../libs/date';
    import pageFrame from './components/pageFrame';
    import canEditTable from './components/canEditTable.vue';

    export default {
        data() {
            return {
                page: 1,
                size: 10,
                pageColumns: [
                    {
                        title: '用户编号',
                        key: 'memberId'
                    },
                    {
                        title: '手机号',
                        key: 'phoneNo',
                        editable: true
                    },
                    {
                        title: '昵称',
                        key: 'nickName',
                        editable: true
                    },
                    {
                        title: '注册时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        key: 'handle',
                        handle: ['edit', 'delete']
                    }
                ],
                pageData: '',
                columnsData: [],

                toChildData: {
                    activeName: '3-9',
                    openNames: ['3'],
                }
            };
        },

        // 注册组件
        components: {pageFrame, canEditTable},

        created: function () {
            this.generalGetData();
        },

        methods: {
            handleChange(val, index) {
                console.log(JSON.stringify(val[index]));
                this.generalUpdate(JSON.stringify(val[index]), '修改了第 ' + (index + 1) + ' 行的数据');
            },
            handleCellChange(val, index, key) {
                console.log(JSON.stringify(val[index]));
                this.generalUpdate(JSON.stringify(val[index]), '修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
            },
            handleDeleteChange(val, index) {
                console.log(JSON.stringify(val[index]));
                this.generalDelete(JSON.stringify(val[index]), '删除了第' + (index + 1) + '行数据');
            },

            changePage: function (page) {
                this.page = page;
                this.generalGetData();
            },
            changePageSize: function (size) {
                this.size = size;
                this.generalGetData();
            },

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
                httpUtil.httpRequestPost('/passport/deleteUser', val).then(callback);
            },

            generalGetData: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.pageData = res.data;
                        this.columnsData = res.data.rows;
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