(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.watermark = factory());
})(this, (function () { 'use strict';

  var Watermark = {};

  const WaterMarkDomId = 'w_vm_id_3.14159';

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
    w_opacity: '0.1',
    // 层级
    w_zIndex: '100000',
  };

  // 添加水印
  Watermark.setWaterMark = (options) => {
    var id = Watermark.loadWatermark(options);
    if (document.getElementById(id) === null) {
      id = Watermark.loadWatermark(options);
    }
  };

  // 移除水印
  Watermark.removeWatermark = () => {
    var id = WaterMarkDomId;
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
  Watermark.loadWatermark = (options) => {
    var _options = {};
    if (options.w_options && Object.prototype.toString.call(options.w_options) === "[object Object]") {
      _options = Object.assign({}, w_options, options.w_options);
    } else {
      _options = w_options;
    }

    var id = WaterMarkDomId;
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

    setTimeout(() => {
      // 监听水印防篡改
      Watermark.observeDomChange(div, options);
    }, 0);

    return id
  };

  /**
   * 基于MutationObserver 监听水印DOM变化
   * @param {*} waterMarkDom 水印DOM
   * @param {*} options 水印参数配置
   */
  Watermark.observeDomChange = (waterMarkDom, options) => {

    // 选择需要观察变动的节点
    const targetNode = document.querySelector('body');

    // 观察器的配置（需要观察什么变动）
    const config = {
      attributes: true, // 观察属性变动
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      subtree: true, // 观察后代节点，默认为 false
    };

    // 当观察到变动时执行的回调函数
    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        
        /** 修改了水印节点属性 */
        if (mutation.target === waterMarkDom) {
          window.alert('非法操作！！！');
          mutation.target.remove(); // 删除已经修改的水印节点
          Watermark.loadWatermark(options); // 重新渲染水印
          // 停止观察
          observer.disconnect();
        }

        /** 强行手动删除了水印节点 */
        if (mutation.removedNodes.length && mutation.removedNodes[0] === waterMarkDom) {
          window.alert('非法操作！！！');
          Watermark.loadWatermark(options);
          // 停止观察
          observer.disconnect();
        }
      }
    };

    // 创建一个观察器实例并传入回调函数 
    // 用法详见: https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
    const Observer = new MutationObserver(callback);

    // 以上述配置开始观察目标节点
    Observer.observe(targetNode, config);
  };

  return Watermark;

}));
