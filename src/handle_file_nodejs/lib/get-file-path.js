let fs = require('fs');
let path = require('path');

let flatDataArr = []; // 扁平数据

// main
function run(filePath){
  let stats = fs.statSync(filePath); // fs.statSync -> fs.state
  if(stats.isFile()) return console.log('must be directory!');
  readFileSync(filePath);
  writeFile('./filelist.json', flatDataArr);
}

// sync get list
function readFileSync(dirPath) {
  let files = fs.readdirSync(dirPath);
  files.forEach(filename => {
    let rootPath = path.resolve(path.join(dirPath, filename));
    let stats = fs.statSync(rootPath);
    //是文件
    if (stats.isFile()) {
      let dataJson = {
        name: filename,
        path: rootPath,
        size: stats.size
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
          // writeFile('./out/filelist.json', flatDataArr); // 待优化
        } else if (stats.isDirectory()) {
          readFile(fullFileName);
        }
      });
    });
  });
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
run('../../src');
// run('./out');
