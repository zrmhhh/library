let fileListData = require('./out/filelist.json');
let handleFile = require('./handle-file');

async function createHash(fileList){
    fileList.forEach( async file => {
        let hash = await handleFile.checkMd5(file.path);
        file.hash = hash;
        handleFile.writeFile('./out/filelist.json', fileList);
    })
}

function moveEqualFile(fileList){
    fileList.forEach(fileOne => {
        fileList.forEach(fileTwo => {
            if (fileOne.hash === fileTwo.hash) {
                if (fileOne.name === fileTwo.name) return;
                handleFile.moveFile(fileOne.path, `./new-delete/${fileOne.name}`)
            }
        })
    })
}

function moveInvalidFile(fileList){
    fileList.forEach(file => {
        let reg = /.png$/;
        if (file.size === 0 || reg.test(file.name)) {
            handleFile.moveFile(file.path, `./delete/${file.name}`);
        }
    })
}

// createHash(fileListData);
// moveEqualFile(fileListData)
// moveInvalidFile(fileListData);


// module.exports = {
//     moveEqualFile
// }