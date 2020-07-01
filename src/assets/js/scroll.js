function $ (id) {
  return document.getElementById(id)
}
var flag = true
var lastScrollPosition = window.pageYOffset
window.addEventListener('scroll', function () {
  if (flag) {
    flag = false
    const currentScrollPosition = window.pageYOffset
    if (currentScrollPosition < lastScrollPosition) {
      $('nav').style.width = '100%'
      // $("nav").style.height = "auto"
      $('nav').style.overflow = 'auto'
      $('nav').style.padding = '0'
    } else {
      $('nav').style.width = '5%'
      $('nav').style.height = '70px'
      $('nav').style.overflow = 'hidden'
      $('nav').style.padding = '1.5% .8% 0 1%'
    }
    lastScrollPosition = currentScrollPosition
    setInterval(() => {
      flag = true
      clearTimeout(setInterval)
    }, 500)
  }
})
