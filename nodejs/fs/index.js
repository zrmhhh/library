const fs = require('fs');

/**
 * 目录
 */
// fs.mkdir('./fs/dir', err => { console.log(err) }) // 创建目录
// fs.rmdir('./fs/dir', err => { console.log(err) }) // 删除目录

/**
 * 文件
 */
// fs.writeFile('./fs/test', 'test', err => { console.log(err) }) // 有则写入，无则创建并写入
// fs.unlink('./fs/test', err => { console.log(err) }) // 删除文件
// fs.rename('./fs/test', 'test', err => { console.log(err) }) // 重命名

/**
 * test
 */
let fileWritenable = fs.createWriteStream('./fs/01');
fs.createReadStream('./fs/test').pipe(fileWritenable);


