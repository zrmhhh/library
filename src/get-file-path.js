let fs = require('fs');
let path = require('path');
let rootPath = path.resolve();
let filePath = path.resolve() + '/../web/avideo';

let rootArr = [];

function run(){
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach(function(filename) {
      fs.stat(path.join(filePath, filename), function(err, stats) {
        if (err) throw err;
        //文件
        if (stats.isFile()) {
        } else if (stats.isDirectory()) {
          readFile(path.join(filePath, filename), filename, rootArr, already);
        }
      });
    });
  });
}


//获取文件数组
function readFile(readurl, name, testArr, next) {
  // console.log(name);
  let testObj = {
    title: name,
    urlList: [],
    titleList: []
  };
  testArr.push(testObj);
  fs.readdir(readurl, function(err, files) {
    if (err) {
      console.log(err);
      return;
    }

    files.forEach(function(filename) {
      let realFileName = path.join(readurl, filename);
      fs.stat(realFileName, function(err, stats) {
        if (err) throw err;
        //是文件
        if (stats.isFile()) {
          let reg = /.+vedio_stream_nodejs\\web\\/;
          let urlName = realFileName.replace(reg, './');
          let urlJson = {
            name: filename,
            url: urlName
          };
          testObj.urlList.push(urlJson);
          writeFile(rootArr);
        } else if (stats.isDirectory()) {
          readFile(realFileName, filename, testObj.titleList, already);
        }
      });
    });
  });
}

// already

function already() {
  console.log('already');
}

// 写入到filelisttxt文件
function writeFile(data) {
  if (typeof data === 'object') data = JSON.stringify(data);
  data = 'let json = ' + data;
  fs.writeFile(rootPath + '/../web/js/' + 'filelist.js', data + '\n', function(err) {
    if (err) throw err;
    console.log('写入成功');
  });
}

//获取后缀名
function getdir(url) {
  let arr = url.split('.');
  let len = arr.length;
  return arr[len - 1];
}


run();