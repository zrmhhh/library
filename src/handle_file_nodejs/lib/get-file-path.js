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
  readDirectorySync(entryPath);
  writeFile(`${_DIR_ROOT_}/_cache/filePathList.json`, flatDataArr);
}

// sync get list
function readDirectorySync(dirPath) {
  let files = fs.readdirSync(dirPath);
  files.forEach(filename => {
    let rootPath = path.resolve(path.join(dirPath, filename));
    let stats = fs.statSync(rootPath);

    if (stats.isFile()) {
      readFileSync(filename, rootPath, stats)
    } else if (stats.isDirectory()) {
      readDirectorySync(rootPath);
    }
  });
}

async function readFileSync(filename, rootPath, stats) {
  // hash = await generateMD5(rootPath);
  let dataJson = {
    name: filename,
    path: rootPath,
    // hash,
    size: stats.size / 1024 / 1024, // MB
    size_bit: stats.size // bit
  };
  flatDataArr.push(dataJson); // 填充扁平数据
}

module.exports = main;
