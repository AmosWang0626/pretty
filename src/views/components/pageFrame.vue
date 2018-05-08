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
                        <!--<Submenu v-for="(menu, index) in menuData" :name="index">-->
                        <!--<template slot="title">-->
                        <!--<Icon type="ios-people"></Icon>-->
                        <!--{{ menu.name }}-->
                        <!--</template>-->
                        <!--<MenuGroup v-for="subMenu in menu.subMenus" :title="subMenu.name">-->
                        <!--<MenuItem v-for="childrenMenu in subMenu.subMenus" :name="childrenMenu.href">-->
                        <!--{{childrenMenu.name}}-->
                        <!--</MenuItem>-->
                        <!--</MenuGroup>-->
                        <!--</Submenu>-->
                        <!--<Submenu name="1">-->
                        <!--<template slot="title">-->
                        <!--<Icon type="ios-people"></Icon>-->
                        <!--综合管理模块-->
                        <!--</template>-->
                        <!--<MenuGroup title="信息管理">-->
                        <!--<MenuItem name="1-1">园区信息管理</MenuItem>-->
                        <!--<MenuItem name="1-2">用户账号管理</MenuItem>-->
                        <!--<MenuItem name="1-3">系统权限管理</MenuItem>-->
                        <!--<MenuItem name="1-4">员工信息管理</MenuItem>-->
                        <!--<MenuItem name="1-5">系统日志管理</MenuItem>-->
                        <!--</MenuGroup>-->
                        <!--<MenuGroup title="资源管理">-->
                        <!--<MenuItem name="1-6">企业信息管理</MenuItem>-->
                        <!--<MenuItem name="1-7">企业员工信息管理</MenuItem>-->
                        <!--<MenuItem name="1-8">房屋信息管理</MenuItem>-->
                        <!--<MenuItem name="1-9">车辆车位管理</MenuItem>-->
                        <!--<MenuItem name="1-10">车位信息管理</MenuItem>-->
                        <!--<MenuItem name="1-11">设备信息管理</MenuItem>-->
                        <!--</MenuGroup>-->
                        <!--</Submenu>-->
                        <!--<Submenu name="2">-->
                        <!--<template slot="title">-->
                        <!--<Icon type="stats-bars"></Icon>-->
                        <!--综合业务模块-->
                        <!--</template>-->
                        <!--<MenuGroup title="系统管理">-->
                        <!--<MenuItem name="2-1">通知公告</MenuItem>-->
                        <!--<MenuItem name="2-2">短信息管理</MenuItem>-->
                        <!--<MenuItem name="2-3">反馈与建议</MenuItem>-->
                        <!--</MenuGroup>-->
                        <!--<MenuGroup title="服务管理">-->
                        <!--<MenuItem name="2-4">服务申请</MenuItem>-->
                        <!--<MenuItem name="2-5">服务评价</MenuItem>-->
                        <!--<MenuItem name="2-6">服务调查</MenuItem>-->
                        <!--<MenuItem name="2-7">车辆进出</MenuItem>-->
                        <!--<MenuItem name="2-8">房源租售</MenuItem>-->
                        <!--<MenuItem name="2-9">添加公司</MenuItem>-->
                        <!--</MenuGroup>-->
                        <!--</Submenu>-->
                        <!--<Submenu name="3">-->
                        <!--<template slot="title">-->
                        <!--<Icon type="social-yen"></Icon>-->
                        <!--资费管理模块-->
                        <!--</template>-->
                        <!--<MenuItem name="3-1">账单录入</MenuItem>-->
                        <!--<MenuItem name="3-2">账单管理</MenuItem>-->
                        <!--<MenuItem name="3-3">交易流水</MenuItem>-->
                        <!--<MenuItem name="3-11">标准管理</MenuItem>-->
                        <!--<MenuItem name="3-12">添加标准</MenuItem>-->
                        <!--<MenuItem name="3-13">公司管理</MenuItem>-->
                        <!--<MenuItem name="3-14">添加公司</MenuItem>-->
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="android-apps"></Icon>
                                {{subMenuBusiness.name}}
                            </template>
                            <MenuItem v-for="menu in subMenuBusiness.menus" :name="menu.href" :key="menu.menuItemIndex">
                                {{menu.name}}
                            </MenuItem>
                        </Submenu>

                        <!--</Submenu>-->
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="android-apps"></Icon>
                                {{subMenuTariff.name}}
                            </template>
                            <MenuItem v-for="menu in subMenuTariff.menus" :name="menu.href" :key="menu.menuItemIndex">
                                {{menu.name}}
                            </MenuItem>
                        </Submenu>

                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="android-apps"></Icon>
                                {{subMenuFour.name}}
                            </template>
                            <MenuItem v-for="menu in subMenuFour.menus" :name="menu.href" :key="menu.menuItemIndex">
                                {{menu.name}}
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
    export default {
        data() {
            return {
                subMenuBusiness: {
                    name: '综合业务模块',
                    menus: [
                        {
                            menuItemIndex: 1,
                            name: '服务申请',
                            href: '/serviceApply'
                        },
                        {
                            menuItemIndex: 2,
                            name: '服务审批',
                            href: '/serviceManage'
                        }
                    ]
                },
                subMenuTariff: {
                    name: '资费管理模块',
                    menus: [
                        {
                            menuItemIndex: 1,
                            name: '账单录入',
                            href: '/billEntry'
                        },
                        {
                            menuItemIndex: 2,
                            name: '账单管理',
                            href: '/billPlanManage'
                        },
                        {
                            menuItemIndex: 3,
                            name: '交易流水',
                            href: '/companyBillManage'
                        },
                        {
                            menuItemIndex: 4,
                            name: '标准管理',
                            href: '/standard'
                        },
                        {
                            menuItemIndex: 5,
                            name: '添加标准',
                            href: '/standardAdd'
                        },
                        {
                            menuItemIndex: 6,
                            name: '公司管理',
                            href: '/company'
                        },
                        {
                            menuItemIndex: 7,
                            name: '添加公司',
                            href: '/companyAdd'
                        }
                    ]
                },
                subMenuFour: {
                    name: '展示模板模块',
                    menus: [
                        {
                            menuItemIndex: 1,
                            name: '查看用户',
                            href: '/user'
                        },
                        {
                            menuItemIndex: 2,
                            name: '用户信息管理',
                            href: '/userManage'
                        },
                        {
                            menuItemIndex: 3,
                            name: '即时消费',
                            href: '/consumeAdd'
                        },
                        {
                            menuItemIndex: 4,
                            name: '数据报表',
                            href: '/statistics'
                        }
                    ]
                },
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
        },

        methods: {
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