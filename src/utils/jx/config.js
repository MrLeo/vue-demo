/**
 * config
 *
 * @Author: lxbin
 * @Date: 2016/9/22  0022
 * @Time: 13:59
 * Created with JetBrains WebStorm.
 */

let _wap_config = {
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
let _linkUrl = window.location.href;

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

export default _wap_config
