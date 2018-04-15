<style lang="less">
    .edit-table-height {
        height: 190px;
    }
</style>

<template>
    <!-- :hover-show="true" 加上 鼠标移入 显示编辑按钮 -->
    <can-edit-table
            refs="table4"
            v-model="editInlineAndCellData"
            @on-cell-change="handleCellChange"
            @on-change="handleChange"
            :editIncell="true"
            :hover-show="true"
            :columns-list="editInlineAndCellColumn">
    </can-edit-table>
</template>

<script>
    import canEditTable from './components/canEditTable.vue';
    import httpUtil from '../libs/util';

    export default {
        data() {
            return {
                page: 1,
                size: 10,
                editInlineAndCellColumn: [
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
                editInlineAndCellData: [],
            };
        },
        components: {
            canEditTable
        },
        created: function () {
            this.generalGetData();
        },
        methods: {
            handleCellChange(val, index, key) {
                this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
                console.log(JSON.stringify(this.editInlineAndCellData[index]));
            },
            handleChange(val, index) {
                this.$Message.success('修改了第' + (index + 1) + '行数据');
                console.log(JSON.stringify(this.editInlineAndCellData[index]));
            },
            generalGetData: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.editInlineAndCellData = res.data.rows;
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
