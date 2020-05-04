这几天发现任务标签出了 Bug ，不能正常修改，趁着今天有空，就上阿里服务器修改一下 Bug。 

```
···
mysql> show tables;
```

执行语句，看着这张表，我自以为发现了猫腻。  
这两表的名字怎么这么像呢？肯定有问题，持着怀疑的态度，我继续执行语句，以看穿他们的真面目。
```
mysql> show full columns from users_task_tag;
+------------+---------+-----------+------+-----+---------+----------------+---------------------------------+---------+
| Field      | Type    | Collation | Null | Key | Default | Extra          | Privileges                      | Comment |
+------------+---------+-----------+------+-----+---------+----------------+---------------------------------+---------+
| id         | int(11) | NULL      | NO   | PRI | NULL    | auto_increment | select,insert,update,references |         |
| task_id    | int(11) | NULL      | NO   | MUL | NULL    |                | select,insert,update,references |         |
| tasktag_id | int(11) | NULL      | NO   | MUL | NULL    |                | select,insert,update,references |         |
+------------+---------+-----------+------+-----+---------+----------------+---------------------------------+---------+
3 rows in set (0.00 sec)

mysql> show full columns from users_tasktag;
+-------+-------------+-----------------+------+-----+---------+----------------+---------------------------------+---------+
| Field | Type        | Collation       | Null | Key | Default | Extra          | Privileges                      | Comment |
+-------+-------------+-----------------+------+-----+---------+----------------+---------------------------------+---------+
| id    | int(11)     | NULL            | NO   | PRI | NULL    | auto_increment | select,insert,update,references |         |
| name  | varchar(16) | utf8_general_ci | NO   |     | NULL    |                | select,insert,update,references |         |
+-------+-------------+-----------------+------+-----+---------+----------------+---------------------------------+---------+
2 rows in set (0.00 sec)
```

这是我的 Django 模型

```py

class Task(models.Model):

    task_name = models.CharField(max_length=64)
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    tag = models.ManyToManyField("TaskTag")
    startDay = models.CharField(max_length=32)
    endDay = models.CharField(max_length=32)
    interval = models.IntegerField(default=3)

    def __str__(self):
        return self.task_name

class TaskTag(models.Model):
    name = models.CharField(max_length=16)
    def __str__(self):
        return self.name
```        

Task 与 TaskTag 是多对多关系，由于先前并不知道多对多关系实现，再加上 users_task_tag 奇怪的字段，于是无知的我"胸有成竹"地删掉了 users_task_tag 表。但，带来的结果是一天的思想劳作。  

删除前后数据表对比

雪，崩了！！！

不但之前的问题没有解决，而且不管怎么添加，修改字段，执行迁移都会报错，抛出的错误也各种各样。

```py
RuntimeError: Conflicting ‘connectioninfo’ models in application ‘detail’: <class ‘apps.detail.models.ConnectionInfo’> and <class ‘detail.models.ConnectionInfo’>

django.db.utils.OperationalError: (1050, "Table '表名' already exists）解决方法

Related model 'users.User' cannot be resolved

KeyError: ('users', 'test')

······
```

感觉一天就把能报的错都报了~~~

报错，肯定先找度娘了。

千篇一律的博文伴着千篇一律的解答：

1. 先把 app 目录下的迁移文件 migrations 删除（也有说删除其中的 initial.py 文件的）  
2. 接着进入到数据库，删除 django_migrations 表（也有说删除其中储存的 app 迁移数据）
3. 之后执行 python manage.py makemigrations 与 python manage.py migrate 即可（信你个鬼。。）

亲测，果真无用。

那到底怎么解决？

我们需要了解 Django  migration 的原理。  
当我们执行 python manage.py makemigrations 时发生了什么？  
它的功能是生成迁移文件，我们先看看这些文件的名字。

* 0001_initial.py  
* 0002_xxx.py
* 0003_xxx.py

