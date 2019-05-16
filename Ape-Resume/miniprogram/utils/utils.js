class Utils {
    /**
     * 格式化日期
     * @param {*} date 
     */
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()

        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()


        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }
    _formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }

    /**
     * 支付接口调用
     * @param {*} hash 
     */
    pay(hash) {
        return new Promise((res, rej) => {
            wx.requestPayment({
                'appId': hash.appId,
                'timeStamp': hash.timeStamp,
                'nonceStr': hash.nonceStr,
                'package': hash.package,
                'signType': hash.signType,
                'paySign': hash.signature,
                'success': function (params) {
                    res(params)
                },
                'fail': function (err) {
                    rej(err)
                }
            })
        })

    }

}

export {
    Utils
}