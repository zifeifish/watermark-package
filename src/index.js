
var watermark;

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
    // rgb | 16进制字符串
    w_color: '#666',
    // string: (0-1)
    w_opacity: '0.06',
    // 层级
    w_zIndex: '100000',
}

// 添加水印方法
watermark.setWaterMark = (str1, str2) => {
    var id = loadWatermark(str1, str2)
    if (document.getElementById(id) === null) {
        id = loadWatermark(str1, str2)
    }
}

// 移除水印方法
watermark.removeWatermark = () => {
    var id = '1.23452384164.123412415'
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }
}

/**  水印添加方法  */
var loadWatermark = (str1, str2) => {
    var id = '1.23452384164.123412415'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    var can = document.createElement('canvas')
    // 设置canvas画布大小
    can.width = w_options.w_width
    can.height = w_options.w_height

    var cans = can.getContext('2d')
    cans.rotate(-w_options.w_rotateDeg) // 水印旋转角度
    cans.font = w_options.w_font
    cans.fillStyle = w_options.w_color
    cans.textAlign = 'center'
    cans.textBaseline = 'Middle'
    // 水印在画布的位置x，y轴
    cans.fillText(str1 ? str1 : '', can.width / 2, can.height)
    cans.fillText(str2 ? str2 : '', can.width / 2, can.height + 25)

    // 生成水印遮罩
    var div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = w_options.w_top
    div.style.left = w_options.w_left
    div.style.opacity = w_options.w_zIndex
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

export default watermark
