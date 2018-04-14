<style scoped>
    .layout {
        background: #495060;
        position: relative;
        overflow: hidden;
    }

    .layout-nav {
        width: 250px;
        float: right;
        position: relative;
    }

    .layout-footer-center {
        text-align: center;
    }

    .layout-content {
        margin: 10px;
        padding: 24px;
        background: #fff;
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">

            <!-- Header -->
            <Header class="layout-header" :style="{background: getColor(pageTheme)}">
                <Menu :theme="pageTheme" mode="horizontal" active-name="1">
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Dropdown trigger="click" @on-click="changeTheme">
                                <Icon type="ios-analytics"></Icon>
                                切换主题
                                <DropdownMenu slot="list">
                                    <DropdownItem name="light">象牙白</DropdownItem>
                                    <DropdownItem name="dark">高雅灰</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                        <MenuItem name="2">
                            <Dropdown trigger="click" @on-click="dropDownOnClick">
                                <Avatar style="background-color: #7265e6" size="large">{{nickName}}
                                </Avatar>
                                <Icon type="arrow-down-b"></Icon>
                                <DropdownMenu slot="list">
                                    <DropdownItem>个人信息</DropdownItem>
                                    <DropdownItem disabled>修改密码</DropdownItem>
                                    <DropdownItem divided disabled>设置</DropdownItem>
                                    <DropdownItem name="logout" divided>退出</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>

            <Layout>
                <!-- Sider -->
                <Sider hide-trigger :style="{background: getColor(pageTheme)}">
                    <Menu :active-name="fatherData.activeName" width="auto" :open-names="fatherData.openNames"
                          :theme="pageTheme" @on-select="changeMenuOnClick">
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
                                资费管理模块
                            </template>
                            <MenuGroup title="缴费标准管理">
                                <MenuItem name="3-1">标准管理</MenuItem>
                                <MenuItem name="3-2">添加标准</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="收费公司管理">
                                <MenuItem name="3-3">公司管理</MenuItem>
                                <MenuItem name="3-4">添加公司</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="用户账单管理">
                                <MenuItem name="3-5">账单录入</MenuItem>
                                <MenuItem name="3-6">未结清账单</MenuItem>
                                <MenuItem name="3-7">未结清账单</MenuItem>
                                <MenuItem name="3-8">账目流水</MenuItem>
                            </MenuGroup>
                        </Submenu>
                    </Menu>
                </Sider>

                <!-- Content -->
                <Content class="layout-content">
                    <slot name="slotTable"></slot>
                    <slot name="slotForm"></slot>
                </Content>
            </Layout>

            <!-- Footer -->
            <Footer class="layout-footer-center" :style="{background: getColor(pageTheme)}">
                <span :style="{color: getFontColor(pageTheme)}">2017-2018 &copy; Property</span>
            </Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // 颜色主题
                pageTheme: 'dark',
                // 用户昵称
                nickName: localStorage.getItem('nikeName'),
            };
        },

        // [父---子] 传递数据
        props: ['fatherData'],

        // 监听父组件传递来的数据
        watch: {
            fatherData: {
                dep: true,
                handler(value) {
                    this.fatherData = value;
                }
            }
        },

        methods: {
            // 退出登录
            changeMenuOnClick: function (name) {
                if ('3-1' === name) {
                    this.$router.push({path: '/standard'});
                } else if ('3-2' === name) {
                    this.$router.push({path: '/standardAdd'});
                } else if ('3-3' === name) {
                    this.$router.push({path: '/company'});
                } else if ('3-4' === name) {
                    this.$router.push({path: '/companyAdd'});
                }
            },
            // 退出登录
            dropDownOnClick: function (name) {
                if ('logout' === name) {
                    localStorage.setItem('token', null);
                    localStorage.setItem('nikeName', null);
                    this.$router.push({path: '/login'});
                }
            },
            // 主题相关(官方)
            changeTheme: function (index) {
                this.pageTheme = index;
            },
            // 主题相关(自定义)--背景颜色
            getColor(colorName) {
                if (colorName === 'light') {
                    return '#fff';
                } else {
                    return '#495060';
                }
            },
            // 主题相关(自定义)--字体颜色与背景色相反
            getFontColor(colorName) {
                if (colorName === 'light') {
                    return '#495060';
                } else {
                    return '#fff';
                }
            }
        }
    };
</script>