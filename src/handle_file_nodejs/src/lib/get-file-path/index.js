const fs = require('fs');
const path = require('path');
const { writeFile } = require('../file-handle.js');
const { generateMD5 } = require('../file-utils.js');

/**
 * 生成文件Path树
 * @param {String} entryPath 文件夹或文件path
 * @returns undefined 返回undefined，生成JSON文件
 */
class CreateFilePathTree {
  flatDataArr = []; // 扁平数据
  fileWriteLockList = [];
  fileWriteLock = 0;
  isPause = false;

  entryPath = '';

  constructor(entryPath){
    this.entryPath = entryPath
  }

  async getPathTree(){
    let stats = fs.statSync(this.entryPath); // fs.statSync -> fs.state
    if(stats.isFile()) return console.log('must be directory!');
    this.readDirectorySync(this.entryPath);

    await this.scanLock()
    writeFile(`${_DIR_ROOT_}/_cache/filePathList.json`, this.flatDataArr);
  }

  readDirectorySync(dirPath) {
    let files = fs.readdirSync(dirPath);
    files.forEach(async filename => {
      let rootPath = path.resolve(path.join(dirPath, filename));
      let stats = fs.statSync(rootPath);
  
      if (stats.isFile()) {
        // this.fileWriteLockList.push(0)
        this.fileWriteLock ++
        this.readFileSync(filename, rootPath, stats, this.fileWriteLockList.length - 1)
      } else if (stats.isDirectory()) {
        await this.pauseOpenFile()
        // console.log('xxxx')
        this.readDirectorySync(rootPath);
      }
    });
  }

  async readFileSync(filename, rootPath, stats, fileWriteLockIndex) {
    let hash = await generateMD5(rootPath);
    let dataJson = {
      name: filename,
      path: rootPath,
      hash,
      size: stats.size / 1024 / 1024, // MB
      size_bit: stats.size // bit
    };
    this.flatDataArr.push(dataJson); // 填充扁平数据
  
    // this.fileWriteLockList[fileWriteLockIndex] = 1
    this.fileWriteLock --
  }

  scanLock(){
    return new Promise((resolve, reject) => {
      const rebackCheck = () => {
        setTimeout(() => {
          // let progressCount = 0;
          // this.fileWriteLockList.forEach(item => {
          //   item && progressCount ++
          // })
          // console.log(this.fileWriteLockList)
          // console.log((progressCount / this.fileWriteLockList.length).toFixed(2) * 100 + '%')
          if (this.fileWriteLock === 0 && !this.isPause) {
            resolve(true)
          } else {
            rebackCheck()
          }
        }, 0);
      }

      rebackCheck()
    })
  }

  pauseOpenFile(){
    this.isPause = true
    return new Promise((resolve, reject) => {
      const checkOpenFileExist = () => {
        setTimeout(() => {
          if (this.fileWriteLock <= 100) {
            this.isPause = false
            resolve(true)
          } else {
            checkOpenFileExist()
          }
        }, 0);
      }

      checkOpenFileExist()
    })
  }

}

module.exports = CreateFilePathTree;
