const postDataFormat = (data) => {
  let dataString = '';
  let keys = Object.keys(data);
  let len = keys.length;
  keys.forEach(el => {
    if(el != keys[len-1]){
      dataString += `${el}=${data[el]}&`;
    } else {
      dataString += `${el}=${data[el]}`;
    }
  })
  return dataString;
}

// 字典合并
const mergeDict = function(dict_1, dict_2){
  let mergeList = [...Object.keys(dict_1), ...Object.keys(dict_2)];
  let mergeObject = {};
  for(let el of mergeList){
    mergeObject[el] = dict_1[el] || dict_2[el];
  }
  return mergeObject;
}

export { postDataFormat, mergeDict }
