<template>
  <div class="feed">
    <h1>网站故事</h1>
    <div class="blog-story">
      一次偶然的机会，我加入到了一个大学同学推荐的网页设计比赛中。奖金丰厚，一等奖有3000元RMB。<br />
      十天的前端开发，我制作出了此网站的雏形。并上交了作品。<br />
      但是，结局不尽人意，评委方注重网页的布局，追求视觉冲击。而我是以实用性为出发点，结合简洁风的设计，加上本人能力有限。(拿奖是不可能拿奖的，这辈子都不可能拿奖)<br />
      没有拿到奖，心情着实比较低落，想放弃博客网站的开发。<br />
      Django 来了。<br />
      一切似乎又有生气了ne。<br />
      受够了 Github Hugo、Hexo博客的非实时性限制，受到部门 <a href="https://bbs.ncutea.com/" target="_blank">bbs </a> 网站的启发，<br />
      于是重启博客开发计划。进行前后端分离开发。<br />
      2020.3.31，正式开放注册功能，也宣告着此网站第一阶段开发正式结束。<br />
      第二阶段，无非就是缝缝补补了，修改了关于页样式，博文页样式，适配移动端，并开放了评论功能。也许会持续几年(确信。<br />
      ......<br />
    </div>
    <h1>赞助</h1>
    <div class="feed-text">
      如果你喜欢这个知识分享网站或者认为能从中受益的话，请您别忘了多多支持这个刚刚大一而无任何经济来源的站主喔。
    </div>
    <div class="pay-img">
      <div>
        <img src="http://39.100.22.224/static/b9035556-d9de-4a5c-bca0-4794eb182c52.jpg"/>
        <p class="zhifubao">支付宝</p>
      </div>
      <div>
        <img src="http://39.100.22.224/static/b4b67286-1f86-42ec-bb81-ad3650adda53.jpg"/>
        <p class="weixin">微信</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed {
  line-height: 1.75;
  width: 700px;
  padding: 50px 30px 10%;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.blog-story,
.feed-text {
  padding-left: 20px;
}
.feed h1 {
  padding-left: 0;
  position: relative;
}
.feed h1::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  top: 0;
  left: -10px;
  background: #27e6f3;
}
.pay-img {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.pay-img > div {
  text-align: center;
}
.pay-img > div p {
  font-weight: bold;
  font-size: 1.3em;
}
.pay-img img {
  width: 280px;
  height: 300px;
  border: 15px solid #8080804a;
  border-radius: 30px;
}
.zhifubao,
.weixin {
  width: 100px;
  margin: 0 auto;
  border-radius: 20px;
  color: white;
}
.zhifubao {
  background-color: rgb(0,159,231);
}
.weixin {
  background: rgb(34,171,56);
}
@media screen and (max-width: 800px){
  .feed {
    width: 90%;
    padding: 50px 30px 10%;
  }
}
</style>
