<style scoped>
    .layout {
        background: #495060;
        position: relative;
        overflow: hidden;
    }

    .layout-logo {
        margin-top: 10px;
        width: 140px;
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
                    <img class="layout-logo" @click="backHome" src="http://112.74.57.49:88/img/property-logo-trans.png">
                    <span :style="{marginLeft: '20px', color: getFontColor(pageTheme), fontSize: '30px'}">中工大学科技园物业管理系统</span>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Dropdown trigger="click" @on-click="changeTheme">
                                <Icon type="paintbucket"></Icon>
                                <Icon type="arrow-down-b"></Icon>
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
                    <Menu :active-name="activeName" width="auto" :open-names="pageFrameStyle.openNames"
                          :theme="pageTheme" @on-select="changeMenuOnClick">
                        <!-- 左侧菜单(暂仅为二级菜单) -->
                        <Submenu v-for="firstMenu in subMenuData"
                                 :name="firstMenu.menuPriority" :key="firstMenu.menuPriority">
                            <!-- 一级菜单 (ICON & NAME) -->
                            <template slot="title">
                                <Icon :type="firstMenu.menuIcon"></Icon>
                                {{firstMenu.menuName}}
                            </template>
                            <!-- 二级菜单 -->
                            <MenuItem v-for="secondMenu in firstMenu.menuSecondLevelVOS"
                                      :name="secondMenu.menuUrl" :key="secondMenu.menuPriority">
                                {{secondMenu.menuName}}
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>

                <!-- Content -->
                <Content class="layout-content">
                    <slot name="slotTable"></slot>
                    <slot name="slotForm"></slot>
                    <slot name="slotOther"></slot>
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
    import httpUtil from '../../libs/util';

    export default {
        data() {
            return {
                subMenuData: [],

                // 颜色主题
                pageTheme: localStorage.getItem('pageTheme'),
                // 用户昵称
                nickName: localStorage.getItem('nickName'),
                // 左侧导航菜单
                activeName: localStorage.getItem('activeName'),
            };
        },

        // [父---子] 传递数据
        props: ['pageFrameStyle'],

        created: function () {
            // 默认白色主题
            if (localStorage.getItem('pageTheme') == null) {
                localStorage.setItem('pageTheme', 'light');
            }
            this.getMenuList();
        },

        methods: {
            // 获取左侧导航菜单
            getMenuList: function () {
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.subMenuData = res.data;
                        localStorage.setItem('menuData', res.data);
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/passport/menu').then(callback);
            },

            // 点击左侧导航菜单
            changeMenuOnClick: function (name) {
                this.$router.push({path: name});
                localStorage.setItem('activeName', name);
            },

            // 退出登录
            dropDownOnClick: function (name) {
                if ('logout' === name) {
                    localStorage.setItem('token', null);
                    localStorage.setItem('nikeName', null);
                    localStorage.setItem('rolesId', null);
                    this.$router.push({path: '/login'});
                }
            },

            // 回首页
            backHome: function () {
                this.$router.push({path: '/home'});
            },

            // 主题相关(官方)
            changeTheme: function (index) {
                this.pageTheme = index;
                localStorage.setItem('pageTheme', index);
            },
            // 主题相关(自定义)--背景颜色
            getColor(colorName) {
                if (colorName === 'dark') {
                    return '#495060';
                } else {
                    return '#fff';
                }
            },
            // 主题相关(自定义)--字体颜色与背景色相反
            getFontColor(colorName) {
                if (colorName === 'dark') {
                    return '#fff';
                } else {
                    return '#495060';
                }
            }
        }
    };
</script>