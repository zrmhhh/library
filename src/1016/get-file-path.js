let fs = require('fs');
let path = require('path');
let rmFile = require('./rm-file').rmFile;
let rootPath = path.resolve();

let rootArr = [];

// main
function run(filePath){
  let stats = fs.statSync(filePath); // fs.statSync -> fs.state
  if(stats.isFile()) return console.log('must be directory!');
  readFile(filePath, '', rootArr);
}

// get file array
function readFile(readUrl, name, fileArr, next) {
  let fileObj = {
    title: name,
    urlList: [],
    titleList: []
  };
  fileArr.push(fileObj);
  fs.readdir(readUrl, function(err, files) { // get all file list
    if (err) throw err;

    files.forEach(filename => {
      let fullFileName = path.join(readUrl, filename);
      fs.stat(fullFileName, function(err, stats) {
        if (err) throw err;
        //是文件
        if (stats.isFile()) {
          let dataJson = {
            name: filename,
            url: fullFileName
          };
          fileObj.urlList.push(dataJson);
          writeFile(rootArr); // 待优化
        } else if (stats.isDirectory()) {
          readFile(fullFileName, filename, fileObj.titleList, already);
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
function writeFile(data) {
  if (typeof data === 'object') data = JSON.stringify(data);
  data = 'let json = ' + data;
  fs.writeFile(rootPath + '/out/' + 'filelist.txt', data + '\n', function(err) {
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


// run('C:/Users/bs/Desktop/frontend-library/src');

rmFile('./out');