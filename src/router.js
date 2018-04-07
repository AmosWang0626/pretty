const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/hello',
        meta: {
            title: '啦啦啦'
        },
        component: (resolve) => require(['./views/home.vue'], resolve)
    },
    {
        path: '/login',
        meta: {
            title: 'Login'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
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
    }
];

export default routers;