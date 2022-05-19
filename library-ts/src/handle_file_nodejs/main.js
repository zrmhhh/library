global._RUNTIME_ROOT_ = __dirname; // 代码运行的根目录
global._DRIVE_ROOT_ = 'D:'; // 操作文件的盘符

const FileLib = require('./src/index.js');

// 生成File Path List
// FileLib.createFilePath()

// 移动相同的文件到根盘符的_delete目录下
// FileLib.moveEqualFile()

// 移动匹配的文件到根盘符的_delete目录下
// FileLib.moveMatchFile()



