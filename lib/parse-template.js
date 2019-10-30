// eg:
parseTemplate('test666{{orderId}},adsasdf{{no}}zzz', {
  orderId: 12341234,
  no: 'asdfsdfsdf'
});

// 解析模板
function parseTemplate(str, obj) {
  for (var key in obj) {
    var reg = new RegExp('{{' + key + '}}');
    str = str.replace(reg, obj[key]);
  }
  return str;
}
