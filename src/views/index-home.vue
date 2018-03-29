<style scoped>
    .layout {
        background: #f5f7f9;
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
        <Layout>
            <Header :style="{background: getColor(pageTheme)}">
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

            <Layout :style="{padding: '0 50px'}">
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" :theme="pageTheme">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-navigate"></Icon>
                                        Item 1
                                    </template>
                                    <MenuItem name="1-1">Option 1</MenuItem>
                                    <MenuItem name="1-2">Option 2</MenuItem>
                                    <MenuItem name="1-3">Option 3</MenuItem>
                                </Submenu>
                                <Submenu name="2">
                                    <template slot="title">
                                        <Icon type="ios-keypad"></Icon>
                                        Item 2
                                    </template>
                                    <MenuItem name="2-1">Option 1</MenuItem>
                                    <MenuItem name="2-2">Option 2</MenuItem>
                                </Submenu>
                                <Submenu name="3">
                                    <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                        Item 3
                                    </template>
                                    <MenuItem name="3-1">Option 1</MenuItem>
                                    <MenuItem name="3-2">Option 2</MenuItem>
                                </Submenu>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            Content
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isCollapsed: false,
                nickName: 'Amos',
                pageTheme: 'dark'
            };
        },
        methods: {
            changeTheme: function (index) {
                this.pageTheme = index;
            },
            getColor(colorName) {
                if (colorName === 'light') {
                    return '#fff';
                } else {
                    return '#495060';
                }
            }
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ];
            }
        }
    };
</script>