global._DIR_ROOT_ = __dirname;
global._FILE_ROOT_ = 'D:';

const FileLib = require('./src/index.js');

// 生成File Path List
// let getFilePathTree = new FileLib.CreateFilePathTree(`${_FILE_ROOT_}/Downloads`); // C:/Users/Administrator/Desktop/github
// getFilePathTree.getPathTree();

// 移动相同文件到根盘符的_delete目录下
// FileLib.moveEqualFile()


// let arr = []
// filePathListData.forEach(fileItem => {
//     fileItem.size > 1024000 && arr.push(fileItem)
// })
// console.log(arr)

