/*
* @Author: liuyuanyuan
* @Date:   2016-06-20 12:21:05
* @Last Modified by:   liuyuanyuan
* @Last Modified time: 2016-07-07 11:49:29
*/

'use strict';

var _contpointer_config = {api : _wap_config.contpointersApi}

//公共参数
_contpointer_config.monitorsAction=function(params,user_id,activity_info){
   $.monitors(_contpointer_config.api,params,jx_ajax.getAid(),_wap_config.domid,user_id,jx_ajax.getCh(),activity_info);
};
