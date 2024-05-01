# github搭建动态网站

目录

1. [简介](https://www.cnblogs.com/lanleiming/p/5056775.html#p1)
2. [github注册及基本使用](https://www.cnblogs.com/lanleiming/p/5056775.html#p2)
3. [git基本使用](https://www.cnblogs.com/lanleiming/p/5056775.html#p3)
4. [github站点配置](https://www.cnblogs.com/lanleiming/p/5056775.html#p4)
5. [域名映射](https://www.cnblogs.com/lanleiming/p/5056775.html#p5)
6. [后台服务搭建](https://www.cnblogs.com/lanleiming/p/5056775.html#p6)
7. [前端页面搭建](https://www.cnblogs.com/lanleiming/p/5056775.html#p7)
8. [总结](https://www.cnblogs.com/lanleiming/p/5056775.html#p8)

 

一、简介

   github提供了免费的仓库，并且支持个人站点搭建，以及域名映射； 而网上也有一些免费的后台服务。

   今天我就利用 github + 后台服务  搭建一个免费的动态网站。   

   演示地址：  [http://lanleiming1.github.io](http://lanleiming1.github.io/)

 

二、github注册及基本使用（网上一搜一大堆，直接贴个地址了）

   http://jingyan.baidu.com/article/f7ff0bfc7181492e27bb1360.html

 

三、git基本使用（这个也是，有好多教程了）

   传送门：[廖雪峰的官方网站--git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

 

四、github个人站点配置

   [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218142204881-677987332.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218142204881-677987332.png)

   自动生成站点

   [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218144622896-1570692710.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218144622896-1570692710.png)

​    

​     [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218144655412-1572164990.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218144655412-1572164990.png)

​    [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218144703881-798370688.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218144703881-798370688.png)

​     [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218144723756-459725085.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218144723756-459725085.png)

 

 

五、域名映射

   如果你有自己的域名的话，可以映射到github上。

   1）在github仓库中，新建一个CNAME文件，内容直接写需要绑定的域名

​     [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218145406990-450523877.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218145406990-450523877.png)

   2)前往你的DNS服务商新建一个CNAME解析至你的github page个人主页地址

​    [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218145655334-877067389.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218145655334-877067389.png)

 等待更改生效，一般几分钟就可以使用你自定义的域名进行访问了

 

 六、后台服务搭建

​    网上有一些免费的后台服务提供商，我这里用的是[bmob](http://www.bmob.cn/)，需要注册下。

​    [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218150623584-115520696.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218150623584-115520696.png)

 

   [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218150635490-421784637.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218150635490-421784637.png)

  

  **这里只简单实现一个记录站点访问总次数的功能**；

  [![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218162052177-405798387.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218162052177-405798387.png)

[![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218162101568-1745460568.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218162101568-1745460568.png)

[![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218162109412-545082849.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218162109412-545082849.png)

 

接下来就是通过JSONP，来调用这两个方法了。 



```
 1 <script type="text/javascript">   
 2    /*
 3      url中的1cf19cbebb0bdf1a 就是应用秘钥中的Secret Key
 4      getTotalPV  就是云端代码中设置的方法名，注意大小写
 5   */    
 6     $.ajax({  
 7         url:"http://cloud.bmob.cn/1cf19cbebb0bdf1a/getTotalPV",  
 8         dataType:'jsonp',  
 9         data:'',  
10         jsonp:'callback',  
11         success:function(result) {  
12            alert(result.results[0].totalPV);
13         }      
14     }); 
15     
16 </script>
```

 

 七、前端页面搭建

   

```
1、将原先aside中的内容替换如下`` ``<``aside` `id="sidebar">``      ``<``p` `style="font-size:16px;font-weight:bold;color:#FF7256;">网站访问次数：<``label` `id="lb_count">0</``label``></``p``>``    ``</``aside``>``2、引用jquery文件，编写js文件，操作dom``<``script` `src="jquery.js" type="text/javascript"></``script``>``  ``<``script` `type="text/javascript">  ``   ``$(function(){``    ``getTotalPV();``  ``});``  ``function getTotalPV()``  ``{``    ``$.ajax({ ``      ``url:"http://cloud.bmob.cn/1cf19cbebb0bdf1a/getTotalPV", ``      ``dataType:'jsonp', ``      ``data:'', ``      ``jsonp:'callback', ``      ``success:function(result) { ``          ``//result.results[0].totalPV``        ``$('#lb_count').html(result.results[0].totalPV);``        ``//更新次数``        ``setTotalPV();``      ``}   ``    ``});  ``  ``} ``  ``function setTotalPV()``  ``{``   ``$.ajax({ ``      ``url:"http://cloud.bmob.cn/1cf19cbebb0bdf1a/setTotalPV", ``      ``dataType:'jsonp', ``      ``data:'', ``      ``jsonp:'callback', ``      ``success:function(result) {        ``      ``}   ``    ``});``  ``}``</``script``>
```

 

效果如下：

[![img](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218165605334-297503801.png)](https://images2015.cnblogs.com/blog/438361/201512/438361-20151218165605334-297503801.png)

 

八、总结

   上述只是简单的构建了一个动态站点，抛砖引块玉，更深入一点的可以自行扩展！

 