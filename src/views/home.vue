<style>

</style>
<template>
    <frame-table></frame-table>
</template>
<script>
    import httpUtil from '../libs/util';
    import FrameTable from './components/frameTable';

    export default {
        data() {
            return {
                nickName: 'Amos',
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
            };
        },
        components: {FrameTable},
        methods: {
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