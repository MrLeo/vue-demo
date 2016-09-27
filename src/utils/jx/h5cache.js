/**
 * h5cache
 * 需要md5加密
 * 支持单页面上缓存存储
 *
 * @Author: lxbin
 * @Date: 2016/9/22  0022
 * @Time: 14:47
 * Created with JetBrains WebStorm.
 */

import md5 from 'blueimp-md5'

export default {
    setCache: function (key, value, timeout) {
        let _self = this;
        if (!window.localStorage) {
            return false;
        }
        _self.getStorageHref(key);
        window.localStorage.setItem(key, value);
        let timeoutKey = key + "_timeout";
        if (timeout) {
            window.localStorage.setItem(timeoutKey, (new Date()).getTime() + (timeout * 1000));
        } else {
            window.localStorage.setItem(timeoutKey, -1);
        }
    },
    getCache: function (key) {
        let _self = this;
        if (!window.localStorage) {
            return "";
        }
        _self.getStorageHref(key);
        let timeoutKey = key + "_timeout";
        let timeout = window.localStorage.getItem(timeoutKey);
        if (!timeout || "" == timeout) {
            return "";
        }
        if (timeout == -1 || timeout > (new Date()).getTime()) {
            return window.localStorage.getItem(key);
        }
        window.localStorage.setItem(key, "");
        return "";
    },
    delCache: function (key) {
        let _self = this;
        if (!window.localStorage) {
            return "";
        }
        _self.getStorageHref(key);
        window.localStorage.removeItem(key);
        window.localStorage.removeItem(key + '_timeout');
    },
    getStorageHref: function (key) {
        if (localStorage.locationHref) {
            key = md5(localStorage.locationHref) + "_" + key;
        } else {
            key = md5(window.location.href) + "_" + key;
        }
    }
}
