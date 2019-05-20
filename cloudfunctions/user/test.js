const cloud = require('wx-server-sdk');
cloud.init({
    secretId: 'AKIDDMPDn8i8mFTlrmMv783mFjyypUvAttRk',
    secretKey: 'CKDrGPK5cvzpWx8D8nCLEsGPIzRdaJn1',
    env: 'wzy-5de360'
})
var mode = require('./index')
let event = {
    opt: "add",
    data: {
        nickName: "老王",
        avatarUrl: "aaa",
        province: "bb",
        city: "ccc"
    }
}
mode.main(event);