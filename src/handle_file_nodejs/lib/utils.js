// 获取文件扩展名
function getFileSuffix(filePath) {
  let arr = filePath.split('.');
  let len = arr.length;
  return arr[len - 1];
}

module.exports = {
  getFileSuffix
}
