import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import Util from './libs/util';
import App from './app.vue';
import Routers from './router';
import VueRouter from 'vue-router';
import iViewArea from 'iview-area';
import quillEditor from 'vue-quill-editor';

import 'iview/dist/styles/iview.css';

Vue.use(Vuex);
Vue.use(iView);
Vue.use(iViewArea);
Vue.use(VueRouter);
Vue.use(quillEditor);

// 状态管理
const store = new Vuex.Store({
    state: {
        subMenuData: []
    },
    mutations: {
        changeSubMenuData(state, array) {
            state.subMenuData = array;
        }
    }
});

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
    store: store,
    render: h => h(App)
});