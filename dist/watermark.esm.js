var watermark = {};

// 参数配置
var w_options = {
    // 水印块宽度
    w_width: 240,
    // 水印块高度
    w_height: 140,
    // 水印区域top距离
    w_top: '0px',
    // 水印区域left距离
    w_left: '0px',
    // 旋转角度
    w_rotateDeg: 25,
    // 字体大小、风格
    w_font: '1.2rem Vedana',
    // 字体颜色 rgb | 16进制字符串
    w_color: '#666',
    // 透明度
    w_opacity: '0.2',
    // 层级
    w_zIndex: '100000',
};

// 添加水印
watermark.setWaterMark = (options) => {
    var id = loadWatermark(options);
    if (document.getElementById(id) === null) {
        id = loadWatermark(options);
    }
};

// 移除水印
watermark.removeWatermark = () => {
    var id = '1.23452384164.123412415';
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id));
    }
};

/**
 * 水印添加方法
 * @param { { w_texts: array, w_options: object } } options 配置对象
 * - w_texts：水印文案字符串数组集合 
 * - w_options：水印参数配置
 * @example
 * options = {
    w_texts: ['娃哈哈', '177****0000'],
    w_options: {
        w_width: 240,
        w_height: 140,
        w_top: '0px',
        w_left: '0px',
        w_rotateDeg: 25,
        w_font: '1.2rem Vedana',
        w_color: '#666',
        w_opacity: '0.2',
        w_zIndex: '100000',
    }
  }
 * @return { string } 返回水印id
 * 
 */
var loadWatermark = (options) => {
    var _options = {};
    if (options.w_options && Object.prototype.toString.call(options.w_options) === "[object Object]") {
        _options = Object.assign({}, w_options, options.w_options);
    } else {
        _options = w_options;
    }

    var id = '1.23452384164.123412415';
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id));
    }

    var can = document.createElement('canvas');
    // 设置canvas画布大小
    can.width = _options.w_width;
    can.height = _options.w_height;

    var cans = can.getContext('2d');
    cans.rotate(-(_options.w_rotateDeg * Math.PI / 180)); // 水印旋转角度
    cans.font = _options.w_font;
    cans.fillStyle = _options.w_color;
    cans.textAlign = 'center';
    cans.textBaseline = 'Middle';

    // 水印在画布的位置x，y轴
    if (options.w_texts && Object.prototype.toString.call(options.w_texts) === "[object Array]") {
        var w_texts = options.w_texts;
        for (var index = 0; index < w_texts.length; index++) {
            cans.fillText(w_texts[index] ? w_texts[index] : '', can.width / 2, can.height + index * 25);
        }
    }

    // 生成水印遮罩
    var div = document.createElement('div');
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = _options.w_top;
    div.style.left = _options.w_left;
    div.style.opacity = _options.w_opacity;
    div.style.position = 'fixed';
    div.style.zIndex = _options.w_zIndex;
    div.style.width = document.documentElement.clientWidth + 'px';
    div.style.height = document.documentElement.clientHeight + 'px';
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
    document.body.appendChild(div);
    return id
};

export { watermark as default };
