global._DIR_ROOT_ = __dirname;
const filePathListData = require('./_cache/filePathList.json')
const getFilePath = require('./lib/get-file-path.js');

getFilePath('C:/Users/Administrator/Desktop/github')

// let arr = []
// filePathListData.forEach(fileItem => {
//     fileItem.size > 1024000 && arr.push(fileItem)
// })
// console.log(arr)
