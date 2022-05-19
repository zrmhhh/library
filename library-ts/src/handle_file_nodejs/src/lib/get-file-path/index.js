const fs = require('fs');
const path = require('path');
const { writeFile } = require('../file-handle.js');
const { generateMD5 } = require('../file-utils.js');

/**
 * 生成文件Path列表
 * @param {String} entryPath 文件夹或文件path
 * @returns undefined 返回undefined，生成JSON文件
 */
class CreateFilePathList {
  flatDataFilePathTree = {}; // 扁平数据
  fileOpenCount = 0; // 已打开的文件数量
  isPause = false;

  entryPath = '';

  constructor(entryPath){
    this.entryPath = entryPath

    if (!fs.existsSync(`${_RUNTIME_ROOT_}/_cache`)) fs.mkdirSync(`${_RUNTIME_ROOT_}/_cache`)
  }

  async getPathTree(){
    console.time('Run');

    let stats = fs.statSync(this.entryPath); // fs.statSync -> fs.state
    if(stats.isFile()) return console.log('must be directory!');
    this.readDirectorySync(this.entryPath);

    await this.scanLock()
    writeFile(`${_RUNTIME_ROOT_}/_cache/filePathList.json`, this.flatDataFilePathTree);

    console.timeEnd('Run');
  }

  readDirectorySync(dirPath) {
    let files = fs.readdirSync(dirPath);
    files.forEach(async filename => {
      let rootPath = path.resolve(path.join(dirPath, filename));
      let stats = fs.statSync(rootPath);
  
      if (stats.isFile()) {
        this.fileOpenCount ++
        this.readFileSync(filename, rootPath, stats)
      } else if (stats.isDirectory()) {
        await this.pauseOpenFile()
        this.readDirectorySync(rootPath);
      }
    });
  }

  async readFileSync(filename, rootPath, stats) {
    let hash = await generateMD5(rootPath);
    let dataJson = {
      name: filename,
      path: rootPath,
      hash,
      size: stats.size / 1024 / 1024, // MB
      size_bit: stats.size // bit
    };
    
    let existData = this.flatDataFilePathTree[hash]
    if (existData) {
      if (existData.length) {
        this.flatDataFilePathTree[hash] = [...existData, dataJson]
      } else {
        this.flatDataFilePathTree[hash] = [existData, dataJson]
      }
    } else {
      this.flatDataFilePathTree[hash]= dataJson; // 填充扁平数据
    }
  
    this.fileOpenCount --
  }

  /**
   * 检查有没有未处理的文件
   * @description 等待未处理完的文件
   * @returns Promise 阻塞
   */
  scanLock(){
    return new Promise((resolve, reject) => {
      const rebackCheck = () => {
        setTimeout(() => {
          console.log(this.fileOpenCount)
          if (this.fileOpenCount === 0 && !this.isPause) {
            resolve(true)
          } else {
            rebackCheck()
          }
        }, 800);
      }

      rebackCheck()
    })
  }

  /**
   * 暂停打开文件
   * @description nodejs打开文件数有限，当同时打开的文件数过多时，暂停打开文件，等待readFileSync方法处理完文件后再继续执行
   * @returns Promise 阻塞
   */
  pauseOpenFile(){
    this.isPause = true
    return new Promise((resolve, reject) => {
      const checkOpenFileExist = () => {
        setTimeout(() => {
          if (this.fileOpenCount <= 100) {
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

module.exports = CreateFilePathList;
