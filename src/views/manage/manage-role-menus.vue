<style>
    /* 表格相关UI */
    .page-other {
        text-align: center;
    }
</style>
<template>
    <page-frame>
        <!-- 下边的内容会插入到 components/pageFrame.vue 中的 <slot name="slotTable"></slot> -->
        <div class="page-other" slot="slotOther">
            <Form ref="roleMenuForm" :model="roleMenuForm" :label-width="78">
                <FormItem><h1 class="general-form-title">系统角色授权</h1></FormItem>
                <FormItem label="用户角色">
                    <Select v-model="roleMenuForm.rolesId" style="width: 550px" @on-change="roleSupportMenusNow">
                        <Option v-for="item in roleList"
                                :value="item.key" :key="item.value">{{ item.value }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="角色授权">
                    <Transfer
                            :data="roleMenuData"
                            :target-keys="roleMenuTargetKeys"
                            :list-style="listStyle"
                            filterable
                            :filter-method="roleMenuFilterMethod"
                            @on-change="handleMenusChange"></Transfer>
                </FormItem>
            </Form>
        </div>
    </page-frame>
</template>
<script>
    import httpUtil from '../../libs/util';
    import PageFrame from '../components/pageFrame';

    export default {
        data() {
            return {
                roleMenuForm: {
                    rolesId: '',
                },
                roleList: [],
                roleMenuData: [],
                roleMenuTargetKeys: [],
                listStyle: {
                    width: '250px',
                    height: '300px',
                    textAlign: 'left'
                }
            };
        },

        // 注册组件
        components: {PageFrame},

        created: function () {
            this.getAllRole();
            this.getHasFatherMenus();
        },

        methods: {
            // 穿梭框搜索
            roleMenuFilterMethod: function (data, query) {
                return data.label.indexOf(query) > -1;
            },

            // 提交数据 -- 改变用户角色支持的菜单
            handleMenusChange: function (targetKeys, direction, moveKeys) {
                if (this.roleMenuForm.rolesId == null || this.roleMenuForm.rolesId === '') {
                    this.$Message.error('请先选择角色呦!');
                } else {
                    // 获取所有角色
                    let callbackAllRole = (res) => {
                        if (res.flags === 'success') {
                            if (res.data) {
                                this.roleMenuTargetKeys = res.data;
                            }
                        } else {
                            res.flags === 'fail' && this.$Message.error(`${res.message}`);
                            if (res.code === '1003') {
                                this.$router.push('/login');
                            }
                        }
                    };
                    httpUtil.httpRequestPost('/roles/changeRoleMenus', {
                        rolesId: this.roleMenuForm.rolesId,
                        menuIds: JSON.parse(JSON.stringify(moveKeys)),
                        direction: direction
                    }).then(callbackAllRole);

                    // 重新加载数据
                    this.getHasFatherMenus();
                    this.roleSupportMenusNow();
                }
            },

            // 请求后台 -- 获取所有角色
            getAllRole: function () {
                let callbackAllRole = (res) => {
                    if (res.flags === 'success') {
                        this.roleList = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/roles/allRole').then(callbackAllRole);
            },

            // 请求后台 -- 获取角色目前支持的菜单
            roleSupportMenusNow: function () {
                this.roleMenuTargetKeys = [];
                this.getHasFatherMenus();

                let callbackAllRole = (res) => {
                    if (res.flags === 'success') {
                        if (res.data) {
                            this.roleMenuTargetKeys = res.data;
                        }
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/roles/menusByRole', {rolesId: this.roleMenuForm.rolesId}).then(callbackAllRole);
            },

            // 请求后台 -- 获取所有菜单
            getHasFatherMenus: function () {
                // 获取所有权限
                let callback = (res) => {
                    if (res.flags === 'success') {
                        this.roleMenuData = res.data;
                    } else {
                        res.flags === 'fail' && this.$Message.error(`${res.message}`);
                        if (res.code === '1003') {
                            this.$router.push('/login');
                        }
                    }
                };
                httpUtil.httpRequestGet('/roles/hasFatherMenus').then(callback);
            }
        }
    };
</script>