import Vue from 'vue';
import iView from 'iview';
import Util from './libs/util';
import App from './app.vue';
import Routers from './router';
import VueRouter from 'vue-router';
import iViewArea from 'iview-area';
import quillEditor from 'vue-quill-editor';

import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(iViewArea);
Vue.use(VueRouter);
Vue.use(quillEditor);

// 路由配置
const RouterConfig = {
    hashbang: true,
    history: false,
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});