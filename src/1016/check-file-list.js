let fs = require('fs');
let fileList = require('./out/filelist.json');
let handleFile = require('./handle-file');

function checkFileList(dataArr){
    dataArr.forEach(itemOne => {
        dataArr.forEach(itemTwo => {
            let isEq = handleFile.comparisonFile(itemOne.path, itemTwo.path);
            console.log(`${itemOne.name} = ${itemTwo.name} : ${isEq}`)
        })
    })
}

checkFileList(fileList)

// module.exports = {
//     checkFileList
// }