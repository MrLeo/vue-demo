/**
 * 路由配置
 */

import Live from 'views/live/Live'
import Wonderfuls from 'views/live/Wonderfuls'
import Replays from 'views/live/Replays'

export function configRouter(router) {
    /**
     * 路由映射
     */
    router.map({
        '/live/:id': {//直播
            name: 'live',
            title: '直播分享',
            component: Live,
            subRoutes: {
                '/':{
                    name: 'wonderfulList',
                    title: '精彩推荐',
                    component:Wonderfuls
                },
                '/wonderful': {//精彩推荐
                    name: 'wonderfulList',
                    title: '精彩推荐',
                    component: (resolve) => require(['views/live/Wonderfuls'], resolve) //定义为动态组件载入 lazy load//Wonderfuls//
                },
                '/replay': {//Ta的回放
                    name: 'replayList',
                    title: 'Ta的回放',
                    component: (resolve) => require(['views/live/Replays'], resolve)//定义为动态组件载入 lazy loadReplays//
                }
            }
        }
    })

    /**
     * 重定向规则
     */
    router.redirect({
        '/': '/live'
    })

    /**
     * For every new route scroll to the top of the page
     */
    router.beforeEach(function () {
        window.scrollTo(0, 0)
    })

    /**
     * document title change
     */
    // router.afterEach((transition) => {
    //     document.title = transition.to.title || '直播分享'
    //     if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //         let src = '/static/fixrouter.html?' + Math.random()
    //         iframeLoad(src)
    //     }
    // })

    /**
     * fix ios title刷新不了的bug
     * @iframeLoad
     * @author hiluluke
     */
    // const iframeLoad = function (src) {
    //     let iframe = document.createElement('iframe')
    //     iframe.style.display = 'none'
    //     iframe.src = src
    //     document.body.appendChild(iframe)
    //     iframe.addEventListener('load', function () {
    //         setTimeout(function () {
    //             iframe.remove()
    //         }, 0)
    //     })
    // }

}
