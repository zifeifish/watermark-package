# watermark-package

> 前端添加水印函数

#### 安装

```
npm install watermark-package -S
```

安装完毕之后

#### 使用函数

提供两个函数方法，使用时将这两个方法引入。

setWaterMark(str1,str2)：添加水印方法，可接收两个字符串参数即需要添加的水印文字，在项目启动时调用或者在需要用到的页面调用，调用后将会在页面添加水印文字。

removeWatermark()：移除水印的方法，调用后将会清除页面上的水印。

```
// 引入两个方法
import { setWaterMark, removeWatermark } from 'watermark-package'

// 添加水印方法
setWaterMark('管理员', '177****0000')

// 移出水印
removeWatermark()
```



#### 

#### 



