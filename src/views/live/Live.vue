<script>
    import vVideo from 'components/Video'
    import vToload from 'components/toload'
    import {
            setVideoInfo,
            setSnsInfo,
            addWonderfullList,
            removeWonderfullList,
            addReplayList,
            removeReplayList
    } from '../../vuex/actions'
    import _wap_config from 'utils/jx/config'
    import jx_ajax from 'utils/jx/ajax'
    import jx_common from 'utils/jx/common'
    import date from 'utils/convert/date'

    export default {
        //组件名
        name: 'Live',
        //组件
        components: {
            vVideo,
            vToload
        },
        //路由
        route: {
            data: function () {
                const _self = this
                _self.busy = !_self[_self.$route.name].hasNext
                document.title = _self.video.liveTitle
            }/*,
             activate(){
             console.log(`[Leo]5.activate`)
             },
             deactivate(){
             console.log('[Leo]4.deactivate')
             },
             canActivate(){
             console.log('[Leo]3.canActivate')
             },
             canDeactivate(){
             console.log('[Leo]2.canDeactivate')
             },
             canReuse(){
             console.log('[Leo]1.canReuse')
             }*/
        },
        //vuex组件状态
        vuex: {
            //获取vuex状态数据
            getters: {
                video: ({live}) => live.video,
                replayList: ({live}) => live.replayList,
                wonderfulList: ({live}) => live.wonderfulList
            },
            //状态变更事件
            actions: {
                setVideoInfo,
                setSnsInfo,
                addWonderfullList,
                removeWonderfullList,
                addReplayList,
                removeReplayList
            }
        },
        //从父级通过html特性传递来的数据
        props: [],//{id:{ type: Number, default: 0 }}
        //实例数据
        data(){
            return {
                defaultImg: '/static/img/logo_default_s.jpg',//默认图片地址
                busy: false,
                showshar: false,
                showVideo: false,
                liveId: 0
            }
        },
        //计算属性
        computed: {
            /**
             * 计算是否显示视频控制栏
             * @returns {number|*|string}
             */
            showControls(){
                const _self = this
                if (_self.video.liveStatus == "REPLAY_LIVE") {
                    return true
                }
                return false
            },
            /**
             * 计算是否显示直播的在线人数
             * @returns {boolean}
             */
            showOnline(){
                const _self = this
                if (_self.video.liveStatus == "START_LIVE") {
                    return true
                }
                return false
            },
            /**
             * 获取视频地址
             */
            getVideoSrc(){
                return this.pushVideoUrls()
            },
            /**
             * 头像地址转码
             */
            getAvatarPicUrl(){
                const _self = this
                return !!_self.video && !!_self.video.userInfo && !!_self.video.userInfo.avatar ? jx_common.getPic(_self.video.userInfo.avatar) : '/static/img/tou_xiang.png'
            }
        },
        //数据观察
        watch: {
            liveId(){
                const _self = this
                console.log('[Leo] => ', 'live id change', _self.liveId)
                let urls = _self.pushVideoUrls()
                _self.showVideo = false
                !!urls.length && !!urls[0] ? (()=> {
                    _self.showVideo = true
                    console.log('[Leo] => ', '显示视频')
                })() : (()=> {
                    //jx_common.tip('视频出错了(>﹏<。)～呜呜呜……，换一个看看')
                    _self.showVideo = false
                    console.log('[Leo] => ', '不显示视频')
                })()
            }
        },
        created(){
            const _self = this
            //const liveId = this.$route.query.id//接收?后面的查询参数
            _self.liveId = this.$route.params.id//接收/后面的路由参数
            console.log('[Leo]Live created => ', _self.liveId)
            router.go({
                name: 'wonderfulList',
                append: true
            })
            this.initAjax(_self.liveId)
        },
        //生命周期：组件准备好时的一个回调
        ready(){
        },
        //生命周期：组件即将被销毁时触发回调
        beforeDestroy(){
        },
        //实例方法
        methods: {
            convertLiveCover(src){
                return !!src ? (/^https?:.*/.test(src) ? src : _wap_config.imgUrl + src) : this.defaultImg
            },
            /**
             * 无限滚动
             * https://github.com/ElemeFE/vue-infinite-scroll
             */
            loadMore() {
                const _self = this
                let currentRoute = _self.$route.name
                _self.busy = true;
                if (!!_self[currentRoute].hasNext) {
                    switch (currentRoute) {
                        case 'wonderfulList':
                            /*_self.wonderfulList.pageNo = _self.wonderfulList.pageNo + 1
                             _self.getWonderfulList()*/
                            break;
                        case 'replayList':
                            /*_self.replayList.pageNo = _self.replayList.pageNo + 1
                             _self.getReplayList()*/
                            break;
                    }
                    _self.busy = false;
                }
            },
            initAjax(id){
                const _self = this
                let promise = _self.getLiveRecord(id)
                _self.getWonderfulList()
                /*promise.then((json)=> {
                 console.log('[Leo]get live record => ', json)
                 document.title = json.liveTitle
                 _self.setVideoInfo(json)
                 _self.queryUserSnsCountInfo()
                 _self.getWonderfulList()
                 _self.getReplayList()
                 })*/
            },
            /**
             * 获取直播项信息
             * @param id 直播ID
             */
            getLiveRecord(id){
                const _self = this
                try {
                    return jx_ajax.get(_wap_config.api, {
                        _mt: 'live.getLiveRecord',
                        liveId: id
                    }, (json)=> {
                        console.log('[Leo]getLiveRecord => ', json)
                        if (json) {
                            document.title = json.liveTitle
                            json.liveCover = !!json.liveCover ? (/^https?:.*/.test(json.liveCover) ? json.liveCover : _wap_config.imgUrl + json.liveCover) : _self.defaultImg
                            _self.setVideoInfo(json)
                            setTimeout(_self.isShowVideo, 0)
                        }
                        _self.queryUserSnsCountInfo()
                        _self.getReplayList()
                        /*_self.getWonderfulList()*/
                    })
                } catch (e) {
                    jx_common.tip('无法获取直播信息')
                }
            },
            /**
             * ajax获取用户相关的SNS数据
             */
            queryUserSnsCountInfo(){
                try {
                    const _self = this
                    return jx_ajax.get(_wap_config.api, {
                        _mt: 'snscenter.queryUserSnsCountInfo',
                        theUserId: _self.video.userInfo.userId
                    }, res=> {
                        if (res) {
                            _self.setSnsInfo(res)
                        }
                    })//.then((res)=>_self.setSnsInfo(res))
                } catch (e) {
                    jx_common.tip('获取关注信息失败')
                }
            },
            /**
             * ajax获取推荐直播列表
             */
            getWonderfulList(){
                try {
                    const _self = this
                    let liveRecordAPIPageQuery = {
                        pageNo: _self.wonderfulList.pageNo,
                        pageSize: _self.wonderfulList.pageSize
                    }
                    return jx_ajax.get(_wap_config.api, {
                        _mt: 'live.getLiveList',
                        liveRecordAPIPageQuery: JSON.stringify(liveRecordAPIPageQuery)
                    }, json=> {
                        if (json) {
                            _self.addWonderfullList(json)
                        }
                    })//.then((json)=>_self.addWonderfullList(json))
                } catch (e) {
                    jx_common.tip('无法获取精彩推荐')
                }
            },
            /**
             * ajax获取回放列表
             */
            getReplayList(){
                try {
                    const _self = this
                    let liveRecordListQuery = {
                        userId: _self.video.userInfo.userId,
                        liveStatus: ["REPLAY_LIVE"],
                        pageNo: _self.replayList.pageNo,
                        pageSize: _self.replayList.pageSize
                    }
                    return jx_ajax.get(_wap_config.api, {
                        _mt: 'live.getLiveListByUserId',
                        liveRecordListQuery: JSON.stringify(liveRecordListQuery)
                    }, json=> {
                        if (json) {
                            _self.addReplayList(json)
                        }
                    })//.then((json)=>_self.addReplayList(json))
                } catch (e) {
                    jx_common.tip('无法获取回放列表')
                }
            },
            /**
             * 是否显示视频播放器
             */
            isShowVideo(){
                const _self = this
                let urls = _self.pushVideoUrls()
                _self.showVideo = false
                !!urls.length && !!urls[0] ? (()=> {
                    _self.showVideo = true
                    console.log('[Leo]showVideo => ', '显示视频')
                })() : (()=> {
                    //jx_common.tip('视频出错了(>﹏<。)～呜呜呜……，换一个看看')
                    _self.showVideo = false
                    console.log('[Leo]showVideo => ', '不显示视频')
                })()
            },
            /**
             * 组装视频地址数组
             */
            pushVideoUrls(){
                try {
                    const _self = this;
                    let urls = []
                    console.log('[Leo]pushVideoUrls:liveStatus => ', _self.video.liveStatus)
                    switch (_self.video.liveStatus) {
                        case "REPLAY_LIVE":
                            //urls = _self.video.replayUrls
                            for (let url of _self.video.replayUrls) {
                                urls.push({
                                    src: url,
                                    type: 'video/mp4'
                                })
                            }
                            break;
                        case "START_LIVE":
                            if (!!_self.video.pullStreamUrl) {
                                urls.push({
                                    src: _self.video.pullStreamUrl,
                                    type: 'application/x-mpegURL'
                                })
                            }
                            //TODO:测试直播HLS视频源播放 https://now.qq.com/h5/index.html
                            /*urls.push({
                             src: 'http://106.38.183.21:1863/182971339236992842.m3u8?buname=h5_nowlive&apptype=H5_android&vKey=3492920EF6C3DC6A34FADC6709CDD14DA6F149CAF77E2C8172A6CA98834FA1959D1269BFEB4C1202&stdfrom=test',
                             type: 'application/x-mpegURL'
                             })*/
                            break;
                        default:
                            break;
                    }
                    console.log('[Leo]组装后的URLS => ', urls)
                    return urls
                } catch (e) {
                    jx_common.tip('视频地址解析失败')
                    return []
                }
            },
            /**
             * 分享
             */
            toshar(){
                if (jx_common.isWxbrowser()) {
                    this.showshar = true
                } else {
                    jx_common.tip("请通过浏览器去分享给小伙伴吧！");
                }
            },
            closeShar(){
                this.showshar = false
            }
        },
        //事件监听
        events: {
            changeVideo(liveInfo){
                if (this.$route.params.id == liveInfo.liveId) return //没有改变主播
                const _self = this
                _self.showVideo = false
                let promise = _self.getLiveRecord(liveInfo.liveId)
                promise.then((json)=> {
                    json.liveCover = !!json.liveCover ? (/^https?:.*/.test(json.liveCover) ? json.liveCover : _wap_config.imgUrl + json.liveCover) : _self.defaultImg
                    _self.setVideoInfo(json)
                    _self.liveId = liveInfo.liveId
                    router.go({path: '/live/' + liveInfo.liveId + '/' + liveInfo.type})
                    if (json.liveTitle)
                        document.title = json.liveTitle
                    _self.queryUserSnsCountInfo()

                    //_self.wonderfulList.pageNo = 1
                    //_self.getWonderfulList()

                    if (_self.video.userInfo && _self.video.userInfo.userId != json.userInfo.userId) {
                        _self.replayList.pageNo = 1
                        _self.removeReplayList()
                        _self.getReplayList()
                    }
                })
            }
        }
    }
