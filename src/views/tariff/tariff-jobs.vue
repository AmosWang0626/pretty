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
            <Table :loading="loading" stripe border size="large" :columns="pageColumns"
                   :data="pageColumnsData">
            </Table>
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
                loading: true,

                pageColumns: [
                    {
                        title: '名称',
                        key: 'jobName'
                    },
                    {
                        title: '描述',
                        key: 'jobDesc'
                    },
                    {
                        title: '上次执行开始时间',
                        key: 'startTime',
                        render: function (h, param) {
                            return h('div',
                                dateUtil.formatDate(new Date(param.row.startTime), 'yyyy-MM-dd hh:mm:ss'));
                        }
                    },
                    {
                        title: '结束时间',
                        key: 'endTime',
                        render: function (h, param) {
                            return h('div',
                                dateUtil.formatDate(new Date(param.row.endTime), 'yyyy-MM-dd hh:mm:ss'));
                        }
                    },
                    {
                        title: '执行耗时',
                        key: 'runTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
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
                                            this.run(params.row.jobName);
                                        }
                                    }
                                }, '执行')
                            ]);
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
            run: function (jobName) {
                let callback = (res) => {
                    this.loading = false;
                    if (res.flags === 'success') {
                        this.$Message.success('执行成功');
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/manage/' + jobName).then(callback);
            },

            // 请求后台 -- 获取基础数据
            generalGetData: function () {
                let callback = (res) => {
                    this.loading = false;
                    if (res.flags === 'success') {
                        this.pageColumnsData = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/manage/all', {page: this.page, size: this.pageSize}).then(callback);
            }
        }
    };
</script>