global._DIR_ROOT_ = __dirname;
const FileLib = require('./src/index.js');

let getFilePathTree = new FileLib.CreateFilePathTree('C:/Users/Administrator/Desktop/github/_github-main/library')
getFilePathTree.getPathTree()

// FileLib.CreateFilePathTree('C:/Users/Administrator/Desktop/github')

// let arr = []
// filePathListData.forEach(fileItem => {
//     fileItem.size > 1024000 && arr.push(fileItem)
// })
// console.log(arr)
