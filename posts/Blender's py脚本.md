# title: Blender Python脚本编写

# 实验笔记：基础的Blender Python脚本编写

用轮子→改轮子→造轮子，而**Blender **Pyt**hon API**使得GUI里进行的操作十有八九都能用命令行敲出来。虽然相关的教程已经够多了，不过这次的目的还是 **“将（折腾MMD时的）部分操作替代为脚本，从而提升工作效率”** 。

自己的代码基本功不怎么扎实，读起来或许会有些费劲，如果有什么issue也还请各位同好加以纠正。

**目录**

1. 环境/工具提示配置
2. bpy.context - 获取信息
3. bpy.data - 物体处理
4. 控制台→脚本注意事项
5. 简单的实战案例

**写在前面**

先放一篇知乎上的参考文章，虽然作者还在坑，但现有的部分已经很不错了：

## Blender Python 简易参考

Blender作为一套建模、仿真、动画和渲染的免费开源软件。同时它提供了Python API，script，开放了Python API允许用户通过编写python script或直接使用python命令行来控制软件。**免费|开源|易用|可编程**吸引了大批个人艺术家、研究者、开发者、学生。

因为前段时间的工作中需要批量渲染合成数据，我学习了Blender的脚本控制，中途踩过一些坑，也为Blender Python文档很查起来费劲而头疼过。我写下这个博客，既是为别人提供一个快速入门的教程，也是方便自己以后如果再需要能查阅。

Blender Python脚本的功能及特点：

* 调用方便，并且同时可以调用Python其他库例如OpenCV, numpy。Python能做什么，Blender Python就能做什么。
* Python script在Blender中的作用是**批量处理**和 **流程化地控制** ， **而不是用来编写事件的** 。举例来说，Python之于Blender是用来控制软件本身来完成一些原本需要手动操作的繁重工作，而C#之于Unity是控制场景中事件的发生。
* Python即可以在Blender窗口中运行，也可以off window执行。**当Python脚本运行时UI窗口会卡死，你只能等待脚本运行结束，或在System Console中查看输出或按Ctrl+C掐断运行。**
* Blender插件是用Python编写的，不妨把插件看作是别人写的Python脚本。
* 几乎UI中每个控件都有对应的Python API，理论上任何手动操作都可以被python脚本实现。如果在Edit->Preference中打开python tooltip，鼠标悬浮在对应的控件上，就会显示对应的python代码是什么。

首先想谈一下如何“学习”Blender + Python。最高效的方法是 **我要做什么我就学什么** 。Blender的Python仅仅是一套工具而已，我猜对于大多数要用Blender python脚本的人来说，应该是当下就有一件明确要做的任务才要学python脚本的，很少人或说“我要精通Blender + python”，然后从零开始慢慢学起。如果你去看API文档，然后上来“bpy包含几大模块，bpy.ops, bpy.data, bpy.mesh, bpy.context“云云，看了半天还不知道该干嘛，记也没记住，十分低效。那不如你在这篇博客里找找常见操作的代码，直接就可以用了，用了几个差不多就知道bpy是怎样一个设计的逻辑了，一个下午就能完成任务是最好的。

当然，“快速入门”是在你已经一定程度上掌握python的前提下的，另外应当掌握一点blender的使用。如果你完全不会Python，那么应该先花数周时间学习python；如果你完全不会用blender，可以花一个小时看个教程入门。这篇文章内容也有限，如果没有你需要的内容，建议先去stack overflow，再去查API文档。

> 在本文撰写时(2022年)，还只能使用Blender软件内的python。而现在Blender官方已经推出了 pypi bpy 包，可以pip install bpy安装，这意味着bpy将可以在普通的python环境中使用，而无需安装blender软件！可以理解成类似于blender --python -b的无窗口启动，但是由于直接嵌在你自己的python环境中，能方便地调用其他的python包，方便了许多。
> 为了方便直接看效果，这里大部分示例和教程仍然是在软件中运行的。

## 系列链接

