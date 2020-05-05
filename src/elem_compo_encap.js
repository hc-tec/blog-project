import {
  MessageBox,
  Message,
  Notification, } from 'element-ui'
import axios from 'axios'

const postMsg = (msg, info) => {
  Message({
      message: msg,
      type: info,
  })
}

function notify(title, msg, type) {
  Notification({
    title: title,
    message: msg,
    type: type
  });
}

function get(url, params={}, resolve, reject){
  axios.get(url, {params:params})
    .then(response => resolve(response.data))
    .catch(e => reject(e))
}

function post(url, data, resolve, reject){
  axios.post(url, data)
    .then(response => resolve(response.data))
    .catch(e => reject(e))
}

export { postMsg, notify, get, post }

