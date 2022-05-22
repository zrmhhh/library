/**
 * eg: 
 * 
  parseTemplate('test666{{orderId}},adsasdf{{no}}zzz', {
    orderId: 12341234,
    no: 'asdfsdfsdf'
  });
 */

// 解析模板
function parseTemplate(str, obj) {
  for (var key in obj) {
    var reg = new RegExp('{{' + key + '}}', 'g');
    str = str.replaceAll(reg, obj[key]);
  }
  return str;
}

/**
 * 通过{{}}渲染数据到html中
 * @param {HTMLElement} el 页面节点
 * @param {object} obj 数据对象
 */
function renderDataByTemplate(el, obj){
  let str = el.innerHTML;
  el.innerHTML = parseTemplate(str, obj)
}
