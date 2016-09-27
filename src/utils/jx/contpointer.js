/**
 * contpointer
 *
 * @Author: lxbin
 * @Date: 2016/9/22  0022
 * @Time: 14:39
 * Created with JetBrains WebStorm.
 */
;(function($){
    $.extend({
        //action_name动作编码
        //action_params可变参数，例如{'pid':'122012','pname':'蔬菜'}。具体的根据文档规定传，action_name不同action_params也会不同。
        monitors:function(url,action_and_params,app_id,domain_id,userid,channelCode,activity_info){
            let stamps=new Date().getTime(),auto_params=[];
            for(let key in action_and_params){
                let obj={
                    "2001": key,
                    "2002": "",
                    "2003": stamps,
                    "2004": action_and_params[key],
                    "2005": "",
                    "2006": userid,
                    "2007": "",
                    "2008": activity_info
                };
                auto_params.push(obj);
            }

            config={
                "1001": "九休旅行",
                "1002": app_id,
                "1003": "",
                "1004": "",
                "1005": "",
                "1006": "",
                "1007": "",
                "1008": this.ck_system(),
                "1009": this.ios_or_android(),
                "1010": "",
                "1011": channelCode,
                "1012": "",
                "1013": "",
                "1014": this.ck_browser(),
                "1015": "",
                "1016": "",
                "1017": auto_params,
                "1018": domain_id
            };
            $.ajax({
                dataType : "jsonp",
                url: url,//记录数据请求地址
                data: {msg:encodeURI(JSON.stringify(config))}
            });
        },
        ck_system:function() {
            let bIsAndroid = navigator.userAgent.match(/android/i) == "android",isIphone = (navigator.platform.toLowerCase() == "iphone") ;
            if (isIphone||bIsAndroid) return "MOBILE";
            let isWin = (navigator.platform.toLowerCase() == "win32") || (navigator.platform.toLowerCase() == "windows");
            let isMac = (navigator.platform.toLowerCase() == "mac68k") || (navigator.platform.toLowerCase() == "macppc")
                || (navigator.platform.toLowerCase() == "macintosh") || (navigator.platform.toLowerCase() == "macintel");
            let isUnix = (navigator.platform.toLowerCase() == "x11") && !isWin && !isMac;
            let isLinux = (String(navigator.platform.toLowerCase()).indexOf("linux") > -1);
            if (isWin||isMac||isUnix||isLinux) return "PC";
            return "PAD";
        },
        ios_or_android:function() {
            let isIphone = (navigator.platform.toLowerCase() == "iphone") ;
            if (isIphone) return "ios";
            let bIsAndroid = (navigator.platform.toLowerCase() == "android");
            if(bIsAndroid) return "android";
            return '';
        },
        ck_browser:function(){
            let userAgent = navigator.userAgent.toLowerCase();
            let isOpera = userAgent.indexOf("opera") > -1;
            if (isOpera) {
                return "Opera浏览器"
            }
            if (userAgent.indexOf("firefox") > -1) {
                return "Firefox浏览器";
            }
            if (userAgent.indexOf("chrome") > -1){
                return "Chrome浏览器";
            }
            if (userAgent.indexOf("safari") > -1) {
                return "Safari浏览器";
            }
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("msie") > -1 && !isOpera) {
                return "IE浏览器";
            }
            if(userAgent.indexOf("micromessenger") > -1) {
                return "微信内嵌浏览器";
            }
            if(userAgent.indexOf(" qq") > -1) {
                return "QQ内嵌浏览器";
            }
        }
    });
})(jQuery);

/*$(function(){
 //monitors函数，具体调用的例子。
 //$.monitors('Submit_Order',{'pid':'122012','pname':'蔬菜'});
 $.monitors("http://test.data.jiuxiulvxing.com/newlogwithgzip.jsp",{
 'pv_uv':{'pid':'122012','pname':'蔬菜'}
 },"23","1200");
 });*/

