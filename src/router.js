const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/home',
        meta: {
            title: '啦啦啦'
        },
        component: (resolve) => require(['./views/base-user.vue'], resolve)
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
        component: (resolve) => require(['./views/tariff-standard.vue'], resolve)
    },
    {
        path: '/company',
        meta: {
            title: 'Company'
        },
        component: (resolve) => require(['./views/tariff-company.vue'], resolve)
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
        path: '/userManage',
        meta: {
            title: 'Company'
        },
        component: (resolve) => require(['./views/base-user-manage.vue'], resolve)
    }
];

export default routers;