const postDataFormat = (data) => {
  let dataString = ''
  const keys = Object.keys(data)
  const len = keys.length
  keys.forEach(el => {
    if (el != keys[len - 1]) {
      dataString += `${el}=${data[el]}&`
    } else {
      dataString += `${el}=${data[el]}`
    }
  })
  return dataString
}

// 字典合并
const mergeDict = function (dict_1, dict_2) {
  const mergeList = [...Object.keys(dict_1), ...Object.keys(dict_2)]
  const mergeObject = {}
  for (const el of mergeList) {
    mergeObject[el] = dict_1[el] || dict_2[el]
  }
  return mergeObject
}

const GetDateTimeToString = function () {
  var date_ = new Date()
  var year = date_.getFullYear()
  var month = date_.getMonth() + 1
  var day = date_.getDate()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day

  var hours = date_.getHours()
  var mins = date_.getMinutes()
  var secs = date_.getSeconds()
  var msecs = date_.getMilliseconds()
  if (hours < 10) hours = '0' + hours
  if (mins < 10) mins = '0' + mins
  if (secs < 10) secs = '0' + secs
  if (msecs < 10) secs = '0' + msecs
  return `${year}/${month}/${day} ${hours}:${mins}:${secs}`
}

const DateTimeDiff = function (PrevDate, NextDate) {
  // 格式为 2020/05/21 16:32:10
  const getDateDetails = function (Date) {
    return [...Date.split(' ')[0].split('/'), ...Date.split(' ')[1].split(':')]
  }
  const initRequire = function (preYear, preMonth, preDay, nowYear, nowMonth, nowDay) {
    return preYear === nowYear &&
           preMonth === nowMonth &&
           preDay === nowDay
  }

  const [preYear, preMonth, preDay, preHour, preMinute] = getDateDetails(PrevDate)
  const [nowYear, nowMonth, nowDay, nowHour, nowMinute] = getDateDetails(NextDate)

  if (initRequire(preYear, preMonth, preDay, nowYear, nowMonth, nowDay)) {
    const nowMinutes = parseInt(nowHour) * 60 + parseInt(nowMinute)
    const preMinutes = parseInt(preHour) * 60 + parseInt(preMinute)
    return nowMinutes - preMinutes <= 5
  }
  return false
}

const genericError = (e) => {
  console.log(e)
}

const debounce = (fn, time) => {
  let timer= null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn()
    }, time);
  }
}

export {
  postDataFormat,
  mergeDict,
  GetDateTimeToString,
  DateTimeDiff,
  genericError,
  debounce
}
