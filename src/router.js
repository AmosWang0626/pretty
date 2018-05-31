const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/manage/base-home.vue'], resolve)
    }, {
        path: '/home',
        meta: {
            title: '啦啦啦'
        },
        component: (resolve) => require(['./views/manage/base-home.vue'], resolve)
    }, {
        path: '/user',
        meta: {
            title: 'User'
        },
        component: (resolve) => require(['./views/manage/paging-user-view.vue'], resolve)
    }, {
        path: '/userManage',
        meta: {
            title: 'UserManage'
        },
        component: (resolve) => require(['./views/manage/paging-user-manage.vue'], resolve)
    }, {
        path: '/login',
        meta: {
            title: 'Login'
        },
        component: (resolve) => require(['./views/manage/base-login.vue'], resolve)
    }, {
        path: '/register',
        meta: {
            title: 'Register'
        },
        component: (resolve) => require(['./views/manage/base-register.vue'], resolve)
    }, {
        path: '/forgetPassword',
        meta: {
            title: 'ForgetPassword'
        },
        component: (resolve) => require(['./views/manage/base-forgetPwd.vue'], resolve)
    }, {
        path: '/standard',
        meta: {
            title: 'Standard'
        },
        component: (resolve) => require(['./views/tariff/tariff-standard-manage.vue'], resolve)
    }, {
        path: '/company',
        meta: {
            title: 'Company'
        },
        component: (resolve) => require(['./views/tariff/tariff-company-manage.vue'], resolve)
    }, {
        path: '/standardAdd',
        meta: {
            title: 'Standard'
        },
        component: (resolve) => require(['./views/tariff/tariff-standard-add.vue'], resolve)
    }, {
        path: '/companyAdd',
        meta: {
            title: 'Company'
        },
        component: (resolve) => require(['./views/tariff/tariff-company-add.vue'], resolve)
    }, {
        path: '/consumeAdd',
        meta: {
            title: 'Consume'
        },
        component: (resolve) => require(['./views/tariff/tariff-consume-entry.vue'], resolve)
    }, {
        path: '/billEntry',
        meta: {
            title: 'BillEntry'
        },
        component: (resolve) => require(['./views/tariff/tariff-bill-entry.vue'], resolve)
    }, {
        path: '/billPlanManage',
        meta: {
            title: 'BillManage'
        },
        component: (resolve) => require(['./views/tariff/tariff-bill-plan-manage.vue'], resolve)
    }, {
        path: '/companyBillManage',
        meta: {
            title: 'CompanyBillManage'
        },
        component: (resolve) => require(['./views/tariff/tariff-company-bill-manage.vue'], resolve)
    }, {
        path: '/statistics',
        meta: {
            title: 'Statistics'
        },
        component: (resolve) => require(['./views/tariff/tariff-statistics.vue'], resolve)
    }, {
        path: '/serviceApply',
        meta: {
            title: 'ServiceApply'
        },
        component: (resolve) => require(['./views/business/business-service-apply.vue'], resolve)
    }, {
        path: '/serviceManage',
        meta: {
            title: 'ServiceManage'
        },
        component: (resolve) => require(['./views/business/business-service-manage.vue'], resolve)
    }, {
        path: '/userInfo',
        meta: {
            title: 'UserInfo'
        },
        component: (resolve) => require(['./views/manage/base-user-info.vue'], resolve)
    }, {
        path: '/updatePwd',
        meta: {
            title: 'UpdatePwd'
        },
        component: (resolve) => require(['./views/manage/base-updatePwd.vue'], resolve)
    }, {
        path: '/monthConsume',
        meta: {
            title: 'MonthConsume'
        },
        component: (resolve) => require(['./views/tariff/tariff-consume-month-entry.vue'], resolve)
    }, {
        path: '/carComeIn',
        meta: {
            title: 'CarComeIn'
        },
        component: (resolve) => require(['./views/business/business-car-in.vue'], resolve)
    },
    //发送短信
    {
        path: '/message',
        meta: {
            title: 'message'
        },
        component: (resolve) => require(['./views/business/business-message.vue'], resolve)
    },
    //驶出
    {
        path: '/carOut',
        meta: {
            title: 'carOut'
        },
        component: (resolve) => require(['./views/business/business-car-out.vue'], resolve)
    },
    //paper
    {
        path: '/paper',
        meta: {
            title: 'paper'
        },
        component: (resolve) => require(['./views/business/business-paper.vue'], resolve)
    },


    //房屋
    {
        path: '/house',
        meta: {
            title: 'house'
        },
        component: (resolve) => require(['./views/business/business-house.vue'], resolve)
    }, //d答案
    {
        path: '/answer',
        name: 'answer',
        meta: {
            title: 'answer'
        },
        component: (resolve) => require(['./views/business/business-answer.vue'], resolve)
    },

    //意见建议
    {
        path: '/proposal',
        meta: {
            title: 'proposal'
        },
        component: (resolve) => require(['./views/business/business-proposal.vue'], resolve)
    },

    //提出意见建议
    {
        path: '/proposalin',
        meta: {
            title: 'proposalin'
        },
        component: (resolve) => require(['./views/business/business-proposal-in.vue'], resolve)
    },
    //添加房源
    {
        path: '/addhouse',
        meta: {
            title: 'addhouse'
        },
        component: (resolve) => require(['./views/business/business-addhouse.vue'], resolve)
    },
    {
        path: '/survey',
        meta: {
            title: 'survey'
        },
        component: (resolve) => require(['./views/business/business-survey.vue'], resolve)
    }, {
        path: '/jobs',
        meta: {
            title: 'Jobs'
        },
        component: (resolve) => require(['./views/tariff/tariff-jobs.vue'], resolve)
    }, {
        path: '/uploadDemo',
        meta: {
            title: 'UploadDemo'
        },
        component: (resolve) => require(['./views/template/simple-view-upload.vue'], resolve)
    }, {
        path: '/roleMenus',
        meta: {
            title: 'RoleMenus'
        },
        component: (resolve) => require(['./views/manage/manage-role-menus.vue'], resolve)
    }, {
        path: '/enterprise',
        meta: {
            title: 'Enterprise'
        },
        component: (resolve) => require(['./views/manage/manage-enterprise.vue'], resolve)
    }, {
        path: '/enterpriseAdd',
        meta: {
            title: 'Enterprise'
        },
        component: (resolve) => require(['./views/manage/manage-enterprise-add.vue'], resolve)
    }, {
        path: '/equipment',
        meta: {
            title: 'Equipment'
        },
        component: (resolve) => require(['./views/manage/manage-equipment.vue'], resolve)
    }, {
        path: '/equipmentAdd',
        meta: {
            title: 'Equipment'
        },
        component: (resolve) => require(['./views/manage/manage-equipment-add.vue'], resolve)
    }, {
        path: '/garden',
        meta: {
            title: 'Garden'
        },
        component: (resolve) => require(['./views/manage/manage-garden.vue'], resolve)
    }, {
        path: '/carEntry',
        name: 'carEntry',
        meta: {
            title: 'CarEntry'
        },
        component: (resolve) => require(['./views/business/business-car-entry.vue'], resolve)
    }
];

export default routers;