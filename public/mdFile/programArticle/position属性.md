
POSITION属性
引言:  
　　制作网页过程中，我们经常需要用到position这个属性，不过用了这么久，我们到底有木有彻底理解呢？  

-------
position属性共有五个值： 
 > static   
 > relative  
 > fixed  
 > absolute  
 > sticky  
　　元素可以使用的顶部，底部，左侧和右侧属性定位。然而，这些属性无法工作，除非是先设定position属性。他们也有不同的工作方式，这取决于定位方法。  
static 
HTML 元素的默认值，即没有定位，遵循正常的文档流对象。
静态定位的元素不会受到 top, bottom, left, right影响。  
```css
div.static {
  position: static;
  border: 3px solid #73AD21;
	text-align: center;
}
```
☟ 
<div style="position:static;border: 3px solid #73AD21;text-align:center;">Hello,WEB</div>  
fixed 
元素的位置相对于浏览器窗口是固定位置。
即使窗口是滚动的它也不会移动：  
```css
			button{
				position: fixed;
				background-color: #ccc;
				color: #fff;
				left: 0;
				top: 50%;
			}
```
<button style="position: fixed;background-color: #ccc;color: #fff;left: 0;top: 50%;">Hello,WEB</button>  
relative
相对定位元素的定位是相对其正常位置,有以下特性：  

 > 移动相对定位元素，但它原本所占的空间不会改变。  
 > 相对定位元素经常被用来作为绝对定位元素的容器块。

```css
p{
	position: relative;
	left: 5%;
	background-color: #ccc;
}
```
<p style="position: relative;left: 5%;background-color: #ccc;">Hello.WEB</p>  
absolute
绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于其具有以下特性： 
> absolute 定位使元素的位置与文档流无关，因此不占据空间。  
> absolute 定位的元素和其他元素重叠。  
下面是一个 relative 与 absolute 结合使用的进度条实例  
```css   
		.progress {
			position: relative;
			width: auto;
			height: 8px;
			margin: 0 auto;
  			border-radius: 8px;
  			background-color: #ccc;
		}
		@keyframes bar_move{
			from   {
				width: 0;
			}
			to     {
				width: 100%;
			}
		}
		.progress .progress-bar {
			position: absolute;
			left: 0;
			top: 0;
			width: 0%;
			animation: bar_move 10s;
			height: 8px;
			border-radius: 8px;
			background-color: #2d8cf0;
		}
		.progress .progress-bar .animate-bar {
			position: absolute;
			left: 0;
			top: 0;
			width: 0%;
			height: 8px;
			border-radius: 8px;
			opacity: 0;
			background-color: #fff;
			-webkit-animation: progress-active 1s ease-in-out infinite;
			animation: progress-active 1s ease-in-out infinite；
		}
		@-webkit-keyframes progress-active {
			0% {
				opacity: .3;
				width: 0;
			}
			to {
				opacity: 0;
				width: 100%;
			}
		}
		@keyframes progress-active {
			0% {
				opacity: .3;
				width: 0;
			}
			to {
				opacity: 0;
				width: 100%;
			}
 		}
```

```html
		<div class="progress">
			<div class="progress-bar">
				<div class="animate-bar"></div>
			</div>
		</div>
```

<div class="progress">
	<div class="progress-bar">
		<div class="animate-bar"></div>
	</div>
</div>  
sticky  
sticky 英文字面意思是粘，粘贴，所以可以把它称之为粘性定位。

position: sticky; 基于用户的滚动位置来定位。

粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。

它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。

元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。  
```css
			button{
				position: sticky;
				background-color: #ccc;
				color: #fff;
				top: 0;
			}
```
<div style="width:auto;height:auto;"><button style="position: sticky;top:0;background-color: #ccc;color: #fff;">Hello,WEB</button></div>   
		



