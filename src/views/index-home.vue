<style scoped>
    .layout {
        background: #495060;
        position: relative;
        overflow: hidden;
    }

    .layout-nav {
        width: 380px;
        float: right;
        position: relative;
    }

    .layout-footer-center {
        text-align: center;
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Header class="layout-header" :style="{background: getColor(pageTheme)}">
                <Menu :theme="pageTheme" mode="horizontal" active-name="1">
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Dropdown trigger="click" @on-click="changeTheme">
                                <Icon type="ios-analytics"></Icon>
                                切换主题
                                <DropdownMenu slot="list">
                                    <DropdownItem name="light">象牙白</DropdownItem>
                                    <DropdownItem name="dark">高雅灰</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                        <MenuItem name="3">
                            <Dropdown trigger="click">
                                <Avatar style="background-color: #87d068" size="large">{{nickName}}</Avatar>
                                <Icon type="arrow-down-b"></Icon>
                                <DropdownMenu slot="list">
                                    <DropdownItem>个人信息</DropdownItem>
                                    <DropdownItem disabled>修改密码</DropdownItem>
                                    <DropdownItem divided disabled>设置</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>

            <Layout>
                <Sider hide-trigger :style="{background: getColor(pageTheme)}">
                    <Menu active-name="1-2" width="auto" :open-names="['1']" :theme="pageTheme">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-paper"></Icon>
                                内容管理
                            </template>
                            <MenuItem name="1-1">文章管理</MenuItem>
                            <MenuItem name="1-2">评论管理</MenuItem>
                            <MenuItem name="1-3">举报管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-people"></Icon>
                                用户管理
                            </template>
                            <MenuItem name="2-1">新增用户</MenuItem>
                            <MenuItem name="2-2">活跃用户</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="stats-bars"></Icon>
                                统计分析
                            </template>
                            <MenuGroup title="使用">
                                <MenuItem name="3-1">新增和启动</MenuItem>
                                <MenuItem name="3-2">活跃分析</MenuItem>
                                <MenuItem name="3-3">时段分析</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="留存">
                                <MenuItem name="3-4">用户留存</MenuItem>
                                <MenuItem name="3-5">流失用户</MenuItem>
                            </MenuGroup>
                        </Submenu>
                    </Menu>
                </Sider>
                <Content :style="{margin: '10px', padding: '24px', background: '#fff'}">
                    <Table stripe border size="large" :columns="pageColumns" :data="pageData"></Table>
                    <Button @click="getBase">发个GET请求玩玩呀~~</Button>
                    <Button @click="postBase">发个POST请求玩玩呀~~</Button>
                </Content>
            </Layout>
            <Footer class="layout-footer-center" :style="{background: getColor(pageTheme)}">
                <span :style="{color: getFontColor(pageTheme)}">2017-2018 &copy; Property</span>
            </Footer>
        </Layout>
    </div>
</template>
<script>
    import myUtil from '../libs/util';

    export default {
        data() {
            return {
                isCollapsed: false,
                nickName: 'Amos',
                pageTheme: 'dark',

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
                        key: 'date'
                    }
                ],
                pageData: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            };
        },
        methods: {
            changeTheme: function (index) {
                this.pageTheme = index;
            },
            // 背景颜色
            getColor(colorName) {
                if (colorName === 'light') {
                    return '#fff';
                } else {
                    return '#495060';
                }
            },
            // 字体颜色与背景色相反
            getFontColor(colorName) {
                if (colorName === 'light') {
                    return '#495060';
                } else {
                    return '#fff';
                }
            },
            // 发Get请求
            getBase() {
                myUtil.myGet('/web/get');
            },
            // 发Post请求
            postBase() {
                myUtil.myPost('/web/post', {
                    hello: 'hello-amos',
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                });
            }
        }
    };
</script>