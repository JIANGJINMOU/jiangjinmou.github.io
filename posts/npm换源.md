# 国内npm源镜像

## npm加速下载

npm 镜像是指定 npm 下载包时的源地址，默认的源地址是 npm 官方源。

npm 官方原始镜像网址是：
```
https://registry.npmjs.org/
```
淘宝 NPM 镜像：
```
https://registry.npm.taobao.org
```
阿里云 NPM 镜像：
```
 https://npm.aliyun.com
  ```
腾讯云 NPM 镜像：
```
 https://mirrors.cloud.tencent.com/npm/
```
华为云 NPM 镜像：
```
https://mirrors.huaweicloud.com/repository/npm/
```
网易 NPM 镜像：
```
https://mirrors.163.com/npm/
```
中国科学技术大学开源镜像站：
```
http://mirrors.ustc.edu.cn/
```
清华大学开源镜像站：
```
https://mirrors.tuna.tsinghua.edu.cn/
```
腾讯，华为，阿里的镜像站基本上比较全

使用淘宝镜像源加速 NPM

最新的：
```
 npm config set registry https://registry.npmmirror.com
```
之前的:
```
 npm config set registry https://registry.npm.taobao.org
```
使用阿里云 镜像源加速 NPM
```
npm config set registry https://npm.aliyun.com
```
使用腾讯云镜像源加速 NPM
```
npm config set registry http://mirrors.cloud.tencent.com/npm/
```
使用华为云 镜像源加速 NPM
```
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
```
返回npm 官方原始镜像
```
npm config set registry https://registry.npmjs.org/
```
使用那个镜像，只需要 npm config set registry + 对应的镜像网址就好了
```
npm config set registry 
```
查看当前的镜像源：npm config get registry
```
npm config get registry
```

## nrm
也可以用 nrm 去指定npm镜像

什么是nrm?nrm 是一个 npm 源管理器，允许你快速地在 npm 源间切换。

安装nrm

```
npm install -g nrm
```
使用
查看可选的源
```
nrm ls    
```
切换
如果要切换到taobao源，执行命令
```
nrm use taobao
```
测试速度
```
nrm test     
```