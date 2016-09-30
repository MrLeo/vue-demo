import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {configRouter} from './config_router'
import infiniteScroll from 'vue-infinite-scroll'
import filter from './filter'
import App from './App'

/**
 * 注册插件
 */
Vue.use(VueResource)// Ajax数据请求请求
Vue.use(VueRouter)// 路由
Vue.use(infiniteScroll)//无限滚动 https://github.com/ElemeFE/vue-infinite-scroll
Vue.use(filter)//自定义过滤器

/**
 * VueResource配置
 */
//Vue.http.options.xhr = {withCredentials: true}

/**
 * 路由配置
 * @type {Router}
 */
Vue.config.debug = true//开启debug模式
var router = new VueRouter({
    //root:'/live',
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    suppressTransitionError: false // TODO：开发环境
    //suppressTransitionError: true // TODO：生产环境
})
window.router = router
configRouter(router)
router.start(App, '#app')//路由起始页

/*new Vue({
 el: 'body',
 components: {App}
 })*/

