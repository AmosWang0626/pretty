import Vuex from 'Vuex';

// 状态管理
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++;
        }
    }
});

export default store;