规律应该很明显了，000n_xxx.py ，每迁移一次，n 就会增加 1。每次执行 python manage.py migrate 迁移后，这些相应的迁移文件就会被转化成 sql 语句执行。我们还可以发现，已经执行迁移命令的文件并不会删除，这是因为执行过迁移的文件会被记录在 django_migrations 中，以防在之后被重复执行，然而，这也就是造成 'xxx' already exist 问题的隐患之一。

我们可以执行命令 python manage.py showmigrations 来查看迁移文件的迁移情况。[x] 代表已经执行迁移，[] 则代表未执行迁移，将在下次执行 migrate 时执行。

```
admin
 [X] 0001_initial
 [X] 0002_logentry_remove_auto_add
 [X] 0003_logentry_add_action_flag_choices
auth
 [X] 0001_initial
 [X] 0002_alter_permission_name_max_length
 [X] 0003_alter_user_email_max_length
 [X] 0004_alter_user_username_opts
 [X] 0005_alter_user_last_login_null
 [X] 0006_require_contenttypes_0002
 [X] 0007_alter_validators_add_error_messages
 [X] 0008_alter_user_username_max_length
 [X] 0009_alter_user_last_name_max_length
 [X] 0010_alter_group_name_max_length
 [X] 0011_update_proxy_permissions
contenttypes
 [X] 0001_initial
 [X] 0002_remove_content_type_name
users
 [X] 0001_initial
 [X] 0002_blog_category_files_finishtask_phrase_relevant_sentence_tag_task_tasktag_user_usertoken_word
 [X] 0003_blog_category_files_phrase_relevant_sentence_tag_task_tasktag_test_usertoken_word
 [X] 0004_test
 [X] 0005_delete_test
 [X] 0006_auto_20200407_1955
 ```

了解了迁移文件的命名及迁移规律，我们接着打开其中的文件康康。

```py
from django.db import migrations, models
import django.db.models.deletion
class Migration(migrations.Migration):
    initial = True
    # 相关依赖
    dependencies = [
        ('users', '0001_initial'),
    ]
    operations = [
        # 创建，此语句将会在相应数据库中创建 app_model (app名_模型名) 数据表，如：users_category 
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=16)),
            ],
        ),
        # 删除，此语句将会删除相应数据库中的 app_model 数据表，如：users_test
        migrations.DeleteModel(
            name='Test',
        ),
    ]
```        

如果是未迁移文件，这些语句将会在 migrate 之后转化成 sql 语句执行。值得注意的是，这些语句执行不能回滚，他们不是事务！在错误操作下，这也是造成 'xxx' already exist 的问题隐患之一。

不过别担心，毕竟是先有迁移文件，再执行迁移。于是我们就有机会对迁移文件进行修改，做点手脚。

如果错误原因是 'xxx' already exist，我们先到数据库中观察，是否所有的模型都有相应的数据表，如果都有的话，我们只要执行,

```
python manage.py migrate --fake
```

这条命令的作用是，将这次迁移的文件记录在 django_migrations 中**但不执行**，这样，以后的迁移就可以跳过执行这些文件。

但，如果情况是，一部分模型没有对应的数据表，那可就不是 --fake 这么简单了。我们需要对具体的迁移文件进行处理。可以将那些已经存在数据表的模型注释或删除掉，执行 migrate 时自然就会不执行那些造成错误的语句了。

问题到这里已经解决得差不多了。主要是理解 migration 原理。  
还有一些小坑，比如更新了模型，但 python manage.py makemigrations 却没有检测到变化(并不是不能检测到变化，只是偶然出错)。我们可以让模型回到变化之前，执行 python manage.py makemigrations，接着执行 python manage.py migrate --fake ，这样，此时的迁移文件并没有被执行，也就不会报错啦，之后将模型再修改回来，

python manage.py makemigrations  
python manage.py migrate

即可

理解了 migration 原理，确实对解决问题提供了更加清晰的思路。  
不再是无脑 fake 。

教程只是教程，希望你们永远不要遇见。

