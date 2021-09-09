const fs = require('fs');
const path = require('path');
const { writeFile } = require('./file-handle.js');
const { generateMD5 } = require('./file-utils.js');

let flatDataArr = []; // 扁平数据
let fileWriteLockList = []
let isLock = false

/**
 * 生成文件Path树
 * @param {String} entryPath 文件夹或文件path
 * @returns undefined 返回undefined，生成JSON文件
 */
async function main(entryPath){
  let stats = fs.statSync(entryPath); // fs.statSync -> fs.state
  if(stats.isFile()) return console.log('must be directory!');
  readDirectorySync(entryPath);

  await scanLock()
  writeFile(`${_DIR_ROOT_}/_cache/filePathList.json`, flatDataArr);
}

function scanLock(){
  return new Promise((resolve, reject) => {
    rebackCheck()
    function rebackCheck(){
      setTimeout(() => {
        let progressCount = 0;
        fileWriteLockList.forEach(item => {
          item && progressCount ++
        })
        console.log((progressCount / fileWriteLockList.length).toFixed(2) * 100 + '%')
        if (fileWriteLockList.indexOf(0) === -1 && !isLock) {
          resolve(true)
        } else {
          rebackCheck()
        }
      }, 0);
    }
  })
}

function pauseOpenFile(){
  return new Promise((resolve, reject) => {
    checkOpenFileExist()
    function checkOpenFileExist(){
      setTimeout(() => {
        if (fileWriteLockList.indexOf(0) === -1) {
          resolve(true)
        } else {
          checkOpenFileExist()
        }
      }, 0);
    }
  })
}

// sync get list
function readDirectorySync(dirPath) {
  let files = fs.readdirSync(dirPath);
  files.forEach(async filename => {
    let rootPath = path.resolve(path.join(dirPath, filename));
    let stats = fs.statSync(rootPath);

    if (stats.isFile()) {
      fileWriteLockList.push(0)
      readFileSync(filename, rootPath, stats, fileWriteLockList.length - 1)
    } else if (stats.isDirectory()) {
      await pauseOpenFile() && readDirectorySync(rootPath);
    }
  });
}

async function readFileSync(filename, rootPath, stats, fileWriteLockIndex) {
  hash = await generateMD5(rootPath);
  let dataJson = {
    name: filename,
    path: rootPath,
    hash,
    size: stats.size / 1024 / 1024, // MB
    size_bit: stats.size // bit
  };
  flatDataArr.push(dataJson); // 填充扁平数据

  fileWriteLockList[fileWriteLockIndex] = 1
}

module.exports = main;
