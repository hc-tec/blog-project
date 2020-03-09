

引言：

使用 git 过程中，总是出现那些令人摸不着头脑的错误，尤其是我这样的萌新，错误更是家常便饭。这不，今天又出现了一个 Git 问题。不过好在我<del>度娘神威</del>求知若渴，顺利解决，顺便写篇博文来"纪念"。

问题缘由：

		　　爆肝到凌晨三点硬是把博客“瓜分”完成，第二天 git push 时突然出现问题。


H:\WEB\HUGO\blog\public>git push<br />
To https://github.com/ASP-CC/asp-cc.github.io.git<br />
! [rejected]        master -> master (fetch first)<br />
error: failed to push some refs to 'https://github.com/ASP-CC/asp-cc.github.io.git'<br />
hint: Updates were rejected because the remote contains work that you do<br />
hint: not have locally. This is usually caused by another repository pushing<br />
hint: to the same ref. You may want to first integrate the remote changes<br />
hint: (e.g., 'git pull ...') before pushing again.<br />
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

	<p>
		想到前一天我在 github上新添了一个 readme.md 文件，再结合这个问题，不难想到解决方法。
	</p>
	<p class="solve">问题解决：</p>

		git pull origin master
		git push origin master

