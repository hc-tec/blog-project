
<font size=6 color=red>引言：</font>  
<font face="楷体" size=4>　　map、fliter、reduce是python进阶学习时必学的三个重要函数。如果能够将他们合理运用，你的python代码将会较<font color=red>靠普通循坏完成这些功能的代码</font>快上很多。</font>  
<font color=orange size=4>　　接下来一一介绍他们的用法。</font>  
<font face="Times New Roman" size=7 color=blue>map</font>  
<font size=4 face="黑体">　　map就如其名一般，对列表进行全面铺展，不放过一丝一毫，每个元素经过它处理后犹如净身魔灵，发挥出其独特的魅力。<del>咳咳，不扯了，说正事</del></font>  
<font size=4 face=""黑体>　　详细用法请看栗子：</font>  
```python
	numbers = [1,2,3,5,4,9,11]
	sqrt_num = list(map(lambda x:x*x,numbers))
       #sqer_num = [1,4,9,25,16,81,121]
```	 
<font face="Times New Roman" size=7 color=blue>fliter</font>  
<font size=4 face="黑体">　　fliter是一把筛子，将一切“奇沙怪石”清除殆尽。<del>当然也包括栗子</del></font>    
```python
	numbers = range(-5,5)
	past_num = list(fliter(lambda x:x>0,numbers))
       #numbers = [1,2,3,4]
```
<font face="Times New Roman" size=7 color=blue>reduce</font>  
<font size=4 face="黑体">　　reduce则不同于它的其他两位兄弟，它拜师高门(functools),深藏不漏，不出山时寂然无声，一旦出山则一鸣惊人！</font>    
```python
	import functools
	numbers = [1,5,8,6,2]
	sum_num = reduce((lambda x,y:x+y),numbers)
```

----------
<center><font size=4 color=gray>END</font></center>