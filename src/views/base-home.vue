<style>

</style>
<template>
    <!-- :fatherData='pageFrameData' [父---子] 传递数据 -->
    <!-- @frameToFather='listenToFrame' [子---父] 回传数据 -->
    <page-frame :fatherData='pageFrameData' @frameCallback='listenToFrame'></page-frame>
</template>
<script>
    import httpUtil from '../libs/util';
    import PageFrame from './components/pageFrame';

    export default {
        data() {
            return {
                pageFrameData: {
                    activeName: '3-1',
                    openNames: ['3'],

                    pageColumns: [
                        {
                            title: 'Name',
                            key: 'name'
                        },
                        {
                            title: 'Age',
                            key: 'age'
                        },
                        {
                            title: 'Address',
                            key: 'address'
                        },
                        {
                            title: 'Date',
                            key: 'startDate'
                        }
                    ],
                    pageData: [
                        {
                            name: 'John Brown',
                            age: 18,
                            address: 'New York No. 1 Lake Park',
                            startDate: '2016-10-03'
                        },
                        {
                            name: 'Jim Green',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            startDate: '2016-10-01'
                        },
                        {
                            name: 'Joe Black',
                            age: 30,
                            address: 'Sydney No. 1 Lake Park',
                            startDate: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            address: 'Ottawa No. 2 Lake Park',
                            startDate: '2016-10-04'
                        }
                    ]
                }
            };
        },

        /* 注册组件 */
        components: {PageFrame},

        methods: {
            /* [子---父] 回传数据Log */
            listenToFrame(msg) {
                this.$Message.success(msg);
            },
            // 发Get请求
            baseGet() {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.$Message.success(res.message);
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                httpUtil.httpRequestGet('/web/get').then(callback);
            },
            // 发Post请求
            basePost() {
                // httpUtil.httpRequestQsPost('/web/post', this.pageData);
                let callback = (res) => {
                    if (res.flags === 'success') {
                        localStorage.setItem('token', res.data.token);
                        this.$Message.success(res.message);
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                    }
                };
                httpUtil.httpRequestJsonPost('/web/login', {
                    phoneNo: '18937128861',
                    password: '123456',
                }).then(callback);
            }
        }
    };
</script>