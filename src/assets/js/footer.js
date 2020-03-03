//其中starttime格式为20180101010101
function getYMDHMS(startTime, endTime) {

  if(startTime.length < 14 || endTime.length < 14) {
      alert('时间格式不正确');
  }

  var startArr = [startTime.substring(0, 4), startTime.substring(4, 6), startTime.substring(6, 8), startTime.substring(8, 10), startTime.substring(10, 12), startTime.substring(12, 14)];//切分开始时间为数组
  var endArr = [endTime.substring(0, 4), endTime.substring(4, 6), endTime.substring(6, 8), endTime.substring(8, 10), endTime.substring(10, 12), endTime.substring(12, 14)];//切分结束时间为数组
  var dateStart = new Date(startArr[0], startArr[1], startArr[2], startArr[3], startArr[4], startArr[5]);//采用new Date(yyyy,mth,dd,hh,mm,ss);创建方式分别传入年月日时分秒
  var dateEnd = new Date(endArr[0], endArr[1], endArr[2], endArr[3], endArr[4], endArr[5]);
  var dateInterval = dateEnd.getTime() - dateStart.getTime() //获取时间差毫秒
  //计算出相差天数
  var days = Math.floor(dateInterval / (24 * 60 * 60 * 1000));
  //计算小时数
  var hourLevel = dateInterval % (24 * 60 * 60 * 1000);
  var hours = Math.floor(hourLevel / (60 * 60 * 1000))
  //计算分钟数
  var minutesLevel = hourLevel % (60 * 60 * 1000);
  var minutes = Math.floor(minutesLevel / (60 * 1000));
  //计算秒数
  var seconds = Math.round((minutesLevel % (60 * 1000)) / 1000);
  return days + "<font color='blue'>天</font>" 
      + hours + "<font color='blue'>时</font>" 
    + minutes + "<font color='blue'>分</font>" 
    + seconds + "<font color='blue'>秒</font>" ;
}
//网站稳定运行时间
setInterval(function(){
var dateEnd = new Date();//获取当前时间
var year = dateEnd.getFullYear().toString();
var month = (dateEnd.getMonth()+1).toString();
if (month.length === 1)
month = 0 + month;
var day = dateEnd.getDate().toString();
if (day.length === 1)
day = 0 + day;
var hour = dateEnd.getHours().toString();
if (hour.length === 1)
hour = 0 + hour;
var minute = dateEnd.getMinutes().toString();
if (minute.length === 1)
minute = 0 + minute;
var second = dateEnd.getSeconds().toString();
if (second.length === 1)
second = 0 + second;
endTime = year+month+day+hour+minute+second;
startTime = "20200303170700";
document.getElementById("time").innerHTML = "<span id='emotion'>(●'◡'●)ﾉ♥ </span>网站已稳定运行: " + getYMDHMS(startTime, endTime);
},1000);