</script>
<template>
    <div class="toshar" v-show='showshar' @click="closeShar">
        <i></i>
        <p>点击右上角分享</p>
    </div>
    <div v-infinite-scroll="loadMore()" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="firstRecommend">
            <div class="vedioBox pos-re">
                <template v-if="showVideo">
                    <v-video
                            v-bind:video-src="getVideoSrc"
                            v-bind:video-poster="video.liveCover"
                            v-bind:video-controls="showControls">
                    </v-video>
                </template>
                <template v-else>
                    <img :src=video.liveCover>
                </template>
                <span class="online txtalign-l" v-if="showOnline"
                      v-cloak><span>在线: {{video.onlineCount}}</span><br/><span>房号: {{video.roomId}}</span></span>
            </div>
            <div class="msgBox">
                <h3 v-cloak>{{video.liveTitle}}</h3>
                <span class="touPic"><img :src="getAvatarPicUrl"/></span>
                <span class="liver" v-cloak>{{video.userInfo&&video.userInfo.nickname}}<i
                        :class="video.userInfo&&(!!video.userInfo.gender?'boy':'girl')"></i></span><br/>
                <span class="focus">关注 <i v-text="video.followingCount"></i></span>
                <span class="fans">粉丝 <i v-text="video.fansCount"></i></span>
                <div class="shar" @click="toshar"><i></i><span>分享</span></div>
            </div>
        </div>
        <div class="liveList">
            <ul class="listTab">
                <li class="txtalign-c active" v-link="{name:'wonderfulList',activeClass:'active',append:true}">精彩推荐</li>
                <li class="txtalign-c" v-link="{name:'replayList',activeClass:'active',append:true}">Ta的回放</li>
            </ul>
            <router-view keep-alive></router-view>
        </div>
        <v-toload></v-toload>
    </div>
