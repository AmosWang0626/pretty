<style>

</style>
<template>
    <!-- [父---子] 传递数据 -->
    <page-frame :fatherData='pageFrameData' @changePageCallBack="changePageCallBack"
                @changePageSizeCallBack="changePageSizeCallBack"/>
</template>
<script>
    import httpUtil from '../libs/util';
    import PageFrame from './components/pageFrame';

    export default {
        data() {
            return {
                page: 1,
                size: 10,
                pageFrameData: {
                    activeName: '3-1',
                    openNames: ['3'],

                    pageColumns: [
                        {
                            title: '用户编号',
                            key: 'memberId'
                        },
                        {
                            title: '手机号',
                            key: 'phoneNo'
                        },
                        {
                            title: '昵称',
                            key: 'nickName'
                        },
                        {
                            title: '注册时间',
                            key: 'createTime'
                        }
                    ],
                    pageData: ''
                }
            };
        },

        /* 注册组件 */
        components: {PageFrame},

        created: function () {
            this.generalGetData();
        },

        methods: {
            changePageCallBack: function (page) {
                this.page = page;
                this.generalGetData();
            },
            changePageSizeCallBack: function (size) {
                this.size = size;
                this.generalGetData();
            },

            generalGetData: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.$Message.success(res.message);
                        this.pageFrameData.pageData = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                httpUtil.httpRequestGet('/passport/page', {params: {page: this.page, size: this.size}}).then(callback);
            }
        }
    };
</script>