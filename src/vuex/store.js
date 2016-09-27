import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入各个模块的初始状态和 mutations
import live from './modules/live'
export default new Vuex.Store({
    // 组合各个模块
    modules: {
        live
    }
})