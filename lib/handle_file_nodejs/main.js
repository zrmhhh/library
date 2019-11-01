let fs = require('fs');
let fileListData = require('./out/filelist.json');
let handleFile = require('./handle-file');

function moveEqualFile(fileList){
    fileList.forEach(fileOne => {
        fileList.forEach(fileTwo => {
            handleFile.comparisonFile(fileOne.path, fileTwo.path, res =>{
                let isEqual = res;
                if (fileOne.name === fileTwo.name && isEqual) return;
                if (isEqual) {
                    handleFile.moveFile(fileOne.path, `./delete/${fileOne.name}`)
                }
            });
        })
    })
}

function moveInvalidFile(fileList){
    fileList.forEach(file => {
        let reg = /.test$/;
        if (file.size === 0 || reg.test(file.name)) {
            handleFile.moveFile(file.path, `./delete/${file.name}`);
        }
    })
}

// moveEqualFile(fileListData)
moveInvalidFile(fileListData);


// module.exports = {
//     moveEqualFile
// }