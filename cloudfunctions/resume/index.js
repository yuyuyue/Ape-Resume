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
//表映射
const mapper = db.collection('apt_resume');
const resProMapper = db.collection('apt_resume_pro');
const resExpeMapper = db.collection('apt_resume_expe');
//  res 是一个对象， 其中有 _id 字段标记刚创建的记录的 id

// 调用其他云函数
const expe = (data) => {
  cloud.callFunction({
    name: 'expe',
    data
  })
}
const project = (data) => {
  cloud.callFunction({
    name: 'project',
    data
  })
}
const userdetail = (data) => {
  cloud.callFunction({
    name: 'userdetail',
    data
  })
}

// 增加
async function add(data) {
  const resus = await findAll(data);
  
   console.log("所有", resus);
  const isSaved = resus.data.some(item => item == data.name)
  console.log("=======",isSaved);
  
  if (isSaved) {
    code = 1; // 添加失败，名字重复
    return false ;
  } else {
     console.log("=======开始添加");
     data.createTime=util.formatTime(new Date())
    await mapper.add({data})
    // 中间表添加数据
    // resProMapper.add({
    //   data: {
    //     resu_name: data.name,
    //     pro_name: data.proName
    //   }
    // })
    // resExpeMapper.add({
    //   data: {
    //     resu_name: data.name,
    //     expe_name: data.expeName
    //   }
    // })
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

// 查
async function findByName(data) {
  // let data1 = {
  //   opt: 'selectById',
  //   data: {}
  // }
  // let userInfo = userdetail(data1).result;
  
  // // 个人实习信息
  // let expes = await resExpeMapper.where({
  //   openId: data.openId,
  //   resumeName: data.name
  // }).get();

  // let expeInfos = []
  // expes.forEach(item => {
  //   data1 = {
  //     opt: 'selectByName',
  //     data: {
  //       company: item.expeName
  //     }
  //   }
  //     expeInfos.push(expe(data1).result)
  // })

  // // 项目信息
  // let data2
  //  let pros = await resExpeMapper.where({
  //    openId: data.openId,
  //    resumeName: data.name
  //  }).get();
  //  let proInfos = []
  //  pros.forEach(item => {
  //    data2 = {
  //      opt: 'selectByName',
  //      data: {
  //        proname: item.proName
  //      }
  //    }
  //    proInfos.push(project(data1).result)
  //  })

   return await mapper.where({
    openId: data.openId,
    name: data.name
   }).get()
 

  // return {
  //   userInfo,
  //   proInfos,
  //   expeInfos
  // }
}

async function findAll(data) {
  // let resumes =  await mapper.where({
  //   openId:data.openId
  // }).get()
  // resumes.forEach(item=>{
  //   findByName(item)
  // })

  return await mapper.where({
    openId: data.openId
  }).get()
}

// 云函数入口函数
exports.main = async (event, context) => {

  const {
    opt,
    data
  } = event;
  data.openId = event.userInfo.openId;

  let result, code = 0;
  switch (opt) {
    case 'add':
       console.log("=======开始添加", data);
      result = await add(data);
      if(!result){
        code = 1
      }
      break;
    case 'deleteByName':
      result = await delByName(data);
      break;
    case 'updateByName':
      result = await updateByName(data);
      break;
    case 'selectByName':
      result = await findByName(data)
      break;
    case 'selectAll':
      try {
         result = await findAll(data);
         console.log(result);
      } catch (error) {
        return {
          error
        }
      }
     
      
      break;

    default:
      ;
  }


  return {
    result,
    code
  }
}