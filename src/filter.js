/**
 * 自定义过滤器
 */

let myFilter = {}

myFilter.install = function (Vue) {
    /**
     * 完整日期时间格式化
     */
    Vue.filter('fullDate', val => {
        let date = new Date(val)
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}
    ${date.getHours()}:${date.getMinutes()}`
    })

    /**
     * 字符串倒序
     * 单向过滤器
     */
    Vue.filter('reverse', function (value) {
        return value.split('').reverse().join('')
    })

    /**
     * 价格格式化
     * 双向过滤器
     */
    Vue.filter('currencyDisplay', {
        // model -> view
        // 在更新 `<input>` 元素之前格式化值
        read: function (val) {
            return '$' + val.toFixed(2)
        },
        // view -> model
        // 在写回数据之前格式化值
        write: function (val, oldVal) {
            var number = +val.replace(/[^\d.]/g, '')
            return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
        }
    })

    Vue.filter('canvertUrl', function (val) {
        if (!val) {
            return '/static/img/logo_default_s.jpg'
        }
        /*else if (/^http/.test(val)) {*/
        return val
        /*}
         return "//" + val*/
    })
}

export default myFilter
