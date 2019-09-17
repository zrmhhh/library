# frontend_library
前端工具、库

### ajax.js
原生ajax，可扩展
	eg:
		ajax('post', '/index.php/pay/api/api/h5', {}, function(){}, function(){});

### parse_template.js
字符串模板、占位替换

### wxpay_and_alipay.js
微信支付、阿里支付

### cut_img.js
图片裁剪
```
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;     
}
```

### countdown.js
倒计时

