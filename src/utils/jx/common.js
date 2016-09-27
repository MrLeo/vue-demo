/**
 * common
 *
 * @Author: lxbin
 * @Date: 2016/9/22  0022
 * @Time: 14:28
 * Created with JetBrains WebStorm.
 */

import $ from 'jquery'
import Cookies from 'js-cookie'
import md5 from 'blueimp-md5'
import _wap_config from './config'
import jx_ajax from './ajax'

const jx_common = {
    getUrlParamByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        let results = regex.exec(window.location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(
            /\+/g, " "));
    },
    loading: function (text, timeout) {
        if ($(".jx-loading").size() > 0) {
            return $(".jx-loading").show();
        }
        text = text || "正在加载中...";
        $("body").append(
            "<div class=\"jx-loading\" style=\"display:none;\">" + text
            + "</div>");
        let width = $(window).width();
        let height = $(window).height();
        $(".jx-loading").css("background-color", "#f4f4f4");
        $(".jx-loading").css("z-index", 9999);
        $(".jx-loading").css("position", "fixed");
        $(".jx-loading").css("width", width);
        $(".jx-loading").css("height", height);
        $(".jx-loading").css("top", 0);
        $(".jx-loading").css("text-align", "center");
        $(".jx-loading").css("line-height", Math.floor(height / 2) + "px");
        $(".jx-loading").show();
        if (!timeout) {
            timeout = 500;
        }
        if (timeout && timeout > 0) {
            window.setTimeout(function () {
                $(".jx-loading").hide();
            }, timeout);
        }
    },
    closeLoading: function () {
        $(".jx-loading").hide();
    },
    openUrl: function (url) {
        window.location.href = url;
    },
    openIframe: function (url) {
        $(".open-iframe").remove();
        let htl = [];
        htl
            .push("<div class=\"open-iframe\" style=\"display:none;width:100%;height:100%; -webkit-overflow-scrolling: touch; overflow-y: scroll; \">");
        htl
            .push("<iframe  src=\""
                + url
                + "\" width =\"100%\" height=\"100%\" frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"yes\" allowtransparency=\"yes\"></iframe>")
        htl.push("</div>");
        $("body").append(htl.join(""));

        let width = $(window).width();
        let height = $(window).height();
        $(".open-iframe").css("z-index", 9999);
        $(".open-iframe").css("position", "fixed");
        $(".open-iframe").css("width", width);
        $(".open-iframe").css("height", height);
        $(".open-iframe").css("top", 0);

        $(".open-iframe").show();
    },
    closeIframe: function () {
        $(".open-iframe").remove();
    },
    tip: function (text, timeout) {
        let _html = [];
        if ($(".jx-tip").length == 0) {
            $("body").prepend('<div class="jx-tip"></div>');
            $("body").prepend('<div id="pagemask"></div>');
        }
        $(".jx-tip").html(text);
        $("#pagemask").css("background", "rgba(0,0,0,0)");
        let width = $(window).width();
        let length = $(".jx-tip").outerWidth();
        $(".jx-tip").css("left", Math.floor((width - length) / 2));
        if (!timeout || isNaN(timeout)) {
            timeout = 2000;
        }
        $("#pagemask").fadeIn();
        $(".jx-tip").fadeIn(500);

        window.setTimeout(function () {
            $(".jx-tip").fadeOut(500, function () {
                $(this).remove();
                $("#pagemask").remove();
            });
        }, timeout);
    },
    isNull: function (obj) {
        if (typeof obj == "object") {
            for (let name in obj) {
                return false;
            }
            return true;
        }
        return null == obj || typeof obj == "undefined" || "" == obj || obj.length == 0;
    },
    appendParamToUrl: function (key, value, url) {
        let origUrl = url || document.referrer;
        if (!origUrl) {
            return;
        }
        if (origUrl.indexOf("?") == -1) {
            window.location.href = origUrl + "?" + key + "=" + value;
            return;
        }
        if (origUrl.indexOf(key) == -1) {
            window.location.href = origUrl + "&" + key + "=" + value;
            return;
        }
        window.location.href = changeURLArg(origUrl, key, value);
    },
    isLogin: function () {
        let _self = this;
        if (_self.isInJXApp()) {
            return !_self.isNull(Cookies.get("_wtk")) && !_self.isNull(Cookies.get("_uid"));
        }
        return !_self.isNull(Cookies.get("jx_token")) && !_self.isNull(Cookies.ge("jx_uid"));
    },
    showNoData: function (text) {
        $(".no-data").remove();
        text = text || "暂无数据";
        let htl = [];
        htl.push("<div class=\"no-data\">");
        htl.push(" <div class=\"no-data-img\">");
        htl.push("  	<img src=\"../../img/icon_empty.jpg\"/>");
        htl.push(" </div>");
        htl.push(" <div class=\"no-data-desc\">" + text + "</div>");
        htl.push("</div>");
        $("body").append(htl.join(""));
    },
    removeNoData: function () {
        $(".no-data").remove();
    },
    isPhone: function (phone) {
        let pat = /(^(1[43578]\d{9})$)/;
        return pat.test(phone);
    },
    setCookie: function (key, value) {
        Cookies.set(key, value, {path: "/", domain: ".jiuxiulvxing.com"});
    },
    cleanCookie: function (key) {
        Cookies.set(key, "", {path: "/", domain: ".jiuxiulvxing.com"});
    },
    getUid: function () {
        let _self = this;
        if (_self.isInJXApp()) {
            return _self.isNull(Cookies.get("_uid")) ? "" : Cookies.get("_uid");
        }
        return _self.isNull(Cookies.get("jx_uid")) ? "" : Cookies.get("jx_uid");
    },
    getTk: function () {
        let _self = this;
        if (_self.isInJXApp()) {
            return _self.isNull(Cookies.get("_wtk")) ? "" : Cookies.get("_wtk");
        }
        return _self.isNull(Cookies.get("jx_token")) ? "" : Cookies.get("jx_token");
    },
    getOpenIdByCookie: function () {
        let _self = this;
        return _self.isNull(Cookies.get("open_id")) ? "" : Cookies.get("open_id");
    },
    convertOrderStatus: function (status) {
        return __orderStatus[status] ? __orderStatus[status] : "未知状态";
    },
    getPic: function (pic) {

        let _self = this,
            array = [];
        if (_self.isNull(pic)) {
            return;
        }
        array.push(pic.substring(pic.lastIndexOf('.'), 0));
        array.push('_700x600');
        array.push(pic.substring(pic.lastIndexOf('.')));
        return _wap_config.imgUrl + array.join('');
    },
    getPrice: function (price) {
        return Number(price) / 100;
    },
    isId: function (ID) {
        let pat = /(^\d{15}|\d{18}$)/;
        return pat.test(ID);
    },
    convertDate: function (dateTime, flag) {
        let _date = new Date(dateTime);
        let year = _date.getFullYear();
        let month = _date.getMonth() + 1;
        month = month >= 10 ? month : "0" + month;
        let day = _date.getDate() >= 10 ? _date.getDate() : "0" + _date.getDate();
        let hour = _date.getHours() >= 10 ? _date.getHours() : "0" + _date.getHours();
        let minute = _date.getMinutes() >= 10 ? _date.getMinutes() : "0" + _date.getMinutes();
        if (flag) {
            return year + "-" + month + "-" + day;
        }
        return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
    alertConfirm: function (str, callback) {
        let html = [];
        html.push('<div id="model-box">');
        html.push('<div class="model-main">');
        html.push('<div class="content">' + str + '</div>');
        html.push('<div class="confirm"><button> 确定 </button><button>取消</button></div>');
        html.push('</div>');
        html.push('</div>');

        $('body').append(html.join("\n"));
        $('.model-main').css({
            'marginLeft': $(window).width() / 2 - $('.model-main').width() / 2,
            'marginTop': $(window).height() / 2 - $('.model-main').height() / 2
        });
        $('#model-box .confirm button').on('click', function () {
            let iTrue = $(this).html() == ' 确定 ';
            if (iTrue) {
                $('#model-box').fadeOut('normal', function () {
                    $(this).remove();
                    callback && callback();
                });
            } else {
                $('#model-box').fadeOut('normal', function () {
                    $(this).remove();
                });
            }
        });
    },
    //输入6-26位字母、数字密码
    checkPwd: function (pwd) {
        let exp = /^(?=.{6,16}$)(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]+$/;
        return exp.test(pwd);
    },
    //输入2-15位字符(支持中文,数字,英文,下划线)
    checkNick: function (nick) {
        let exp = /^([a-zA-Z0-9_\u4e00-\u9fa5]){2,15}$/;
        return exp.test(nick);
    },
    //输入2-10位字符,支持中文、字母
    checkName: function (name) {
        let exp = /^([a-zA-Z\u4e00-\u9fa5]){2,10}$/;
        return exp.test(name);
    },
    //邮编
    checkZipCode: function (zipCode) {
        let exp = /^[0-9][0-9]{5}$/;
        return exp.test(zipCode);
    },
    checkId: function (val) {
        let exp = /^((11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65)[0-9]{4})(([1|2][0-9]{3}(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))[0-9]{3}[Xx0-9])|([0-9]{2}[0|1][0-9][0-3][0-9][0-9]{3}))$/;
        return exp.test(val);
    },
    checkJunRen: function (val) {
        let exp = /^[\\u4e00-\\u9fa5a-zA-Z0-9]{0,20}$/;
        return exp.test(val);
    },
    checkGO: function (val) {
        let exp = /^[WCwc][0-9]{8}$/;
        return exp.test(val);
    },
    checkPassport: function (val) {
        let exp = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
        return exp.test(val);
    },
    openBrowser: function (click) {
        click = click || 0
        let html = [];
        html.push('<div class="openBrowser"></div>');
        if ($('.openBrowser').length > 0) return;
        $('body').append(html.join(''));
        $('.openBrowser').on('click', function () {
            if (click == 0) {
                $(this).remove();
            }

        });
    },
    bindPhone: function (title, func) {
        let htl = [];
        $("#shadow").remove();
        htl.push("<div id=\"shadow\">");
        htl.push("	<div class=\"validatebox\">");
        htl.push("		<div class=\"validate-header\">");
        htl.push("			<span>" + title + "</span>");
        htl.push("			<span class=\"bind-close\"><img src=\"../../img/close.png\"></span>");
        htl.push("		</div>");
        htl.push("	    <div class=\"validate-form\">");
        htl.push("		 <input class=\"phonenum bind-phone\" type=\"text\" maxlength=\"11\" placeholder=\"请输入手机号\"/>");
        htl.push("		 <span class=\"prefix\">+ 86&nbsp;|</span>");
        htl.push("		 <a class=\"btn-code bind-send-yzm\" flag=\"0\" href=\"javascript:void(0);\">发送验证码</a>");
        htl.push("		 <input type=\"text\" class=\"input-check-code\"  placeholder=\"短信验证码\"/>");
        //htl.push("		 <input type=\"password\"  placeholder=\"设置6-16位密码\"/>");
        htl.push("	    </div>");
        htl.push("	    <div class=\"validate-btn\">");
        htl.push("		 <a href=\"javascript:void(0);\" class=\"validate-finish\">完成</a>");
        htl.push("	    </div>");
        htl.push("	</div>");
        htl.push("</div>");
        $("body").append(htl.join(""));

        $(document).on('touchend', '.validate-finish', function () {
            func();
        });

        $(document).on('touchend', '.bind-close', function () {
            $("#shadow").fadeOut();
        });

        let _self = this;

        //发送验证码
        $(document).on("touchend", ".bind-send-yzm", function () {
            if ($(this).attr("flag") == "1") {
                return;
            }
            let phone = $(".bind-phone").val();
            if (!_self.isPhone(phone)) {
                _self.tip("请输入正确的手机号");
                return;
            }

            //设置不能点击
            $(this).attr("flag", "1");
            $(this).text("60S");
            let obj = $(this);
            let time = 59;
            //倒计时
            let intervalId = window.setInterval(function () {
                obj.text((time--) + "S");
                if (time == 0) {
                    window.clearInterval(intervalId);
                    obj.attr("flag", "0");
                    obj.text("获取验证码");
                }
            }, 1000);
            //发送验证码
            jx_ajax.post(jx__api, {
                _mt: "user.requestSmsPassword",
                mobile: phone,
                smsType: "REGISTER"
            }, function (res) {
                if (res["result"] || res["result"] == "true") {
                    _self.tip("已发送");
                } else {
                    _self.tip("发送失败");
                }
            });

        });

    },
    openPwdDiv: function (phone, func) {
        let htl = [];
        $("#shadow").remove();
        htl.push("<div id=\"shadow\">");
        htl.push("	<div class=\"validatebox\">");
        htl.push("		<div class=\"validate-header\">");
        htl.push("设置密码");
        htl.push("			<span class=\"bind-close\"><img src=\"../../img/close.png\"></span>");
        htl.push("		</div>");
        htl.push("	    <div class=\"validate-form\">");
        htl.push("		 <input type=\"password\" class=\"bind-setpwd\" phone=\"" + phone + "\" placeholder=\"设置6-16位密码\"/>");
        htl.push("	    </div>");
        htl.push("	    <div class=\"validate-btn\">");
        htl.push("		 <a href=\"javascript:void(0);\" class=\"setpwd-finish\">完成</a>");
        htl.push("	    </div>");
        htl.push("	</div>");
        htl.push("</div>");
        $("body").append(htl.join(""));

        $(document).on('touchend', '.setpwd-finish', function () {
            func();
        });

        $(document).on('touchend', '.bind-close', function () {
            $("#shadow").fadeOut();
        });
    },
    isWxbrowser: function () {
        let ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    },
    openConfig: function (configType, configOperation, configTitle) {
        let _self = this;
        //周边游

        if (configType == "AROUND_FUN_DETAIL") {
            _self.openUrl("../../view/detail/detail.html?id=" + configOperation + "&itemType=ARROUND_FUN");
            return false;
        }
        //同城玩乐

        if (configType == "CITY_ACTIVITY_DETAIL") {
            _self.openUrl("../../view/citiesActivities2/detail.html?id=" + configOperation + "&itemType=CITY_ACTIVITY");
            return false;
        }

        //跟团游
        if (configType == "PACKAGE_TOUR_DETAIL") {
            _self.openUrl("../../view/detail/detail.html?id=" + configOperation + "&itemType=TOUR_LINE");
            return false;
        }
        //自由行
        if (configType == "FREE_TOUR_DETAIL") {
            _self.openUrl("../../view/detail/detail.html?id=" + configOperation + "&itemType=FREE_LINE");
            return false;
        }
        //实物商品详情
        if (configType == "JIUXIU_BUY_DETAIL") {
            _self.openUrl("../../view/teamTravel/bimaidetail.html?id=" + configOperation + "&itemType=NORMAL");
            return false;
        }
        //外链接
        if (configType == "H5") {
            _self.openUrl(configOperation);
            return false;
        }
        //店铺
        if (configType == "SHOP_HOME_PAGE") {
            _self.openUrl("../../view/teamTravel/shop.html?id=" + configOperation);
            return false;
        }
        //自由行列表[目的地、线路主题]
        if (configType == "FREE_TOUR_LIST") {
            let itemType = "FREE_LINE";
            let subjectValue = configOperation;
            _self.openUrl("../../view/listpage/configlist.html?itemType=" + itemType + "&subjectValue=" + subjectValue + "&title=" + configTitle);
            return false;
        }
        //周边游列表 [目的地、线路主题]
        if (configType == "AROUND_FUN_LIST") {
            let itemType = "FREE_LINE,TOUR_LINE";
            let subjectValue = configOperation;
            _self.openUrl("../../view/listpage/configlist.html?itemType=" + itemType + "&subjectValue=" + subjectValue + "&title=" + configTitle);
            return false;
        }
        //跟团游列表[目的地、线路主题]
        if (configType == "PACKAGE_TOUR_LIST") {
            let itemType = "TOUR_LINE";
            let subjectValue = configOperation;
            _self.openUrl("../../view/listpage/configlist.html?itemType=" + itemType + "&subjectValue=" + subjectValue + "&title=" + configTitle);
            return false;
        }
        //同城玩乐列表[目的地、城市活动主题]
        if (configType == "CITY_ACTIVITY_LIST") {
            let itemType = "CITY_ACTIVITY";
            let subjectValue = configOperation;
            _self.openUrl("../../view/listpage/configlist.html?itemType=" + itemType + "&subjectValue=" + subjectValue + "&title=" + configTitle);
            return false;
        }
        //景区列表
        if (configType == "SCENIC_TAG_LIST") {
            let itemType = "SUBJECT";

            let subjectValue = configOperation;
            _self.openUrl("../../view/scenic/scenicList.html?SUBJECT=" + subjectValue);
            return false;
        }
        /*自由行首页*/
        if (configType == "FREE_TOUR") {
            _self.openUrl("../../view/freeTravel/categoryindex.html");
            return false;
        }
        //必买商品列表
        if (configType == "MUST_BUY_LIST") {

        }
    },
    openDetail: function (itemType, itemId, type) {
        let _self = this;
        if (_self.isNull(type)) {
            type = "index";
        }
        //跟团游
        if (itemType == "TOUR_LINE") {
            _self.openUrl("../../view/detail/detail.html?id=" + itemId + "&itemType=TOUR_LINE" + "&type=" + type);
            return;
        }
        //同城玩乐
        if (itemType == "CITY_ACTIVITY") {
            _self.openUrl("../../view/citiesActivities2/detail.html?id=" + itemId + "&itemType=CITY_ACTIVITY" + "&type=" + type);
            return;
        }
        //周边游
        if (itemType == "ARROUND_FUN") {
            _self.openUrl("../../view/detail/detail.html?id=" + itemId + "&itemType=ARROUND_FUN" + "&type=" + type);
            return;
        }
        //自由行
        if (itemType == "FREE_LINE") {
            _self.openUrl("../../view/detail/detail.html?id=" + itemId + "&itemType=FREE_LINE" + "&type=" + type);
            return;
        }
        //必买+"&type="+type
        if (itemType == "NORMAL") {
            _self.openUrl("../../view/teamTravel/bimaidetail.html?id=" + itemId + "&itemType=NORMAL" + "&type=" + type);
            return;
        }
    },
    openShop: function (id, fromType) {
        let _self = this;
        if (_self.isNull(fromType)) {
            fromType = "";
        }
        if (fromType == "listpage") {
            let shopUrl = "../../view/teamTravel/shop.html?id=" + id + '&type=' + fromType;
        } else {
            let shopUrl = "../../view/teamTravel/shop.html?id=" + id + "&shopname=" + fromType + '&type=childrenTravel';
        }
        _self.openUrl(shopUrl);
    },

    openAppShop: function (shopId, shopName) {
        shopName = encodeURIComponent(shopName);
        window.location.href = "yimay://app?content={\"TYPE\":\"JIUXIU\",\"OPERATION\":\"SHOP_HOME_PAGE\",\"DATA\":{\"id\":\"" + shopId + "\",\"name\":\"" + shopName + "\"}}";
    },
    openAppItemDetail: function (itemId, itemType, title) {
        title = encodeURIComponent(title);
        //跟团游
        if (itemType == "TOUR_LINE") {
            window.location.href = "yimay://app?content={\"TYPE\":\"JIUXIU\",\"OPERATION\":\"PACKAGE_TOUR_DETAIL\",\"DATA\":{\"id\":\"" + itemId + "\",\"title\":\"" + title + "\"}}";
        }
        //周边游
        if (itemType == "ARROUND_FUN") {
            window.location.href = "yimay://app?content={\"TYPE\":\"JIUXIU\",\"OPERATION\":\"AROUND_FUN_DETAIL\",\"DATA\":{\"id\":\"" + itemId + "\",\"title\":\"" + title + "\"}}";
        }
        //同城玩乐
        if (itemType == "CITY_ACTIVITY") {
            window.location.href = "yimay://app?content={\"TYPE\":\"JIUXIU\",\"OPERATION\":\"CITY_ACTIVITY_DETAIL\",\"DATA\":{\"id\":\"" + itemId + "\",\"title\":\"" + title + "\"}}";
        }
        //自由行
        if (itemType == "FREE_LINE") {
            window.location.href = "yimay://app?content={\"TYPE\":\"JIUXIU\",\"OPERATION\":\"FREE_TOUR_DETAIL\",\"DATA\":{\"id\":\"" + itemId + "\",\"title\":\"" + title + "\"}}";
        }
    },
    isInJXApp: function () {
        let ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/JiuXiuLvXing/i) == 'jiuxiulvxing';
    },
    getCookie: function (key) {
        return Cookies.get(key);
    },
    openAppShare: function (shareTitle, shareContent, shareImageUrl, shareWebPage) {
        shareTitle = encodeURIComponent(shareTitle);
        shareContent = encodeURIComponent(shareContent);
        shareWebPage = encodeURIComponent(shareWebPage);
        window.location.href = 'yimay://app?content={"TYPE":"JIUXIU","OPERATION":"WEB_SHARE","DATA":{"shareTitle":"' + shareTitle + '","shareContent":"' + shareContent + '","shareImageUrl":"' + shareImageUrl + '","shareWebPage":"' + shareWebPage + '"}}';
    },
    back: function () {
        let _self = this;
        let jxBack = "";
        if (window.sessionStorage) {
            jxBack = _self.getSessionStorageItem("jx_back");
        } else {
            jxBack = _self.getCookie("jx_back");
        }
        if (_self.isNull(jxBack)) {
            return false;
        }
        let urlArr = JSON.parse(jxBack);
        let currentUrl = window.location.href;
        let lastUrl = "../../index.html";
        for (let i = 0; i < urlArr.length; i++) {
            if (currentUrl == urlArr[i] && i > 0) {
                urlArr.splice(i);
                lastUrl = urlArr.pop();
                if (_self.isNull(lastUrl)) {
                    lastUrl = "../../index.html";
                }
                break;
            }
        }
        if (window.sessionStorage) {
            _self.setSessionStorageItem("jx_back", JSON.stringify(urlArr))
        } else {
            _self.setCookie("jx_back", JSON.stringify(urlArr));
        }
        window.location.href = lastUrl;
    },
    currentPage: function () {
        let _self = this;
        let currentUrl = window.location.href;
        if (currentUrl.indexOf("chjump.html") != -1
            || currentUrl.indexOf("wxjump.html") != -1
            || currentUrl.indexOf("login2.html") != -1) {
            return false;
        }
        let jxBack = "";
        if (window.sessionStorage) {
            jxBack = _self.getSessionStorageItem("jx_back");
        } else {
            jxBack = _self.getCookie("jx_back");
        }
        let urlArr = [];
        if (_self.isNull(jxBack)) {
            urlArr.push(currentUrl);
        } else {
            urlArr = JSON.parse(jxBack);
            for (let i = 0; i < urlArr.length; i++) {
                if (urlArr[i] == currentUrl) {
                    urlArr.splice(i);
                    break;
                }
            }
            urlArr.push(currentUrl);
        }

        if (window.sessionStorage) {
            _self.setSessionStorageItem("jx_back", JSON.stringify(urlArr))
        } else {
            _self.setCookie("jx_back", JSON.stringify(urlArr));
        }

    },
    isAndroid: function () {
        let u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    },
    isIOS: function () {
        let u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    },
    downloadApp: function (targetAppUri, downloadChannel) {
        let appUri = "yimay://app";
        if (targetAppUri) {
            appUri = targetAppUri;
        }
        window.location.href = appUri;
        // 部分浏览器只支持 vendor-prefixed
        // 根据浏览器支持情况设置隐藏属性和可见状态改变事件
        let hidden, state, visibilityChange;
        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
            state = "visibilityState";
        } else if (typeof document.mozHidden !== "undefined") {
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
            state = "mozVisibilityState";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
            state = "msVisibilityState";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
            state = "webkitVisibilityState";
        }
        let openapptimer = null;
        document.addEventListener(visibilityChange, function (e) {
            clearTimeout(openapptimer);
        }, false);

        openapptimer = setTimeout(function () {
            let ch = downloadChannel ? downloadChannel : "wap";
            window.location.href = "http://www.jiuxiulvxing.com/d/" + ch;
        }, 1000);

    },
    makeSmallPic: function (pic) {
        let arr = pic.split(".");
        return arr[0] + "_700x600." + arr[1];
    },
    getStartPrice: function (price) {
        return Math.floor(Number(price) / 100);
    },
    makeHdCh: function (defaultCh) {
        let _self = this;
        let ch = _self.getUrlParamByName("ch");
        if (!_self.isNull(ch)) {
            _self.setCookie("jx_ch", ch);
            return false;
        }
        if (!_self.isNull(defaultCh)) {
            _self.setCookie("jx_ch", defaultCh);
            return false;
        }
    },
    makeWeixinOpenId: function () {
        let _self = this;
        if (!_self.isWxbrowser()) {
            return false;
        }
        if (!_self.isNull(_self.getOpenIdByCookie())) {
            return false;
        }
        _self.loading("加载中...");
        let realUrl = encodeURIComponent(window.location.href);
        let jumpUrl = "http://" + document.domain + "/view/weixin/chjump.html?returnUrl=" + realUrl;
        let targetUrl = encodeURIComponent(jumpUrl);
        let appid = _wap_config.appid;
        let api1 = _wap_config.wxcenter + 'v1/openid/get/';
        let appUrl = api1 + appid + '?targetUrl=' + targetUrl;
        appUrl = encodeURIComponent(appUrl);
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
            + appid
            + '&redirect_uri='
            + appUrl
            + '&response_type=code&scope=snsapi_base&state=0#wechat_redirect';
        window.location.href = url;
        return true;
    },
    setTitle: function () {
        let _self = this;
        let title = _self.getUrlParamByName("title");
        if (!_self.isNull(title)) {
            $(".header-title").text(title);
        }
    },
    makeLoginUserInfoCookie: function (token, uid, phone) {
        let _self = this;
        if (!_self.isNull(token)) {
            this.setCookie("jx_token", token);
        }
        if (!_self.isNull(uid)) {
            this.setCookie("jx_uid", uid);
        }
        if (!_self.isNull(phone)) {
            this.setCookie("jx_u_phone", phone);
        }
    },
    isLocalStorageSupported: function () {
        let testKey = 'test',
            storage = window.sessionStorage;
        try {
            storage.setItem(testKey, 'testValue');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    },
    setSessionStorageItem: function (key, value) {
        if (this.isLocalStorageSupported()) {
            window.sessionStorage.setItem(key, value);
            return false;
        }
        this.setCookie(key, value);
    },
    getSessionStorageItem: function (key) {
        if (this.isLocalStorageSupported()) {
            return window.sessionStorage.getItem(key);
        }
        return this.getCookie(key);
    },
    movePageEvent: function (currPage, movePage, orientation) {
        setTimeout(function () {
            if (!orientation) {
                $(movePage).css("z-Index", 1001).animateFx({
                    "transform": "translate(0px,0px) translateZ(0)"
                }, 100);
                $(currPage).css("z-Index", 1000).animateFx({
                    "transform": "translate(-100%,0px) translateZ(0)"
                }, 100);
            } else {
                $(currPage).css("z-Index", 1000).animateFx({
                    "transform": "translate(100%,0px) translateZ(0)"
                }, 100);
                $(movePage).css("z-Index", 1001).animateFx({
                    "transform": "translate(0px,0px) translateZ(0)"
                }, 100);
            }
        }, 50);
    },
    isWeiBo: function () {
        let ua = navigator.userAgent.toLowerCase();
        return ua.match(/WeiBo/i) == "weibo";
    },
    uuid: function (len, radix) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            let r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },
    getAppVersionCode: function () {
        let ua = navigator.userAgent;
        let version = "";
        if (ua.match(/JiuXiuLvXing_(.*);/)) {
            version = ua.match(/JiuXiuLvXing_(.*);/)[1];
        }
        return version;
    },
    getAppChannel: function () {
        let ua = navigator.userAgent;
        let channal = '';
        if (ua.match(/Channal_(.*)/)) {
            channal = ua.match(/Channal_(.*)/)[1];
        }
        return channal;
    },
    getDid: function () {
        let _self = this;
        return _self.isNull(_self.getCookie("_did")) ? "" : _self.getCookie("_did");
    },
    getDsig: function () {
        let _self = this;
        return _self.isNull(_self.getCookie("_dsig")) ? "" : _self.getCookie("_dsig");
    }
}

