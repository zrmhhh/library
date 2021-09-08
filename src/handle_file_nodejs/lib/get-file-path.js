const fs = require('fs');
const path = require('path');
const { writeFile } = require('./file-handle.js');
const { generateMD5 } = require('./file-utils.js');

let flatDataArr = []; // 扁平数据

/**
 * 生成文件Path树
 * @param {String} entryPath 文件夹或文件path
 * @returns undefined 返回undefined，生成JSON文件
 */
function main(entryPath){
  let stats = fs.statSync(entryPath); // fs.statSync -> fs.state
  if(stats.isFile()) return console.log('must be directory!');
  readFileSync(entryPath);
  writeFile(`${_DIR_ROOT_}/_cache/filePathList.json`, flatDataArr);
}

// sync get list
function readFileSync(dirPath) {
  let files = fs.readdirSync(dirPath);
  files.forEach(async filename => {
    let rootPath = path.resolve(path.join(dirPath, filename));
    let stats = fs.statSync(rootPath);
    //是文件
    if (stats.isFile()) {
      // hash = await generateMD5(rootPath);
      let dataJson = {
        name: filename,
        path: rootPath,
        // hash,
        size: stats.size / 1024 / 1024, // MB
        size_bit: stats.size // bit
      };
      flatDataArr.push(dataJson); // 填充扁平数据
    } else if (stats.isDirectory()) {
      readFileSync(rootPath);
    }
  });
}
// async get list
function readFile(dirPath) {
  fs.readdir(dirPath, function(err, files) { // get all file list
    if (err) throw err;

    files.forEach(filename => {
      let fullFileName = path.join(dirPath, filename);
      fs.stat(fullFileName, function(err, stats) {
        if (err) throw err;
        //是文件
        if (stats.isFile()) {
          let dataJson = {
            name: filename,
            path: fullFileName,
            size: stats.size
          };
          // flatDataArr.push(dataJson); // 填充扁平数据
          // writeFile('./out/filePathList.json', flatDataArr); // 待优化
        } else if (stats.isDirectory()) {
          readFile(fullFileName);
        }
      });
    });
  });
}

// main('../../src');
module.exports = main;
