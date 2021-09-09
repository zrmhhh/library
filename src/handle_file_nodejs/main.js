global._DIR_ROOT_ = __dirname;
const FileLib = require('./lib/index.js');

let getFilePathTree = new FileLib.CreateFilePathTree()
getFilePathTree.run('C:/Users/Administrator/Desktop/github')

// FileLib.CreateFilePathTree('C:/Users/Administrator/Desktop/github')

// let arr = []
// filePathListData.forEach(fileItem => {
//     fileItem.size > 1024000 && arr.push(fileItem)
// })
// console.log(arr)
