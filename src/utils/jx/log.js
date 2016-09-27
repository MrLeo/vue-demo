/**
 * log
 *
 * @Author: lxbin
 * @Date: 2016/9/22  0022
 * @Time: 14:50
 * Created with JetBrains WebStorm.
 */

import _wap_config from './config'
import jx_common from './common'
import jx_ajax from './ajax'

export default {
    monitors: function (action_and_params, activity_info) {
        let auto_params = [];
        for (let key in action_and_params) {
            let obj = {
                "2001": key,
                "2002": "",
                "2003": (new Date()).getTime(),
                "2004": action_and_params[key],
                "2005": "",
                "2006": "",
                "2007": "",
                "2008": activity_info ? activity_info : ""
            };
            auto_params.push(obj);
        }

        let config = {
            "1001": "九休旅行",
            "1002": jx_ajax.getAid(),
            "1003": "",
            "1004": "",
            "1005": "",
            "1006": "",
            "1007": "",
            "1008": this.ck_system(),
            "1009": jx_common.isIOS() ? "ios" : "android",
            "1010": "",
            "1011": jx_ajax.getCh(),
            "1012": "",
            "1013": "",
            "1014": this.ck_browser(),
            "1015": "",
            "1016": "",
            "1017": auto_params,
            "1018": _wap_config.domid
        };
        $.ajax({
            dataType: "jsonp",
            url: _wap_config.contpointersApi,//记录数据请求地址
            data: {msg: encodeURIComponent(JSON.stringify(config))}
        });
        /*if($("#jx-app-hidden-div-log").size() > 0){
         $("#jx-app-hidden-div-log").remove();
         }
         $("body").append("<div id=\"jx-app-hidden-div-log\" style=\"display:none;\"></div>")
         let hidden = document.getElementById("jx-app-hidden-div-log");
         let iframe = document.createElement("iframe");
         iframe.src = _wap_config.contpointersApi+"?msg="+encodeURIComponent(JSON.stringify(config));
         iframe.style.display = "none";
         hidden.appendChild(iframe);*/
    },
    ck_system: function () {
        let bIsAndroid = navigator.userAgent.match(/android/i) == "android", isIphone = (navigator.platform.toLowerCase() == "iphone");
        if (isIphone || bIsAndroid) return "MOBILE";
        let isWin = (navigator.platform.toLowerCase() == "win32") || (navigator.platform.toLowerCase() == "windows");
        let isMac = (navigator.platform.toLowerCase() == "mac68k") || (navigator.platform.toLowerCase() == "macppc")
            || (navigator.platform.toLowerCase() == "macintosh") || (navigator.platform.toLowerCase() == "macintel");
        let isUnix = (navigator.platform.toLowerCase() == "x11") && !isWin && !isMac;
        let isLinux = (String(navigator.platform.toLowerCase()).indexOf("linux") > -1);
        if (isWin || isMac || isUnix || isLinux) return "PC";
        return "PAD";
    },
    ck_browser: function () {
        let userAgent = navigator.userAgent.toLowerCase();
        let isOpera = userAgent.indexOf("opera") > -1;
        if (isOpera) {
            return "Opera浏览器"
        }
        if (userAgent.indexOf("firefox") > -1) {
            return "Firefox浏览器";
        }
        if (userAgent.indexOf("chrome") > -1) {
            return "Chrome浏览器";
        }
        if (userAgent.indexOf("safari") > -1) {
            return "Safari浏览器";
        }
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("msie") > -1 && !isOpera) {
            return "IE浏览器";
        }
        if (userAgent.indexOf("micromessenger") > -1) {
            return "微信内嵌浏览器";
        }
        if (userAgent.indexOf(" qq") > -1) {
            return "QQ内嵌浏览器";
        }
    }
}