（缓慢更新中，无链接说明还没更新）

### 1. [列出/插入/删除物体](https://zhuanlan.zhihu.com/p/545188859)

### 2. [设置物体位置旋转等属性](https://zhuanlan.zhihu.com/p/546854470)

### 3. [模型文件导入导出](https://zhuanlan.zhihu.com/p/555664610)

### 4. [摄像机](https://zhuanlan.zhihu.com/p/570621159)

### 5. [将网格导出为 numpy / trimesh](https://zhuanlan.zhihu.com/p/545209548)

### 6. [渲染与输出](https://zhuanlan.zhihu.com/p/580658988)

### 7. [关键帧动画](https://zhuanlan.zhihu.com/p/682185533)

### 8. 骨骼与骨骼动画

### 9. 形态键(shapekey)

### 10. 编辑网格(mesh)

### 11. 修改器（modifier）与约束（constraint）

### 12. 材质节点/贴图导入

### 13. 调用插件

### 14. [安装Python包](https://zhuanlan.zhihu.com/p/546532034)

## 开始之前

### 1. 在Blender软件里编写和运行代码

切到*Scripting*选项卡可以看到它们。一是 **交互式命令行python console** ，这个命令行窗口中默认已经import bpy 和 from math import *。它的代码补全提示很方便，按tab即可列出所有候选，方便找需要的方法和对象以及字典的键值。请务必活用python consle窗口的补全提示功能。二是 **文本编辑器Text Editor** ，点New/Open新建脚本或打开脚本，点运行按钮执行。script text的python运行环境与交互式命令行不同，必须要显式地import bpy。

bpy是**b**lender **py**thon的库，大部分你需要的API都在这里面。

