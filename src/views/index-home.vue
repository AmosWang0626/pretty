<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .layout-footer-center {
        text-align: center;
    }

    .layout-con {
        height: 100%;
        width: 100%;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>

<template>
    <div class="layout">
        <Layout>
            <Header :style="{ boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Dropdown>
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

            <Layout :style="{minHeight: '95vh'}">
                <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu active-name="1-2" theme="dark" width="auto" :class="menuItemClasses">
                        <MenuItem name="1-1">
                            <Icon type="ios-navigate"></Icon>
                            <span>Option 1</span>
                        </MenuItem>
                        <MenuItem name="1-2">
                            <Icon type="search"></Icon>
                            <span>Option 2</span>
                        </MenuItem>
                        <MenuItem name="1-3">
                            <Icon type="settings"></Icon>
                            <span>Option 3</span>
                        </MenuItem>
                    </Menu>
                </Sider>

                <Content :style="{padding: '16px 16px 16px'}">
                    <!--<Breadcrumb :style="{margin: '16px 0'}">-->
                    <!--<BreadcrumbItem>Home</BreadcrumbItem>-->
                    <!--<BreadcrumbItem>Components</BreadcrumbItem>-->
                    <!--<BreadcrumbItem>Layout</BreadcrumbItem>-->
                    <!--</Breadcrumb>-->
                    <Card>
                        <div style="height: 700px">Content</div>
                    </Card>
                    <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
                </Content>

            </Layout>
        </Layout>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapsed: false,
                nickName: 'Amos'
            };
        },
        computed: {
            menuItemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ];
            }
        }
    };
</script>