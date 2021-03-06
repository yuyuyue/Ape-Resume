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
const mapper = db.collection('apt_user_detail');
//  res 是一个对象， 其中有 _id 字段标记刚创建的记录的 id


// 增加
async function add(data) {
  const isSaved = await findById(data);

  if (isSaved.data.length > 0) {
    code = 6; //修改成功
    return await updateById(data);
  } else {
    data.createTime = util.formatTime(new Date());
    return mapper.add({
      data
    })
  }
};

// 删除
function delByName(data) {
  return mapper.where({
    openId: data.openId,
    name: data.name
  }).remove()
};

// 改
function updateByName(data) {
  data.updateTime = util.formatTime(new Date());
  return mapper.where({
    openId: data.openId,
    name: data.name
  }).update({
    // data 传入需要局部更新的数据
    data
  })
};

function updateById(data) {
  data.updateTime = util.formatTime(new Date());
  return mapper.where({
    openId: data.openId
  }).update({
    // data 传入需要局部更新的数据
    data
  })
};

function updateHeaderById(data) {
  data.updateTime = util.formatTime(new Date());
  return mapper.where({
    openId: data.openId
  }).update({
    // data 传入需要局部更新的数据
    data:{
      headerImg: data.headerImg[0]
    }
  })
};

// 查
function findByName(data) {
  return mapper.where({
    openId: data.openId,
    name: data.name
  }).get()
}

function findById(data) {
  return mapper.where({
    openId: data.openId
  }).get()
}

function findAll(data) {
  return mapper.where({
    openId: data.openId
  }).get()
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
      console.log("=====", data);

      result = await add(data);
      break;
    case 'deleteByName':
      result = await delByName(data);
      break;
    case 'updateByName':
      result = await updateByName(data);
      break;
    case 'updateById':
      result = await updateById(data);
      break;
    case 'updateImg':
      console.log("=====", data.headerImg);
      result = await updateHeaderById(data);
      break;
    case 'selectByName':
      result = await findByName(data)
      break;
    case 'selectAll':
      result = await findAll(data);
      break;
    case 'selectById':
      result = await findById(data);

    default:
      ;
  }


  return {
    result,
    code
  }
}