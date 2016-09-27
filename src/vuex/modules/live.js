// 该模块的初始状态
const state = {
    //直播相关信息
    video: {
        /**
         * live
         */
        liveId: 0, //直播ID
        userId: 0, //用户ID
        roomId: 0, //直播间ID
        liveCategoryCode: 0, //直播类别code
        liveCategoryName: "", //直播类别name
        liveTitle: "", //直播标题
        liveCover: "", //直播封面
        liveStatus: "", //直播状态:直播、结束、回放
        locationCityCode: "", //城市code
        locationCityName: "", //城市名称
        startDate: 0, //开始时间
        endDate: 0, //结束时间
        onlineCount: 0, //在线人数
        viewCount: 0, //观看次数
        replayUrls: [], //回放地址
        pushStreamUrl: "", //拉流地址
        pullStreamUrl: "", //推流地址
        userInfo: {}, //用户信息
        liveConfig: {}, //直播配置
        /**
         * snscenter
         */
        followingCount: 0, //关注数量
        fansCount: 0, //粉丝数量
        ugcCount: 0 //UGC数量
    },
    //精彩推荐
    wonderfulList: {
        pageNo: 0, // 第几页
        pageSize: 10, // 一页多少
        totalCount: 0, // 共多少条
        hasNext: true, // 是否有下一页
        list: []
    },
    //Ta的回放
    replayList: {
        pageNo: 0, // 第几页
        pageSize: 10, // 一页多少
        totalCount: 0, // 共多少条
        hasNext: true, // 是否有下一页
        list: []
    }
}

//导入mutation改变状态
// import {
//     SET_VIDEO_INFO,
//     ADD_WONDERFULL_LIST,
//     REMOVE_WONDERFULL_LIST,
//     ADD_REPLAY_LIST,
//     REMOVE_REPLAY_LIST
// } from '../mutation-types'
const SET_VIDEO_INFO = 'SET_VIDEO_INFO'
const SET_SNS_INFO = 'SET_SNS_INFO'
const ADD_WONDERFULL_LIST = 'ADD_WONDERFULL_LIST'
const REMOVE_WONDERFULL_LIST = 'REMOVE_WONDERFULL_LIST'
const ADD_REPLAY_LIST = 'ADD_REPLAY_LIST'
const REMOVE_REPLAY_LIST = 'REMOVE_REPLAY_LIST'

// 相关的 mutations
const mutations = {
    //添加video信息
    [SET_VIDEO_INFO](state, videoInfo) {
        state.video.liveId = videoInfo.liveId; //直播ID
        state.video.userId = videoInfo.userId; //用户ID
        state.video.roomId = videoInfo.roomId; //直播间ID
        state.video.liveCategoryCode = videoInfo.liveCategoryCode; //直播类别code
        state.video.liveCategoryName = videoInfo.liveCategoryName; //直播类别name
        state.video.liveTitle = videoInfo.liveTitle; //直播标题
        state.video.liveCover = videoInfo.liveCover; //直播封面
        state.video.liveStatus = videoInfo.liveStatus; //直播状态:直播、结束、回放
        state.video.locationCityCode = videoInfo.locationCityCode; //城市code
        state.video.locationCityName = videoInfo.locationCityName; //城市名称
        state.video.startDate = videoInfo.startDate; //开始时间
        state.video.endDate = videoInfo.endDate; //结束时间
        state.video.onlineCount = videoInfo.onlineCount; //在线人数
        state.video.viewCount = videoInfo.viewCount; //观看次数
        state.video.replayUrls = videoInfo.replayUrls; //回放地址
        state.video.pushStreamUrl = videoInfo.pushStreamUrl; //拉流地址
        state.video.pullStreamUrl = videoInfo.pullStreamUrl; //推流地址
        state.video.userInfo = videoInfo.userInfo; //用户信息
        state.video.liveConfig = videoInfo.liveConfig; //直播配置
    },
    //添加SNS信息
    [SET_SNS_INFO](state, snsInfo) {
        state.video.followingCount = snsInfo.followingCount
        state.video.fansCount = snsInfo.fansCount
        state.video.ugcCount = snsInfo.ugcCount
    },
    //添加“精选推荐”列表项
    [ADD_WONDERFULL_LIST](state, wonderfuls) {
        state.wonderfulList.pageNo = wonderfuls.pageNo
        state.wonderfulList.pageSize = wonderfuls.pageSize
        state.wonderfulList.totalCount = wonderfuls.totalCount
        state.wonderfulList.hasNext = wonderfuls.hasNext

        let list = wonderfuls.list
        for (var key in list) {
            if (state.wonderfulList.list.hasOwnProperty(key))
                continue
            state.wonderfulList.list.push(list[key])
        }
    },
    //移除“精选推荐”列表项
    [REMOVE_WONDERFULL_LIST](state) {
        if (state.wonderfulList.list) {
            state.wonderfulList.list = []
        }
    },
    //添加“Ta的回放”列表项
    [ADD_REPLAY_LIST](state, replays) {
        state.replayList.pageNo = replays.pageNo
        state.replayList.pageSize = replays.pageSize
        state.replayList.totalCount = replays.totalCount
        state.replayList.hasNext = replays.hasNext

        let list = replays.list
        for (var key in list) {
            if (state.replayList.list.hasOwnProperty(key))
                continue
            state.replayList.list.push(list[key])
        }
    },
    //移除“Ta的回放”列表项
    [REMOVE_REPLAY_LIST](state) {
        if (state.replayList.list) {
            state.replayList.list = []
        }
    }
}

export default {
    state,
    mutations
}
