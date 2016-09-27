/**
 * jx-ajax
 * 首先要引入jQuery.js、md5.js
 * author:zhangjianfeng
 * date:2016-05-07
 */
const $ = require('jquery');
const md5 = require('blueimp-md5');
const jx_common = require('./jx-common');

var _wap_config = {
    api: "http://api.test.jiuxiulvxing.com/web.api",
    domainUrl: "0ce37dd6b927730161a1e559c2336d0a",
    imgUrl: "http://img.test.yimayholiday.com/v1/tfs/",
    linkUrl: 'http://m.test.jiuxiulvxing.com/',
    contpointersApi: 'http://test.log.jiuxiulvxing.com/newlogwithgzip.jsp',
    appid: 'wx14e984a0a6863004',
    wxcenter: "http://weixin.test.jiuxiulvxing.com/",
    yydbUrl: "http://hd.test.jiuxiulvxing.com/yydb",
    movieUrl: "http://s0.test.jiuxiulvxing.com/Test/movieticket/view/content/login.html?ch=dstyyy_360zqhd"
};
var _linkUrl = window.location.href;

//2套环境
if (_linkUrl.indexOf("m2.test.jiuxiulvxing.com") != -1) {
    _wap_config.api = "http://api.secondtest.jiuxiulvxing.com/web.api";
}

//预发
if (_linkUrl.indexOf("m.pre.jiuxiulvxing.com") != -1) {
    _wap_config = {
        api: "http://api.pre.jiuxiulvxing.com/web.api",
        domainUrl: "0ce37dd6b927730161a1e559c2336d0a",
        imgUrl: "http://img.yimayholiday.com/v1/tfs/",
        linkUrl: 'http://m.pre.jiuxiulvxing.com/',
        contpointersApi: 'http://log.jiuxiulvxing.com/newlogwithgzip.jsp',
        appid: 'wx14e984a0a6863004',
        wxcenter: "http://wxapi.pre.jiuxiulvxing.com/",
        yydbUrl: "http://m.pre.jiuxiulvxing.com/view/listpage/listpage.html?code=JIUXIU_WAP_HOME_YY_2&title=" + encodeURIComponent("冰点特惠旅行"),
        movieUrl: "http://mt.hd.pre.jiuxiulvxing.com/view/content/login.html?ch=dstyyy_360zqhd"
    }
}

//线上
if (_linkUrl.indexOf("m.jiuxiulvxing.com") != -1
    || _linkUrl.indexOf("m.hb.jiuxiulvxing.com") != -1
    || _linkUrl.indexOf("m.9xiulvxing.com") != -1
    || _linkUrl.indexOf("app.jiuxiulvxing.com") != -1) {
    _wap_config = {
        api: "http://api.jiuxiulvxing.com/web.api",
        domainUrl: "0ce37dd6b927730161a1e559c2336d0a",
        imgUrl: "http://img.yimayholiday.com/v1/tfs/",
        linkUrl: 'http://m.jiuxiulvxing.com/',
        contpointersApi: 'http://log.jiuxiulvxing.com/newlogwithgzip.jsp',
        appid: 'wx1deb965a51860f61',
        wxcenter: "http://wxapi.jiuxiulvxing.com/",
        yydbUrl: "http://m.jiuxiulvxing.com/view/listpage/listpage.html?code=JIUXIU_WAP_HOME_YY_2&title=" + encodeURIComponent("冰点特惠旅行"),
        movieUrl: "http://mt.hd.jiuxiulvxing.com/view/content/login.html?ch=dstyyy_360zqhd"
    }
}

//性能测试
if (_linkUrl.indexOf("m.xntest.jiuxiulvxing.com") != -1) {
    _wap_config = {
        api: "http://api.stest.jiuxiulvxing.com/web.api",
        domainUrl: "0ce37dd6b927730161a1e559c2336d0a",
        imgUrl: "http://img.test.yimayholiday.com/v1/tfs/",
        linkUrl: 'http://m.xntest.jiuxiulvxing.com/',
        contpointersApi: 'http://test.data.jiuxiulvxing.com/newlogwithgzip.jsp',
        appid: 'wx14e984a0a6863004',
        wxcenter: "http://weixin.test.jiuxiulvxing.com/"
    }
}

//公共参数
_wap_config.sm = "md5";
//_wap_config.aid = "23";
//_wap_config.aid_wx = "25";
_wap_config.aid = {
    wap: "23",
    weixin: "25",
    jxapp: "28"
};
_wap_config.domid = "1200";
_wap_config.ft = "json";
_wap_config.ch = {
    jxwap: "jxwap",
    weixin: "weixin",
    jxapp: "jxapp"
};
_wap_config.timeout = "3000";

var jx__api = _wap_config.api;

window.jx_ajax = {
    post: function (url, obj, successFunc, errorFunc, noLoginCallback) {
        var _self = this;
        var type = obj.type || "POST";
        _self.ajax(type, url, obj, successFunc, errorFunc, noLoginCallback);
    },
    get: function (url, obj, successFunc, errorFunc, noLoginCallback) {
        var _self = this;
        _self.ajax("GET", url, obj, successFunc, errorFunc, noLoginCallback);
    },
    ajax: function (type, url, obj, successFunc, errorFunc, noLoginCallback) {
        var _self = this;
        var _jx_async = obj["async"];
        if (jx_common.isNull(_jx_async)) {
            _jx_async = true;
        }
        var _jx_ajax_frame = $.ajax({
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
                        return false;
                    }
                    if (jx_common.isInJXApp()) {
                        jx_common_app.openAppLogin();
                    } else {
                        jx_common.tip("token失效重新登录");
                        window.setTimeout(function () {
                            jx_common.openUrl("../../view/login/login.html?returnUrl=" + encodeURIComponent(window.location.href));
                        }, 1000);
                    }
                    return;
                }
                if (res["stat"]["code"] == "-260") {
                    jx_common.tip("请输入正确验证码");
                    return;
                }


                if (res["stat"]["code"] != 0) {
                    jx_common.tip("api错误(" + res["stat"]["code"] + ")");
                    return;
                }

                if (jx_common.isNull(res["content"])) {
                    jx_common.tip("无结果数据");
                    return;
                }
                var errorEntry = res["stat"]["stateList"][0];
                if (errorEntry["code"] == "-100") {
                    jx_common.tip("服务器开小差!");
                    return;
                }
                successFunc(res["content"][0], errorEntry, res["stat"]);
            },
            error: function () {
                if (errorFunc && (typeof errorFunc == "function")) {
                    errorFunc();
                    return;
                }
                jx_common.tip("系统繁忙");
            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    _jx_ajax_frame.abort();
                    jx_common.tip("系统超时");
                }
            }
        });
    },
    encryptRequestParam: function (options) {
        var _self = this, _params = {};
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

            var s = "";
            var keys = [];
            var params = $.extend(_params, options);
            for (var k in params) {
                keys.push(k);
            }
            keys.sort();
            for (var i = 0; i < keys.length; i++) {
                s = s + keys[i] + '=' + params[keys[i]];
            }
            s += _wap_config.domainUrl;
            //alert(s);
            params._sig = md5(s);
            return params;
        } catch (e) {
            jx_common.tip("本地加签错误");
        }
        return params;
    },
    getCh: function () {
        var ch = jx_common.getCookie("jx_ch");
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

module.exports = {
    _wap_config: _wap_config,
    jx_ajax: window.jx_ajax
}
