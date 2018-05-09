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
    }
];

export default routers;