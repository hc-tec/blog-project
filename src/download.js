const download = function(url){
  try {
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      } catch (e) {
        console.log(e);
      }
}
export default download
