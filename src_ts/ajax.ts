function ajax(type: string, url: string, data: string | object, success: Function, failed: Function): void {
    // 创建ajax对象
    let xhr: XMLHttpRequest;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
  
    type = type.toUpperCase();
    // 用于清除缓存 todo 要加时间戳哈希
    const tim = Date.now();
  
    if (typeof data === 'object') {
      let str = '';
      for (let key in data) {
        str += key + '=' + data[key] + '&';
      }
      data = str.replace(/&$/, '');
    }
  
    if (type === 'GET') {
      if (data) {
        xhr.open('GET', url + '?' + data, true);
      } else {
        xhr.open('GET', url + '?t=' + tim, true);
      }
      xhr.send();
    } else if (type === 'POST') {
      xhr.open('POST', url, true);
      // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
  
    // 处理返回数据
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (success) {
            success(xhr.responseText);
          }
        } else {
          if (failed) {
            failed(xhr.status);
          }
        }
      }
    }
  }