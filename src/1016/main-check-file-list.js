let fs = require('fs');
let fileList = require('./out/filelist.json');
let handleFile = require('./handle-file');

function checkFileList(dataArr){
    dataArr.forEach(itemOne => {
        dataArr.forEach(itemTwo => {
            handleFile.comparisonFile(itemOne.path, itemTwo.path, res =>{
                let isEq  = res;
                if (isEq && itemOne.name === itemTwo.name) return;
                // console.log(`${itemOne.name} = ${itemTwo.name} : ${isEq}`)
                handleFile.removeFile(itemOne.path);
            });
        })
    })
}

checkFileList(fileList)
// console.log(fileList)

// module.exports = {
//     checkFileList
// }