<div>
	<p class="intro">引言：</p>
	<p>　　使用 git 过程中，总是出现那些令人摸不着头脑的错误，尤其是我这样的萌新，错误更是家常便饭。这不，今天又出现了一个 Git 问题。不过好在我<del>度娘神威</del>求知若渴，顺利解决，顺便写篇博文来"纪念"。</p>
	<p class="reason">问题缘由：</p>
	<p>　　前些天，我姑父突然想让我帮他做一个网站，放些店铺资料、手机配件信息等上去以供顾客观顾。我自然而然地想到了 Git。然而，正当我准备 push 到远程仓库时，错误出现了。</p>
	<pre>
remote: Permission to userA/repo.git denied to userB.
fatal: unable to access 'https:／／github.com/userA/repo.git/': The requested URL returned error: 403</pre>
	<p class="solve">问题解决：</p>
	<p>　　通过分析我们可以发现，userB 否认了 userA 的 push 权限。也就是说，我先前已经 git config 了我的 git账号至 global 中(可通过在命令行中输入 git config -l 查询)，这时又突然出现了一个未知账号，显然冲突了。现在问题明了了，我们只需取消掉以前 git config 的信息即可。这个问题，我们可以通过删除其凭据来解决。具体方法如下：</p>
	<p>　　按照 “控制面板 -> 用户帐户和家庭安全 -> 凭据管理器”依次打开，找到“普通凭据”中的“git:https:／/github.com”，将其删除即可。<img src="\del_pingju.jpg">再次 push，会弹出一个窗口，提示你输入 github 账号及密码，输入完成之后，会自动生成一个新的凭据。此问题也顺利解决。</p>
</div>