

/** 传入参数类型 */
interface WatermarkOptions {
    /** 水印文案字符串数组集合  */
    w_texts?: string[],
    /** 水印参数配置 */
    w_options?: Options
}

/** 水印参数配置项 */
interface Options {
    /** 水印块宽度 */
    w_width?: number,
    /** 水印块高度 */
    w_height?: number,
    /** 水印区域top距离 */
    w_top?: string,
    /** 水印区域left距离 */
    w_left?: string,
    /** 旋转角度 */
    w_rotateDeg?: number,
    /** 字体大小、风格 */
    w_font?: string,
    /** 字体颜色 rgb | 16进制字符串 */
    w_color?: string,
    /** 透明度 */
    w_opacity?: string,
    /** 层级 */
    w_zIndex?: string,
}

/** 默认参数配置 */
const w_options: Options = {
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
}

const id = '1.23452384164.123412415';

/** WaterMark */
interface WaterMark {
    /**
     * 设置水印方法
     * @param options 水印参数
     */
    setWaterMark(options: WatermarkOptions): void;
    /**
     * 移除水印方法
     */
    removeWatermark(): void,
}

const watermark: WaterMark = {
    /**
     * 设置水印方法
     * @param options 水印参数
     */
    setWaterMark: (options: WatermarkOptions) => {
        let _options: Options = {};
        if (options.w_options && Object.prototype.toString.call(options.w_options) === "[object Object]") {
            _options = Object.assign({}, w_options, options.w_options);
        } else {
            _options = w_options;
        }

        if (window.document.getElementById(id) !== null) {
            window.document.body.removeChild(window.document.getElementById(id));
        }

        var can = window.document.createElement('canvas');
        // 设置canvas画布大小
        can.width = _options.w_width;
        can.height = _options.w_height;

        var cans = can.getContext('2d');
        cans.rotate(-(_options.w_rotateDeg * Math.PI / 180)); // 水印旋转角度
        cans.font = _options.w_font;
        cans.fillStyle = _options.w_color;
        cans.textAlign = 'center';
        cans.textBaseline = 'middle';

        // 水印在画布的位置x，y轴
        if (options.w_texts && Object.prototype.toString.call(options.w_texts) === "[object Array]") {
            var w_texts = options.w_texts
            for (var index = 0; index < w_texts.length; index++) {
                cans.fillText(w_texts[index] ? w_texts[index] : '', can.width / 2, can.height + index * 25);
            }
        }

        // 生成水印遮罩
        var div = window.document.createElement('div');
        div.id = id;
        div.style.pointerEvents = 'none';
        div.style.top = _options.w_top;
        div.style.left = _options.w_left;
        div.style.opacity = _options.w_opacity;
        div.style.position = 'fixed';
        div.style.zIndex = _options.w_zIndex;
        div.style.width = window.document.documentElement.clientWidth + 'px';
        div.style.height = window.document.documentElement.clientHeight + 'px';
        div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
        window.document.body.appendChild(div);
    },
    /**
     * 移除水印方法
     */
    removeWatermark: () => {
        if (window.document.getElementById(id) !== null) {
            window.document.body.removeChild(window.document.getElementById(id))
        }
    }
}

export = watermark
