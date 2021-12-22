# watermark-package

> 前端添加水印
>
> font-end set watermark

#### 

## 使用（Usage）

方式一：下载 [watermark.umd.min.js](https://raw.github.com/florian/cookie.js/master/dist/cookie.umd.min.js) 并将其导入到 HTML 文档中，将会添加 一个名为`watermark`的全局对象:

(Download [watermark.umd.min.js](https://raw.github.com/florian/cookie.js/master/dist/cookie.umd.min.js) and include it in your HTML document, this will add a global object called `watermark`)

```html
<script src="watermark.umd.min.js"></script>
```

方式二：用npm包的形式安装到需要使用的项目中去：

(Alternatively you can use a JavaScript package manager to add it to your project)

```sh
npm install watermark-package --save

// import导入
import watermark from 'watermark-package'
```

---

支持AMD and CommonJS

watermark-package supports AMD and CommonJS. So if you want to include watermark-package dynamically, you can just require it with any AMD / CommonJS loader, for example [RequireJS](http://requirejs.org/) for AMD.
Follow the instructions of your loader to include watermark-package.

---

导入后就可以调用下面的方法

After that you can call any of methods that are explained in the following.

## watermark.setWaterMark
该方法接收两个字符串作为参数，用于设置水印文案，两个字符串分别会生成两行文字展示（如：第一行为用户名，第二行为用户ID），如果你只需要展示一行文案，第二个字符串请传空字符串。

You can use the `watermark.setWaterMark` method to set watermark. The value will automatically be escaped for you.

```javascript
watermark.setWaterMark(str1, str2);
```

该方法还可额外接收一个对象，用于设置水印的具体参数如宽度，大小等，各参数说明见下表

If you need more options, like setting the width, you can add an object with options as the last parameter:

```javascript
watermark.setWaterMark(str1, str2, {
   w_width: 300
});

```

The following fields can be added to the mentioned object:

| key | value | default value |
|:--|:--|:--|
| `w_width` | A `number`  that the width of the watermark block.<br />(水印块宽度) | 240 |
| w_height | A `number`  that the height of the watermark block.<br />(水印块高度) | 140 |
| w_top | A `string` that the distance between the watermark mask layer and the top of the page.<br />(水印遮罩层距离页面顶部的距离) | '0px' |
| w_left | A `string` that the distance between the watermark mask layer and the left of the page.<br />(水印遮罩层距离页面左边的距离) | '0px' |
| w_rotateDeg | A `string` that specifies SameSite attribute that restricts cookie access based on the site context.<br />(水印角度) | 25 |
| w_font | A `string` that the watermark font size, font style<br />(水印的字体大小、字体风格) | '1.2rem Vedana' |
| w_color | A `string` that the watermark font color<br />(水印字体颜色) | '#666' |
| w_opacity | A `string` that the watermark mask layer transparency<br />(水印遮罩层透明度) | '0.06' |
| w_zIndex | A `string` that the zIndex of watermark mask<br />(水印遮罩层层级) | 10000 |

## watermark.removeWatermark

清除水印

clear watermark

```
watermark.removeWatermark()
```

