/**
 * live
 *
 * @Author: lxbin
 * @Date: 2016/9/21  0021
 * @Time: 15:28
 * Created with JetBrains WebStorm.
 */

import _wap_config from 'utils/jx/config'
import jx_ajax from 'utils/jx/ajax'
import jx_common from 'utils/jx/common'
import date from 'utils/convert/date'

export default {
    /**
     * 获取直播项
     * @param id 直播ID
     * @example
     *      getLiveRecord(387)
     */
    getLiveRecord(id) {
        let promise = jx_ajax.get(_wap_config.api, {
            _mt: 'live.getLiveRecord',
            liveId: id
        })
        return promise
    },

    /**
     * 获取直播列表
     * @param liveRecordAPIPageQuery 直播列表分页条件查询
     * @example
     *      getLiveList({
 *          //userId: _self.video.userId,
 *          //liveStatus: ["直播", "回放"],
 *          //locationCityCode: _self.video.locationCityCode,
 *          pageNo: _self.replayList.pageNo + 1,
 *          pageSize: _self.replayList.pageSize
 *      })
     */
    getLiveList(liveRecordAPIPageQuery){

    },

    /**
     * 获取用户直播列表
     * @param liveRecordListQuery
     * @example
     *      getLiveListByUserId({
 *          userId: _self.video.userId,
 *          liveStatus: ["回放"],
 *          pageNo: _self.wonderfulList.pageNo + 1,
 *          pageSize: _self.wonderfulList.pageSize
 *      })
     */
    getLiveListByUserId(liveRecordListQuery){

    }
}