/**
 * 订单状态
 */
const __orderStatus = {
    "WAITING_PAY": "待付款",
    "WAITING_DELIVERY": "处理中",
    "SHIPPING": "待出行",
    "FINISH": "已完成",
    "CLOSED": "已关闭",
    "CANCEL": "已取消",
    "REFUNDED": "已退款",
    "WAITING_CONFIRM": "待确认",
    "CONFIRMED": "已确认",
    "RATED": "已完成",
    "NOT_RATE": "已完成"
}
const __IDObj = {
    "1": "身份证",
    "2": "护照",
    "3": "军人证",
    "4": "港澳通行证"
};

/**
 * url 目标url arg 需要替换的参数名称 arg_val 替换后的参数的值 return url 参数替换后的url
 */
function changeURLArg(url, arg, arg_val) {
    let pattern = arg + '=([^&]*)';
    let replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        let tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
}

/**
 * 绑定微信
 */
function wxBindPhone() {
    jx_common.bindPhone("绑定手机", function () {
        let phone = $(".bind-phone").val();
        if (!jx_common.isPhone(phone)) {
            jx_common.tip("请输入正确的手机号");
            return false;
        }
        let yzm = $(".input-check-code").val();
        if (jx_common.isNull(yzm)) {
            jx_common.tip("请输入验证码");
            return false;
        }
        let openId = jx_common.getOpenIdByCookie();
        //用户绑定
        jx_ajax.post(jx__api, {
            _mt: "user.thirdPartyBind",
            _oid: openId,
            _otype: "WEIXIN",
            _pn: phone,
            _dyn: yzm
        }, function (data, error) {
            if (error["code"] == "1003040") {
                jx_common.tip("手机号已绑定");
                return false;
            }
            if (data["token"] && data["token"] != "") {
                jx_common.setCookie("jx_token", data["token"]);
                jx_common.setCookie("jx_uid", data["userId"]);
                jx_common.tip("绑定成功");
                window.location.reload();
            } else {
                jx_common.tip("绑定失败，请重试");
            }
        });
    });
}

/**
 * 添加当前页
 */
/*window.onload = function(){
 jx_common.currentPage();
 }*/
(function () {
    jx_common.currentPage();
    let interval = window.setInterval(function () {
        try {
            if (jx_common.isNull(jx_common.getCookie("jx_uv"))) {
                jx_common.setCookie("jx_uv", jx_common.uuid());
            } else {
                window.clearInterval(interval);
            }
        } catch (e) {
        }
    }, 500);
})();

/**
 * 百度统计
 */
let _hmt = _hmt || [];
(function () {
    let hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?eaa860101e837ecb49ee5f37445804d7";
    let s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

export default jx_common
