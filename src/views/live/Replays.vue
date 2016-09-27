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
        methods: {
            goToLive(liveInfo){
                const _self = this;

                router.go({path: '/live/' + liveInfo.liveId + '/replay'})
                _self.$dispatch('changeVideo', liveInfo.liveId)
            }
        }
    }
</script>
<template>
    <ul class="list">
        <li v-for="item in replayList.list" @click="goToLive(item)">
            <div class="listbox pos-re"
                 v-bind:style="{ background : 'url(' + item.liveCover + ') no-repeat center center / cover'}">
                <!--<img :src="item.liveCover | canvertUrl">-->
                <span class="state txtalign-c" v-text="item.liveStatus"></span>
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
