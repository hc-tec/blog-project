function $(id){
  return document.getElementById(id)
}
var sourInfo = $("error").innerHTML.toString()
$("error").innerHTML = ""

var i = 0
var se = setInterval(() => {
  $("error").innerHTML = sourInfo.slice(0, i)
  i++
  if(i === sourInfo.length){
    $("error").innerHTML = sourInfo
    clearInterval(se)
  }
}, 20)
