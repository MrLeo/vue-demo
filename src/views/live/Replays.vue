<script>
    import {
            setVideoInfo,
            setSnsInfo
    } from '../../vuex/actions'

    import _wap_config from 'utils/jx/config'
    import jx_ajax from 'utils/jx/ajax'
    import jx_common from 'utils/jx/common'

    export default {
        name: "replays",
        vuex: {
            getters: {
                video: ({live}) => live.video,
                replayList: ({live}) => live.replayList
            },
            actions: {
                setVideoInfo,
                setSnsInfo
            }
        },
        data(){
            return {
                defaultImg: '/static/img/logo_default_s.jpg'//默认图片地址
            }
        },
        methods: {
            goToLive(liveInfo){
                const _self = this;
                //router.go({path: '/live/' + liveInfo.liveId + '/replay'})
                _self.$dispatch('changeVideo', {"liveId": liveInfo.liveId, "type": "replay"})
            },
            convertLiveCover(src){
                return !!src ? (/^https?:.*/.test(src) ? src : _wap_config.imgUrl + src) : this.defaultImg
            }
        }
    }
</script>
<template>
    <ul class="list">
        <li v-for="item in replayList.list" @click="goToLive(item)">
            <div class="listbox pos-re"
                 :style="{ background : 'url(' + convertLiveCover(item.liveCover) + ') no-repeat center center / cover'}">
                <!--<img :src="item.liveCover | canvertUrl">-->
                <span class="state txtalign-c" v-text="item.liveStatus=='START_LIVE'?'直播':'回放'"></span>
                <!--<span class="name" v-text="item.userInfo?(item.userInfo.nickname&&''):''"></span>-->
                <span class="num" v-cloak>{{item.viewCount}}看过</span>
            </div>
            <div class="liverName" v-cloak>
                <i></i>{{item.liveTitle}}
            </div>
        </li>
    </ul>
</template>
<style>
    @import '../../assets/css/liveList.css';
</style>