</template>
<style>
    [v-cloak] {
        display: none;
    }

    .pos-re {
        position: relative;
    }

    .vedioBox {
        width: 100%;
        height: 12rem;
        overflow: hidden;
    }

    .online {
        width: 4.475rem;
        height: 2.25rem;
        background: rgba(0, 0, 0, 0.15);
        color: #fff;
        font-size: 0.625rem;
        line-height: 1.125rem;
        position: absolute;
        bottom: 0.75rem;
        left: 0.75rem;
        border-radius: 0.2rem;
        padding-left: 0.375rem;
    }

    .msgBox {
        height: 6rem;
        padding: 0 0.75rem;
        background-color: #fff;
    }

    .msgBox h3 {
        font-size: 0.75rem;
        line-height: 2.425rem;
    }

    .msgBox span {
        display: inline-block;
        margin-left: 0.375rem;
        line-height: 1.125rem;
        font-size: 0.625rem;
    }

    .msgBox span i {
        color: #333;
        font-weight: bold;
    }

    .touPic {
        width: 2.375rem;
        height: 2.375rem;
        border-radius: 50%;
        overflow: hidden;
        float: left;
    }

    .liver i {
        padding-right: 1.0rem;
        background-position: 0.13rem -0.15rem;
        background-size: 0.7rem 1rem;
        background-repeat: no-repeat;
    }

    .liver i.girl {
        background-image: url(/static/liveStreaming/img/girl.png);
    }

    .liver i.boy {
        background-image: url(/static/liveStreaming/img/boy.png);
    }

    .shar {
        position: relative;
        float: right;
        width: 1.6rem;
        height: 2.125rem;
        margin-top: -1rem;
        text-align: center;
    }

    .shar::before {
        content: '';
        position: absolute;
        left: -0.7rem;
        height: 100%;
        width: 0;
        border-left: 1px solid #e1e1e1;
        padding-left: 10px;
    }

    .shar i {
        display: block;
        width: 100%;
        height: 1.125rem;
        background: url(/static/liveStreaming/img/share.png) no-repeat;
        background-position: center center;
        background-size: 1.2rem 1rem;
    }

    .shar span {
        margin: 0;
    }

    .liveList {
        margin-top: 0.5rem;
        background-color: #fff;
    }

    .listTab li {
        width: 50%;
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 0.75rem;
        color: #555;
        float: left;
        box-sizing: border-box;
        overflow: hidden;
    }

    .listTab .active {
        color: #FFAF00;
        border-bottom: 2px solid #FFAF00;
    }

    /* 分享浮层 */
    .toshar {
        width: 100%;
        height: 100%;
        z-index: 9999999999;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.45);
        color: #fff;
    }

    .toshar i {
        display: inline-block;
        width: 2.625rem;
        height: 5.5rem;
        background: url(/static/liveStreaming/img/arrow.png) no-repeat;
        background-size: 100%;
        float: right;
        margin-top: 1.25rem;
        margin-right: 0.75rem;
    }

    .toshar p {
        font-size: 0.75rem;
        float: right;
        margin-top: 5.625rem;
        margin-right: 0.5rem;
    }

</style>

