let fs = require('fs');
let path = require('path');
// let rootPath = path.resolve();

let rootArr = []; // 结构化数据
let flatDataArr = []; // 扁平数据

// main
function run(filePath){
  let stats = fs.statSync(filePath); // fs.statSync -> fs.state
  if(stats.isFile()) return console.log('must be directory!');
  readFile(filePath, '', rootArr);
}

// get file array
function readFile(dirPath) {
  fs.readdir(dirPath, function(err, files) { // get all file list
    console.log(files)
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
          // writeFile('./out/filelist.json', flatDataArr); // 待优化
        } else if (stats.isDirectory()) {
          readFile(fullFileName);
        }
      });
    });
  });
}

// already
function already() {
  console.log('already');
}

// write to file
function writeFile(path, data) {
  if (typeof data === 'object') data = JSON.stringify(data);
  fs.writeFile(path, data + '\n', function(err) {
    if (err) throw err;
    console.log('写入成功');
  });
}

// get suffix
function getSuffix(url) {
  let arr = url.split('.');
  let len = arr.length;
  return arr[len - 1];
}

// run('F:/project');
run('./out')
