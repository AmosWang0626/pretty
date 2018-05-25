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
                                    <DropdownItem name="userInfo">个人信息</DropdownItem>
                                    <DropdownItem name="updatePwd">修改密码</DropdownItem>
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
                    <Menu :active-name="activeName" style="width: auto" :theme="pageTheme" :accordion="true"
                          :open-names="openMenus" @on-select="onMenuItemClick" @on-open-change="onMenuClick">
                        <!-- 左侧菜单(暂仅为二级菜单) -->
                        <Submenu v-for="first in subMenuData" :name="first.priority" :key="first.priority">
                            <!-- 一级菜单 (ICON & NAME) -->
                            <template slot="title">
                                <Icon :type="first.menuIcon"></Icon>
                                {{first.menuName}}
                            </template>
                            <!-- 二级菜单 -->
                            <MenuItem v-for="second in first.secondLevel"
                                      :name="second.menuUrl" :key="second.priority">
                                {{second.menuName}}
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
                <Span :style="{color: getFontColor(pageTheme)}">
                    2018-2019 © Property
                    <a href="http://www.miitbeian.gov.cn/" target="_blank"> 豫ICP备18017205号 </a>
                </Span>
            </Footer>
        </Layout>
    </div>
</template>
<script>
    import httpUtil from '../../libs/util';

    export default {
        data() {
            return {
                // 颜色主题
                pageTheme: localStorage.getItem('pageTheme'),
                // 用户昵称
                nickName: localStorage.getItem('nickName'),
                // 左侧菜单所有项
                subMenuData: JSON.parse(localStorage.getItem('subMenuData')),
                // 左侧菜单选中项
                activeName: localStorage.getItem('activeName'),
                // 左侧菜单展开项
                openMenus: JSON.parse(localStorage.getItem('openMenus')),
            };
        },

        created: function () {
            // 默认白色主题
            if (localStorage.getItem('pageTheme') == null) {
                localStorage.setItem('pageTheme', 'light');
            }

            // 如果左侧菜单为null, 调用后台获取菜单
            const menuData = JSON.parse(localStorage.getItem('subMenuData'));
            if (menuData == null || menuData.length === 0) {
                this.getSubMenuData();
            }
        },

        methods: {
            // 获取左侧导航菜单
            getSubMenuData: function () {
                localStorage.setItem('subMenuData', null);
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.subMenuData = res.data;
                        localStorage.setItem('subMenuData', JSON.stringify(res.data));
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/roles/menu').then(callback);
            },

            // 点击菜单Item
            onMenuItemClick: function (name) {
                this.$router.push({path: name});
                localStorage.setItem('activeName', name);
            },

            // 展开-关闭菜单
            onMenuClick: function (array) {
                localStorage.setItem('openMenus', JSON.stringify(array));
            },

            // 退出登录
            dropDownOnClick: function (name) {
                if ('logout' === name) {
                    localStorage.setItem('token', null);
                    localStorage.setItem('nikeName', null);
                    localStorage.setItem('rolesId', null);
                    localStorage.setItem('subMenuData', null);
                    this.$router.push({path: '/login'});
                } else if ('userInfo' === name) {
                    // 跳转到用户信息页面
                    this.$router.push({path: '/userInfo'});
                } else if ('updatePwd' === name) {
                    // 跳转到修改密码页面
                    this.$router.push({path: '/updatePwd'});
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