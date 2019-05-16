import {
    config
} from "../config";

const tips = {
    1: '抱歉，出现错误',
    1005: 'appkey無效',
    3000: '期刊不存在'
}

class HTTP {
    request(param, isCatch, key) {
        if (isCatch) {
            if (wx.getStorageSync(key)) {
                return new Promise((res, rej) => {
                    res(wx.getStorageSync(key))
                })
            }
        }

        if (!param.method) param.method = "GET"
        const {
            url,
            method,
            data
        } = param
        return new Promise((reslove, reject) => {
            wx.request({
                url: config.api_blink_url + url,
                method,
                data,
                header: {
                    'content-type': 'application/json'
                },
                success: (res) => {
                    let code = res.statusCode.toString()

                    if (code.startsWith('2')) {
                        if (isCatch) {
                            wx.setStorageSync(key, res.data)
                        }
                        reslove(res.data)

                    } else {
                        this._show_error(res.data.error_code)
                    }
                },
                fail: (err) => {
                    this._show_error(1)
                }
            })
        })

    }
    _show_error(error_code) {
        if (!error_code) error_code = 1;
        // console.log(false || tips[1])
        wx.showToast({
            title: `${tips[error_code] || tips[1]}`,
            icon: 'none',
            duration: 2000
        })
    }
}
export {
    HTTP
}