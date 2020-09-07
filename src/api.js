// localhost:8001
// 39.100.22.224
const HOST = '39.100.22.224'

const $HOST = `http://${HOST}`


// 外部API，每日一诗
const POEM = `https://v2.jinrishici.com/one.json`

// 图片获取、删除接口
const IMAGE = `${$HOST}/api/files`

// 文件上传
const FILE_LOADER = `${$HOST}/api/fileLoader`

// 榜单
const RANK = `${$HOST}/api/rankList`

// 随机获取推荐文章
const RECOMMEND_ARTICLE = `${$HOST}/api/recommendArticle`

// 任务清单
const TODOLIST = `${$HOST}/api/task`

// 所有图片
const IMAGE_COLLECTION = `${$HOST}/api/files`

// 邮箱订阅
const SUBSCRIPT = `${$HOST}/api/subscribe`

// 图片上传
const UPLOAD = `${$HOST}/api/fileLoader`

// 云盘文件
const YUN_DISK_FILE = id => {
  return `${$HOST}/api/yunDisk/${id}`
}

// 某个用户的创作集
const CREATIVE_COLLECTION = id => {
  return `${$HOST}/api/createdArticle/${id}`
}

// 博文置顶
const STICKY_ARTICLE = id => {
  return `${$HOST}/api/sticky/${id}`
}

// 用户信息修改
const USER_INFO_MODIFY = id => {
  return `${$HOST}/api/UserInfoModify/${id}`
}

// 个人空间背景图片
const USER_SPACE_BGIMAGE = id => {
  return `${$HOST}/api/setBgImage/${id}`
}

export {
    HOST
  , FILE_LOADER
  , POEM
  , IMAGE
  , RANK
  , SUBSCRIPT
  , TODOLIST
  , UPLOAD
  , IMAGE_COLLECTION
  , RECOMMEND_ARTICLE
  , YUN_DISK_FILE
  , STICKY_ARTICLE
  , USER_INFO_MODIFY
  , CREATIVE_COLLECTION
  , USER_SPACE_BGIMAGE

}
