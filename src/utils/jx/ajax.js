/**
 * jx-ajax
 * 首先要引入jQuery.js、md5.js
 * @Author: lxbin
 * @Date: 2016/9/22  0022
 * @Time: 13:51
 * Created with JetBrains WebStorm.
 */

import $ from 'jquery'
import md5 from 'blueimp-md5'
import Cookies from 'js-cookie'

import _wap_config from './config'
import jx_common from './common'
import jx_common_app from './common-app'

export default {
    post: function (url, obj, successFunc, errorFunc, noLoginCallback) {
        const _self = this;
        let type = obj.type || "POST";
        return _self.ajax(type, url, obj, successFunc, errorFunc, noLoginCallback);
    },
    get: function (url, obj, successFunc, errorFunc, noLoginCallback) {
        const _self = this;
        return _self.ajax("GET", url, obj, successFunc, errorFunc, noLoginCallback);
    },
    ajax: function (type, url, obj, successFunc, errorFunc, noLoginCallback) {
        const _self = this;
        let _jx_async = obj["async"];
        if (jx_common.isNull(_jx_async)) {
            _jx_async = true;
        }
        let promise = new Promise((resolve, reject)=> {
            let _jx_ajax_frame = $.ajax({
                xhrFields: {
                    withCredentials: true //
                },
                crossDomain: true,
                type: type,
                async: _jx_async,
                url: url,
                timeout: _wap_config.timeout,
                data: _self.encryptRequestParam(obj),
                success: function (res) {
                    if (!res) {
                        jx_common.tip("api无数据返回");
                        //reject()
                        return;
                    }
                    if (res["stat"]["code"] == "-160" || res["stat"]["code"] == "-360") {
                        if (jx_common.isInJXApp()) {
                            jx_common.cleanCookie("_wtk");
                            jx_common.cleanCookie("_uid");
                        } else {
                            jx_common.cleanCookie("jx_token");
                            jx_common.cleanCookie("jx_uid");
                            jx_common.cleanCookie("jx_u_phone");
                        }
                        if (noLoginCallback && typeof noLoginCallback == "function") {
                            noLoginCallback();
                            //reject()
                            return false;
                        }
                        if (jx_common.isInJXApp()) {
                            jx_common_app.openAppLogin();
                        } else {
                            jx_common.tip("token失效重新登录");
                            //reject()
                            window.setTimeout(function () {
                                jx_common.openUrl("../../view/login/login.html?returnUrl=" + encodeURIComponent(window.location.href));
                            }, 1000);
                        }
                        return;
                    }
                    if (res["stat"]["code"] == "-260") {
                        jx_common.tip("请输入正确验证码");
                        //reject()
                        return;
                    }
                    if (res["stat"]["code"] != 0) {
                        jx_common.tip("api错误(" + res["stat"]["code"] + ")");
                        //reject()
                        return;
                    }
                    if (jx_common.isNull(res["content"])) {
                        jx_common.tip("无结果数据");
                        //reject()
                        return;
                    }
                    let errorEntry = res["stat"]["stateList"][0]
                    if (errorEntry["code"] == "-100") {
                        jx_common.tip("服务器开小差!");
                        //reject()
                        return;
                    }
                    successFunc && (typeof successFunc == "function") && successFunc(res["content"][0], errorEntry, res["stat"])
                    resolve(res["content"][0])
                },
                error: function () {
                    errorFunc && (typeof errorFunc == "function") && errorFunc();
                    jx_common.tip("系统繁忙");
                    //reject()
                    return;
                },
                complete: function (XMLHttpRequest, status) {
                    if (status == 'timeout') { //超时,status还有success,error等值的情况
                        _jx_ajax_frame.abort();
                        jx_common.tip("系统超时");
                        //reject()
                    }
                }
            })
        })
        return promise
    },
    encryptRequestParam: function (options) {
        const _self = this,
            _params = {};
        let params = {};
        try {
            _params._sm = _wap_config.sm;
            _params._aid = _self.getAid();
            _params._domid = _wap_config.domid;
            _params._ft = _wap_config.ft;
            _params._ch = _self.getCh();
            _params._tk = jx_common.getTk();
            _params._uid = jx_common.getUid();
            _params._did = jx_common.getDid();
            _params._dsig = jx_common.getDsig();

            let s = "";
            let keys = [];
            params = $.extend(_params, options);
            for (let k in params) {
                keys.push(k);
            }
            keys.sort();
            for (let i = 0; i < keys.length; i++) {
                s = s + keys[i] + '=' + params[keys[i]];
            }
            s += _wap_config.domainUrl;
            params._sig = md5(s);

            return params;
        } catch (e) {
            jx_common.tip("本地加签错误");
        }
        return params;
    },
    getCh: function () {
        let ch = jx_common.getCookie("jx_ch");
        if (!jx_common.isNull(ch)) {
            return ch;
        }
        if (jx_common.isInJXApp()) {
            return _wap_config.ch.jxapp;
        }
        if (jx_common.isWxbrowser()) {
            return _wap_config.ch.weixin;
        }
        return _wap_config.ch.jxwap;
    },
    getAid: function () {
        if (jx_common.isInJXApp()) {
            return _wap_config.aid.jxapp;
        }
        if (jx_common.isWxbrowser()) {
            return _wap_config.aid.weixin;
        }
        return _wap_config.aid.wap;
    }
}
