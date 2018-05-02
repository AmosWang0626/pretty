const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/base-home.vue'], resolve)
    },
    {
        path: '/home',
        meta: {
            title: '啦啦啦'
        },
        component: (resolve) => require(['./views/base-home.vue'], resolve)
    },
    {
        path: '/user',
        meta: {
            title: 'User'
        },
        component: (resolve) => require(['./views/template-view.vue'], resolve)
    },
    {
        path: '/userManage',
        meta: {
            title: 'UserManage'
        },
        component: (resolve) => require(['./views/template-manage.vue'], resolve)
    },
    {
        path: '/login',
        meta: {
            title: 'Login'
        },
        component: (resolve) => require(['./views/base-login.vue'], resolve)
    },
    {
        path: '/register',
        meta: {
            title: 'Register'
        },
        component: (resolve) => require(['./views/base-register.vue'], resolve)
    },
    {
        path: '/forgetPassword',
        meta: {
            title: 'ForgetPassword'
        },
        component: (resolve) => require(['./views/base-forgetPwd.vue'], resolve)
    },
    {
        path: '/standard',
        meta: {
            title: 'Standard'
        },
        component: (resolve) => require(['./views/tariff-standard-manage.vue'], resolve)
    },
    {
        path: '/company',
        meta: {
            title: 'Company'
        },
        component: (resolve) => require(['./views/tariff-company-manage.vue'], resolve)
    },
    {
        path: '/standardAdd',
        meta: {
            title: 'Standard'
        },
        component: (resolve) => require(['./views/tariff-standard-add.vue'], resolve)
    },
    {
        path: '/companyAdd',
        meta: {
            title: 'Company'
        },
        component: (resolve) => require(['./views/tariff-company-add.vue'], resolve)
    },
    {
        path: '/consumeAdd',
        meta: {
            title: 'Consume'
        },
        component: (resolve) => require(['./views/tariff-consume-entry.vue'], resolve)
    },
    {
        path: '/billEntry',
        meta: {
            title: 'BillEntry'
        },
        component: (resolve) => require(['./views/tariff-bill-entry.vue'], resolve)
    },
    {
        path: '/billPlanManage',
        meta: {
            title: 'BillManage'
        },
        component: (resolve) => require(['./views/tariff-bill-plan-manage.vue'], resolve)
    },
    {
        path: '/companyBillManage',
        meta: {
            title: 'CompanyBillManage'
        },
        component: (resolve) => require(['./views/tariff-company-bill-manage.vue'], resolve)
    }
];

export default routers;