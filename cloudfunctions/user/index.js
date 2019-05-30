// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'yby-d2ju2'
cloud.init()
//    表字段  
//    前台传递数据 avatarUrl  nickName  sex  name   
//    自添加数据   openId: wxContext.OPENID,createTime: new Date()

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


    return [year, month, day].map(this._formatNumber).join('/') + ' ' + [hour, minute, second].map(this._formatNumber).join(':')
  }
  _formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}
const util = new Utils();
const db = cloud.database({
  env
});
const mapper = db.collection('apt_user');
//  res 是一个对象， 其中有 _id 字段标记刚创建的记录的 id


// 增加
async function add(data) {
  const checkUser = await findById(data.openId);

  if (checkUser.data.length > 0) {
    return await update(data);
  } else {
    data.createTime = util.formatTime(new Date());
    return mapper.add({
      data
    })
  }
 
};

// 删除
function delById(openId) {
  return mapper.where({
    openId
  }).remove()
};

// 改
function update(data) {
  data.updateTime = util.formatTime(new Date());
  return mapper.update({
    // data 传入需要局部更新的数据
    data
  })
};

// 查
function findById(openId) {
  return mapper.where({
    openId
  }).get()
}

function findByName(name) {
  return mapper.where({
    name
  }).get()
}

function findAll() {
  return mapper.get()
}

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // console.log(event.userInfo, '>>>>>>>>>');
  // console.log(wxContext, '？？？？？？？？？？？？？？？？？？？？');
  const {
    opt,
    data
  } = event;
  data.openId = event.userInfo.openId;

  let result, code = 0;
  switch (opt) {
    case 'add':
      result = await add(data);
      break;
    case 'delete':
      result = await delById(data.openId);
      break;
    case 'update':
      result = await update(data);
      break;
    case 'selectById':
      result = await findById(data.openId)
      break;
    case 'selectAll':
      result = await findAll();
      break;

    default:
      ;
  }


  return {
    result,
    code
  }
}