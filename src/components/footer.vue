<template>
  <div id="pageFoot">
    <div class="foot_font">
      <div id="foot_about">
        <h3>关于本站</h3>
        <p>
          本站是个人博客网站，2019.11.20日正式建成，托管于 <a href="https://github.com/ASP-CC/contest" target="_blank"> Github </a>，主要致力于 WEB 前端开发、Python算法及其他学科知识分享。“路漫漫其修远兮，吾将上下而求索”。
        </p>
      </div>
      <div id="foot_friend">
        <h3>友情链接</h3>
        <ul>
          <a v-for="info,friend in divine_spirit" :href="info[2]" target="_blank" :title="info[0]">{{ friend }}</a>
        </ul>
      </div>
    </div>
    <div id="foot_bottom">
      <p>Copyright © 2020 · <router-link to="/" class="foot_a">Titto</router-link> · All Rights Reserved.</p>
      <p id="time"></p>
    </div>
  </div>
</template>

<script>
import '../assets/js/footer'
export default {
  data() {
    return {
      divine_spirit: {
        "sketch plane"  			: ["南昌大学Olink队队长" 											, ""												, "http://www.sketchplane.top/"		],
        "离怀秋"   					: ["南昌大学Olink队队长"											, ""												, "https://lihuaiqiu.github.io/"	],
        "dimpurr"					: ["北邮大三生，知名前端博主，建立了 BYRIO 开源社区。"				,"北邮大三生，知名前端博主，建立了 BYRIO 开源社区。"		, "http://blog.dimpurr.com/"		],
        "diygod"        			: ["知名前端博主，过气网红，先后在 哔哩哔哩 、 丁香园供职"			,"知名前端博主，过气网红，先后在 哔哩哔哩 、 丁香园供职" , "https://diygod.me/"				],
        "清华大学 TUNA 协会博客" 		: ["萌新慎点〒▽〒"												, ""												, "https://tuna.moe/blog/"			],
        "统计之都"					: ["喜欢统计学的来"												, "统计学"											, "https://cosx.org/"				],
        "一休儿的哲学博客"			: ["哲学--欢迎精心阅读"											, ""												, "https://yixiuer.me/"				],
        "Littleor"     			 	: ["重庆邮电的大一新生，是个极客"									,"重庆邮电的大一新生，是个极客"						, "https://blog.sixming.com/"		],
        "折影轻梦"       			: ["厉害的高中生"													, "厉害的高中生"										, "https://nexmoe.com/"				],
        "TonyHe"					: ["也是厉害的高中生"												, "厉害的高中生"										, "https://hjyl.org/"				],
        "图月志" 					: ["UI 设计师"													, "UI 设计师"										, "http://iconmoon.com/"			],
        "guyskk"					: ["家园工作室的前辈"												, "家园工作室的前辈"									, "http://blog.guyskk.com/"			],
        "余果"						: ["一个设计总监"													, "一个设计总监"										, "https://yuguo.us/"				],
        "北邮人博客圈"				: ["BYRIO"														, "北邮人博客圈"										, "https://planet.byr.moe/"			],
        "张哲夫学长" 				: ["大神的博客"													, ""												, "https://fumeboy.github.io"		]

      },
    }
  }
}
</script>
<style src="../assets/css/shake.css"></style>
<style scoped>
    .foot_font {
			background-color: rgb(23,26,33);
			height: 100%;
			margin: 0 0 0 0;
			overflow: hidden;
			padding: 3% 15% 1% 15%;
		}
		.foot_font > div {
			margin-bottom: 5%;
		}
		.foot_font h3 {
			margin-bottom: 3%;
			color: white;
    }
    #foot_about p {
      color: gray;
    }
		#foot_about a {
			text-decoration: none;
			color: white;
		}
		#foot_about a:hover {
			color: gray;
		}
		#foot_friend a {
			text-decoration: none;
			color: gray;
      margin-right: 2%;
      transition: all .5s;
		}
		#foot_friend a:hover {
      color: white;
      border-bottom: .5px solid white;
		}
		.foot_a {
			color: blue;
			text-decoration: none;
		}
		.foot_a:hover {
			color: rgb(71,26,139);
    }
    #emotion {
			margin: 0 5px;
			display: inline-block;
			animation: shake 5s infinite;
		}
		#foot_bottom * {
			padding: 0;
			margin: 0;
		}
		#foot_bottom {
			padding: 2% 0 1% 0;
			background-color: rgb(255,255,255);
			color: black;
			text-align: center;
		}
		#foot_bottom p {
			margin-bottom: 1%;
		}

</style>
