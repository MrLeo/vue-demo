/**
 * 日期格式化
 *
 * @Author: lxbin
 * @Date: 2016/9/20  0020
 * @Time: 10:31
 * Created with JetBrains WebStorm.
 */

/**
 * ---- 日期格式化 ----
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param {DateString} date 被格式化的日期
 * @param {String} fmt 转换格式，eg.yyyy-MM-dd
 * @return {DateString} fmt 转换后的日期
 */
exports.DateFormat = function (date, fmt) {
    date = date.replace(/-/g, '/');
    if (!fmt)fmt = 'yyyy-MM-dd hh:mm:ss';
    var d = new Date(date);
    var o = {
        "M+": d.getMonth() + 1, //月份
        "d+": d.getDate(), //日
        "h+": d.getHours(), //小时
        "m+": d.getMinutes(), //分
        "s+": d.getSeconds(), //秒
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度
        "S": d.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    //console.log(d, date, o, fmt);
    return fmt;
}

/**
 * ---- 时间戳转换日期 ----
 * http://www.cnblogs.com/yjf512/p/3796229.html
 * @param {Int} timestamp 被格式化的时间戳
 * @example getLocalTime(1439136000000);
 */
exports.getLocalTime = function (timestamp) {
    return new Date(parseInt(timestamp)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

/**
 * ---- 日期转时间戳 ----
 * http://www.cnblogs.com/yjf512/p/3796229.html
 * @param {Object} date 日期字符串
 */
exports.getTimestamp = function (dateStr) {
    if (!/^\d{4}[-|\/|年]\d{1,2}[-|\/|月]\d{1,2}日?\s\d{1,2}:\d{1,2}(:\d{1,2})?$/.test(dateStr)) {
        return 0;
    }
    var dateStrArr = dateStr.replace(/[\/|年|月]/g, '-').replace(/日/, "").split((/-|\:|\ /));
    var date = new Date(dateStrArr[0], dateStrArr[1] - 1, dateStrArr[2], dateStrArr[3], dateStrArr[4], dateStrArr[5]);
    return Date.parse(date);
}

/**
 * 获取上一个月
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
exports.getPreMonth = function (date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

/**
 * 获取下一个月
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
exports.getNextMonth = function (date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}
