let fs = require('fs');
let fileListData = require('./out/filelist.json');
let handleFile = require('./handle-file');

function checkFileList(fileList){
    fileList.forEach(itemOne => {
        fileList.forEach(itemTwo => {
            handleFile.comparisonFile(itemOne.path, itemTwo.path, res =>{
                let isEqual = res;
                if (itemOne.name === itemTwo.name && isEqual) return;
                // console.log(`${itemOne.name} = ${itemTwo.name} : ${isEqual}`)
                if (isEqual) console.log(itemOne.path);
                // if (isEqual) handleFile.removeFile(itemOne.path);
            });
        })
    })
}

function fileStatus(fileList){
    fileList.forEach(file => {
        console.log(file)
        if (file.size === 0) {
            handleFile.moveFile(file.path, `./delete/${file.name}`);
        }
    })
}

// checkFileList(fileListData)
fileStatus(fileListData);


// module.exports = {
//     checkFileList
// }