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
        component: (resolve) => require(['./views/index-home.vue'], resolve)
    }
];

export default routers;