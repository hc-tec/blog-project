// localhost:8001
// 39.100.22.224
const HOST = 'localhost:8001';

// 博文置顶
const STICKY_ARTICLE = id => {
  return `http://${HOST}/api/sticky/${id}`;
}

// 用户信息修改
const USER_INFO_MODIFY = id => {
  return `http://${HOST}/api/UserInfoModify/${id}`;
}

export {
    HOST
  , STICKY_ARTICLE
  , USER_INFO_MODIFY
}