![](https://pic2.zhimg.com/v2-71ceb1de08a21602cd16a8bb64e1cff5_r.jpg)

在python console中可以交互式地执行脚本，按tab键的代码候选提示非常好用

### 2. 在哪里看print输出和报错

交互式命令行会直接打印在命令行中。脚本运行时UI完全卡死，在此之前（最好是启动Blender后就立马）务必打开菜单Window->Toggle System Console，脚本运行的报错、print的内容会显示在System Console。脚本运行结束后，UI界面才刷新。

### 3. 打开 Python Tooltip

这是个鼠标悬浮提示选项。在菜单Edit->Preference->Interface中，勾选Python Tooltips，这样的话鼠标悬浮在对应的控件上，就会提示对应的python代码是什么。有了这个，还需要什么教程呢？（

![](https://pic3.zhimg.com/v2-d79700457171dcf72605cd746e38512a_r.jpg)

python tooltip提示了鼠标悬浮所在的控件的代码是什么

### 4. 无窗口/命令行启动

并不是一定要启动blender窗口才能运行脚本。从命令行启动的好处是，你可以用自己的代码编辑器如VSCode，获得更好的写代码体验，会比较爽。

首先确保blender可执行程序所在目录添加到系统环境变量path中。Windows下默认是C:\Program Files\Blender Foundation\Blender 3.1 (3.1是版本，目录与版本号有关)。

在CMD或bash中运行以下命令，可以从命令行启动

```text
blender <你的工程文件>.blend --python <你的脚本>.py         # 启动后执行脚本，执行完毕留下窗口
blender <你的工程文件>.blend --python <你的脚本>.py -b      # 无窗口启动，执行完毕退出
```

这样会启动blender，加载.blend工程文件，然后执行你的脚本。工程文件名可以缺省。*如果无窗口启动请注意，启动意味着没有UI的OpenGL context，有时情况会有些不同，在使用与OpenGL相关的库时要小心。*

如果你在用命令行启动批量渲染，会发现blender会打印一堆你不关心的信息，刷屏命令行。你可以用这个命令禁止blender打印信息。（2022-08-20：在Blender 3.2版本中，似乎渲染的信息不再刷屏命令行）

```bat
blender  <你的工程文件>.blend --python <你的脚本>.py -b 1> nul     # 无窗口启动，std out重定向到nul，禁止blender打印信息
为了python脚本的print内容正常显示，需要在你的脚本中加上
import sys
sys.stdout = sys.stderr
```

还有很多启动参数，例如指定cycles engine的gpu，甚至从命令行启动交互式python。你可以blender -h来查看启动参数的帮助。

### 5. Python中的Blender v.s. Blender中的Python

如果你在你的python环境（如原生python、anaconda）中pip install bpy，这个bpy就可以看作是一般的python包。这个bpy只存在于你的python环境中，与Blender GUI的无关。这个bpy可以直接在你的代码中import，非常方便，只是它缺少图形界面。它类似于无窗口启动一个默认工程，初始就包含一个Cube一个Camera一个Light。由于无窗口启动缺少OpenGL context，所以一些与OpenGL相关的行为可能会和窗口启动不一样。（渲染是正常的，这一点不用担心）。

但如果是Blender软件内运行的python，是其自带的， **和原系统的python没有关系** 。在windows系统下，默认的路径是C:\Program Files\Blender Foundation\Blender 3.1\3.1\python\bin\python.exe。（3.1是版本，目录与版本号有关）或者也可以通过Python Console来获得python所在目录

```text
>>> import sys
>>> sys.exec_prefix
'C:\\Program Files\\Blender Foundation\\Blender 3.1\\3.1\\python'
```

你可以cd到这个目录下来安装其他python库，但是 **直接启动这个python.exe没有意义** ，它没有bpy包。blender的python环境必须由blender启动，详见本文“开始之前->无窗口/命令行启动”

如果更新了blender，新版本blender会在版本对应的目录下重新安装，其python也会重装（python自身的版本也可能不同），这时你安装的旧的python包也要手动重新安装。

## Q&A

### 1. 怎么命令行/文本框打不出字啊？

鼠标悬浮在窗口内才能打字。

### 2. 怎么一运行彻底卡死了啊，怎么停？

可能是你的脚本执行需要时间比较长，这段时间窗口会无响应，不用担心，耐心等待即可。如果真卡太长时间，怀疑是bug，你可以在system console中ctrl+c。如果你忘记打开system console的话，就只能强制关闭了。经常保存是个好习惯，blender时常崩溃，而且不会自动保存或恢复。

### 3. 我在blender的text editor中写脚本，代码文件究竟在哪里？

Blender的脚本是嵌在.blend工程文件里的，不依赖外部的.py文件。即便是open外部的.py文件，也是拷贝了一份进到工程文件里。如果在blender里写或修改的代码要保存到外部，可以在text editor的菜单text->save/save as中，保存一份代码的副本。请注意快捷键ctrl+s保存的是.blend工程文件，你的代码已经保存在工程文件里了。但外部的.py文件是副本，需要另存，否则会在下面状态栏提示当前脚本"unsaved"。

> 首先想谈一下如何“学习”Blender + Python。
>
> 最高效的方法是 **我要做什么我就学什么** 。
>
> 如果你去看API文档，然后上来“bpy包含几大模块，bpy.ops, bpy.data, bpy.mesh, bpy.context“云云，看了半天还不知道该干嘛，记也没记住，十分低效。那不如你在这篇博客里找找常见操作的代码，直接就可以用了，用了几个差不多就知道bpy是怎样一个设计的逻辑了，一个下午就能完成任务是最好的。

就像Python本身一样，各种库与函数都是随找随用，甚至可以在获取需要的信息后立刻打开ChatGPT照葫芦画瓢。因此比起背语法，更重要的是 **将脚本要达成的目标进行分解，并在浩如烟海的API文档中为每个步骤都找到相关的定义/写法** 。用到的代码或许并不复杂，但如果缺乏逻辑就开工的话，脚本没写完，大脑先Out of memory了。

本次使用的blender版本为3.4.1，以及对应的官网Python API文档：

https://docs.blender.org/api/3.4/

![](https://i0.hdslb.com/bfs/article/4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png@progressive.webp)

**1. 环境/工具提示配置**

点击最上面一行中的“Scripting”，或是在GUI里调出“脚本”相关窗口：

![](https://i0.hdslb.com/bfs/article/a4826e9e2ba7dbfa9a2422ad4744ebdfe1045301.png@!web-article-pic.avif)

![](https://i0.hdslb.com/bfs/article/498254e930fd03b86c476c3a30a09d45f61e5602.png@1256w_756h_!web-article-pic.avif)

文本编辑器（中间）：编辑/运行整段脚本

Python控制台（左侧）：运行单个命令行

信息栏（左下）：显示部分GUI操作所对应的函数/变量转换

接着，在blender最上面的“窗口”项里调出系统控制台（cmd窗口）：

![](https://i0.hdslb.com/bfs/article/251e1659edac7264db3988d8e8abee648eeba541.png@1256w_762h_!web-article-pic.avif)

需要区分的是，Python控制台只负责显示控制台内输入的指令/操作：

![](https://i0.hdslb.com/bfs/article/41af7d15681fc14d8156d91ed848876bd6f3c8c2.png@!web-article-pic.avif)

而脚本运行的输出内容则会显示在cmd窗口里：

![](https://i0.hdslb.com/bfs/article/c6a69187306261c95f69887552fdf90a097fd9b7.png@1256w_660h_!web-article-pic.avif)

在blender本体由于脚本或GUI操作卡死时，也可以通过在cmd窗口按下Ctrl+C组合键来强制停止脚本运行，因此建议在测试脚本时保持cmd窗口的常时开启。

还有一个blender自带的，写脚本所需的重要功能：

 **设置-界面-勾选“使用工具提示”与“Python工具提示”，** 在鼠标悬停到对应按钮/物体时可以看到API中对应的python变量/调用函数。

![](https://i0.hdslb.com/bfs/article/09c4f65b030eee0ead4d2be6042b59947f4e214e.png@1256w_1048h_!web-article-pic.avif)

举个小例子，用GUI的按钮添加一个柱体：

![](https://i0.hdslb.com/bfs/article/b38d27e03ffdb4c25246b4738721d79905d8e761.png@1256w_756h_!web-article-pic.avif)

左下角的信息栏里就出现了：

```python
bpy.ops.mesh.primitive_cylinder_add(radius=1, depth=2, enter_editmode=False, align='WORLD', location=(0, 0, 0), scale=(1, 1, 1))
```

把这行敲进控制台就有了相同的效果：

![](https://i0.hdslb.com/bfs/article/f1c258300f0ac2b72ce24f8401a95905fdc739b7.png@1256w_960h_!web-article-pic.avif)

随便套个for循环进去：

```python
import bpy

for num in range(1,10):
 bpy.ops.mesh.primitive_cylinder_add(radius=1, depth=num, enter_editmode=False, align='WORLD', location=(5*num, 0, 0), scale=(1, 1, 1))
```

效果显而易见：

![](https://i0.hdslb.com/bfs/article/b9a972721a049cdc5570e120b0c3c78b7be18b2d.png@1256w_756h_!web-article-pic.avif)

也就是说，有些批量化的功能（匹配/重复生成/状态应用&赋值等）**只能通过脚本而不能通过GUI**来实现。

![](https://i0.hdslb.com/bfs/article/4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png@progressive.webp)

虽然已经有了星月佬的现成工具miritore，但由于模型格式相对规范且方便讲解，所以还请允许自己这次继续用土豆的模型作为数据范例。

随机请上一位小偶像——

![](https://i0.hdslb.com/bfs/article/0b5b182fdb3ddf564c3edafd056c3c2970f44ed4.png@!web-article-pic.avif)

.rd 1d52 = 24 = **杏奈**。

在接下来的内容里不会出现其他图示，还请各位兔子P们安心。

如果想仿照着接下来的步骤进行操作的话，任意导入一个其他的fbx/pmx就行。

![](https://i0.hdslb.com/bfs/article/70083b1b9093ac522bbfdc32973a08212d601325.png@1256w_756h_!web-article-pic.avif)
不算SHS，杏奈和纱代子每件衣服都有两套头模——当然，杏奈的头模对应着两套表情。

重新排一下GUI视图，环境设置完毕。

![](https://i0.hdslb.com/bfs/article/4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png@progressive.webp)

# **2. bpy.context - 获取信息**

模型的物体属性和信息都包含在bpy.context里：

https://docs.blender.org/api/current/bpy.context.html

![](https://i0.hdslb.com/bfs/article/2e918760dfe0a9bf4430223635620654857010e3.png@1256w_252h_!web-article-pic.avif)

通过读取bpy.context以及其子变量，可以获得“当前GUI窗口中选择的物体（或者说，当前状态为active的物体）”的属性，这些都可以在API文档中查询到：

![](https://i0.hdslb.com/bfs/article/7541f46986d8b9a0c584991bbd11059bc39f4298.png@!web-article-pic.avif)

比如最基础的，获得当前选择物体的名称列表：

![](https://i0.hdslb.com/bfs/article/e61f912e0bc2adbbbb49ae8eb99e73ac61cd3b34.png@!web-article-pic.avif)

实操一下，先确认当前的GUI大纲视图状态：

![](https://i0.hdslb.com/bfs/article/4c93ac905875534fa011239e342f8198ffdeda48.png@!web-article-pic.avif)

进控制台起命令，得到了包含一个名为“Armature”的object的list：

```python
#输入
>>> bpy.context.selected_objects
#控制台输出
[bpy.data.objects['Armature']]
```

需要注意的是，输出的变量类型不是string而是**list(只有一项的list也是list)**，在指定了具体某一项后才能输出string：

```python
>>> type(bpy.context.selected_objects)
<class 'list'>

>>> bpy.context.selected_objects[0]
bpy.data.objects['Armature']

>>> type(bpy.context.selected_objects[0])
<class 'bpy_types.Object'>
```

当然，bpy.context可以get到的内容远远不止selected_objects，又比如：

```python
#获得当前GUI中可选择的物体列表
>>>list(bpy.context.selectable_objects)
[bpy.data.objects['Armature'], bpy.data.objects['obj_head_GP'], bpy.data.objects['shape_Grp'], bpy.data.objects['eyes_add'], bpy.data.objects['face'], bpy.data.objects['hair'], bpy.data.objects['eyes']]

#获得当前GUI中可见物体列表（包括不可选的object）
>>>list(bpy.context.view_layer.objects)
[bpy.data.objects['Armature'], bpy.data.objects['obj_head_GP'], bpy.data.objects['shape_Grp'], bpy.data.objects['ss002_acc01'], bpy.data.objects['eyes_add'], bpy.data.objects['face'], bpy.data.objects['hair'], bpy.data.objects['eyes']]
```

另一方面，通过向bpy.context中的一些变量赋值，也可以改变GUI中的显示，包括但不限于选中物体，或是设定某个状态的开关。

 **而作为脚本的基础规则之一，只有将物体指定为active_object之后才能对该物体进行操作，平常在GUI中所进行的点击也可以视作**将物体设为active**** 。

因此，大部分脚本的起手式都是“选择需要编辑的物体”——set object as active：

```python
#选中名为eyes的object
#需要用的是view_layer.objects而不是active_object
bpy.context.view_layer.objects.active = bpy.data.objects['eyes']


#错误示范：如果直接给active_object赋值会因为变量状态为只读而报错
>>> bpy.context.active_object = bpy.data.objects['eyes']
Traceback (most recent call last):
  File "<blender_console>", line 1, in <module>
AttributeError: bpy_struct: Context property "active_object" is read-only
```

回到GUI，可以看到位于eyes名称左侧位置出现了小框：

![](https://i0.hdslb.com/bfs/article/9227018e4faef0f617805769c7a92ec32461d709.png@!web-article-pic.avif)
虽然光标选在face上，但在脚本中依然会对eyes进行处理

此时，eyes就成为了active_object，可以进行后续操作了。

![](https://i0.hdslb.com/bfs/article/4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png@progressive.webp)

# 3. bpy.data的处理

在从GUI或bpy.context选中物体后，接着就是通过bpy.data对物体进行处理。

https://docs.blender.org/api/current/bpy.data.html

![](https://i0.hdslb.com/bfs/article/3ac58ae1bbf201b19912fc9ee7bbef57d4cf0640.png@1256w_712h_!web-article-pic.avif)

点开data type，可以看到bpy.data下同样包含了众多子变量：

![](https://i0.hdslb.com/bfs/article/7f47081e1463460a9dbd342accebb1497f2420d2.png@1256w_1510h_!web-article-pic.avif)

**关键的是，可以通过bpy.context.active_object.data，或是bpy.context.selected_objects.data的形式，将上文中bpy.context的内容作为data使用：**

![](https://i0.hdslb.com/bfs/article/437b2d64dc57366a1ad855baa62f60fcbb27b14a.png@!web-article-pic.avif)

而对于这部分，最需要理解的就是“到底该调用哪个变量”。

受篇幅所限，这次的专栏就以“获取骨骼”为例：

**bpy.**context.**active_object.**data.**bones**

**bpy库功能.**在GUI中显示出内容的.**当前选中的物体的.**数据中的.**骨骼合集 **

稍微改一下，改为显示指定物体而非当前物体：

**bpy.**data.**objects['Armature'].**data.**bones**

**bpy库功能**.**在GUI中显示出内容的.**名为“Armature”的物体的.**数据中的.**骨骼合集

**再改一下，又可以变成：**

**bpy.**context.**selected_objects[0].**data.**bones**

**bpy库功能.**在GUI中显示出内容的.**所有可选物体[最顶层]的.**数据中的.**骨骼合集 **

并且显然，**获取object内容的方式并不唯一**：

```python
#也就是说，上面的代码都是等效的
>>> list(bpy.context.active_object.data.bones)
>>> list(bpy.data.objects['Armature'].data.bones)
>>> list(bpy.context.selected_objects[0].data.bones)

#以上三段命令都会输出如下骨骼list
[bpy.data.armatures['Armature'].bones["ch_ss002_024ann"], bpy.data.armatures['Armature'].bones["KUBI"], bpy.data.armatures['Armature'].bones["ATAMA"],
#"此处省略一堆内容",
bpy.data.armatures['Armature'].bones["KUBI_RT__twist_x0"]]
```

而正如第一节中所提到的，脚本中主要采用active_object来指定物体名称：

```python
>>> bpy.context.active_object=<需要设定active的物体名称>
```

并配合着其对应的bpy.data进行操作：

```python
>>> bpy.context.active_object.data.XXXX
```

诸如此类，相关类型和**列表都记载在API文档里**，动画(actions)，形态键(keys/shape_keys)，材质(material)，翻翻type和子变量，print()或者list()几下，总是能找到的。

确定对象之后，就是对object进行赋值来改变物体属性了。这步想必不用多作解释，保证等号左右两边变量类型一致就行。

```python
#显示名称
>>> bpy.data.armatures['Armature'].bones["ATAMA"].name
'ATAMA'
```

![](https://i0.hdslb.com/bfs/article/7aba68845be4a22ebac7c269849cd72f3366a4bb.png@1256w_670h_!web-article-pic.avif)

赋值，改名：

```python
#改名
>>> bpy.data.armatures['Armature'].bones["ATAMA"].name='Head'
```

![](https://i0.hdslb.com/bfs/article/a912c5acdf18e7bbe1dc1ab1db384aa6e89840b4.png@1256w_656h_!web-article-pic.avif)

最终，改名操作只用到了一行代码。

![](https://i0.hdslb.com/bfs/article/4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png@progressive.webp)

# 4. 控制台/脚本中命令行的区别

大多数控制台的内容放到脚本里都能用，但写脚本时还是有一些注意事项：

1. （废话）控制台可以直接输入命令，而使用脚本则需要引入bpy库：

```python
import bpy
```

2. 同理，控制台不能使用其他py库，但脚本则不受限制——

比如打时间戳：

```python
import datetime
print("=== Start at",datetime.datetime.now().strftime('%X'),"===")
```

![](https://i0.hdslb.com/bfs/article/ea78e52cfa4385b9b8900ee8ea5efa9b04ce1e16.png@!web-article-pic.avif)

或是通过正则匹配遍历列表，直接将set_active_object的对象设定到符合条件的物体上，可以进行批量操作，或是避免在选择不合适的物体时脚本报错：

```python
import re
for object in bpy.context.selectable_objects:
    print("Selected:",object.name)
    #来点桃子
    if re.search(r"*049mom*", object.name):
     object_sel=object.name
     break

bpy.context.view_layer.objects.active = bpy.context.scene.objects[object_sel]
```

注意：如果在脚本在运行过程报错，会**直接跳出** **而非继续运行** ，因此需要使用合适的判断语句来避免在可能报错（比如input为空，或是input变量类型错误）的情况下执行命令。

3. 如果要给blender装额外的py库，则需要去blender自带的Python目录（blender文件夹\python\bin\python.exe）下起shell开pip install，详细方法在开头引用的参考文章里“ **[Blender Python] 安装Python包** ”一节中可以找到。
4. 对于blender的外部插件同样可以用“python工具提示”来查看对应命令，比如改模时常用的mmd_tools插件的“转换模型”按钮：

```python
>>> bpy.ops.mmd_tools.convert_to_mmd_model()
{'FINISHED'}
```

![](https://i0.hdslb.com/bfs/article/4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png@progressive.webp)

# 5. 快速实战环节

**你已经学会了Blender脚本的基础编写方式，现在尝试在改模时把改名插件送进回收站吧！**

给定一个头部fbx模型，将其作为Armature导入blender并选中后：

1. 列出该Armature的名字与其包含的总骨骼数量
2. 找到位于颈部和头部的两个骨骼，分别改名为“首/頭”，且返回赋值结果

将任务拆分一下：

-模型名称和骨骼信息都可以从bpy.context里找到

-通过自定义字典来建立映射关系

-如果骨骼名称包括在字典内，就对骨骼进行改名

开码：

```python
import bpy
print("=== Start ===")

#命名用字典，这部分可以自定义
dic_test = {
"Neck":"首",
"Head":"頭"
}

#获取物体信息
obj=bpy.context.active_object
print("Armature selected:",obj.name)
print("The current armature has",len(obj.data.bones),"Bones")

#查找与替换
for single_bone in obj.data.bones:
    rename=""
    name_in=single_bone.name
    #不匹配时跳出循环以免报错
    if name_in not in dic_test.keys():
        continue

    else:
        rename=dic_test[name_in]
        #对骨骼进行赋值改名
        bpy.context.active_object.data.bones[name_in].name = rename
        print("bone",name_in,"has been renamed to",rename)

print("=== Done ===")
```

然后跑下脚本：

![](https://i0.hdslb.com/bfs/article/3d2624accd6f31a889952a86894d3b97a8c02b08.png@!web-article-pic.avif)

一个可挂载自定义字典的骨骼重命名工具——有效代码不到20行。

![](https://i0.hdslb.com/bfs/article/4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png@progressive.webp)

**思考题**

-能改名的可以是模型的骨骼，也可以是动作的骨骼，还可以是镜头动画。

-赋值能实现的远远不只是“改名”，更是包括了”对物体应用骨骼动画“，“开启/关闭形态键”，“给材质上贴图”等应用类操作，一些强大的插件甚至可以实现对材质与纹理的快速切割/分层。

-除了bpy.context和bpy.data外，还有输入输出文件的bpy.path句柄，原则上来说可以实现从文件输入到输出的一条龙操作。
