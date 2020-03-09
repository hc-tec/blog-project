引言：

仅仅使用 python 自带的 pip 下载 python 包速度非常慢，平均15Kb/s，这与我们高效率工程显然相悖。所以我们需要更换 pip 国内安装源。

解决方法：

pip国内的一些镜像


阿里云 http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
豆瓣(douban) http://pypi.douban.com/simple/
清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/


修改源方法：

临时使用：

可以在使用pip的时候在后面加上-i参数，指定pip源


pip install scrapy -i https://pypi.tuna.tsinghua.edu.cn/simple

永久修改：

直接在user目录中创建一个pip目录，如：C:\Users\xx\pip，在pip 目录下新建文件pip.ini或者按照网友的建议：win+R 打开用户目录%HOMEPATH%，在此目录下创建 pip 文件夹，在 pip 目录下创建 pip.ini 文件, 内容如下


[global]
timeout = 6000
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
trusted-host = pypi.tuna.tsinghua.edu.cn