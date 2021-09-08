// let filePathListData = require(`${_DIR_ROOT_}/_cache/filePathList.json`);

class HandleFile {
    /**
     * create symbol to file
     * @param {Array} filePathList 文件列表
     */
    createHash = async function createHash(filePathList){
        filePathList.forEach( async file => {
            let hash = await handleFile.checkMd5(file.path);
            file.hash = hash;
            handleFile.writeFile(`${_DIR_ROOT_}/_cache/filePathList.json`, filePathList);
        })
    }

    /**
     * move 相同的文件
     * @param {*} filePathList 
     */
    moveEqualFile = function moveEqualFile(filePathList){
        filePathList.forEach(fileOne => {
            filePathList.forEach(fileTwo => {
                if (fileOne.hash === fileTwo.hash) {
                    if (fileOne.name === fileTwo.name) return;
                    handleFile.moveFile(fileOne.path, `./new-delete/${fileOne.name}`)
                }
            })
        })
    }

    /**
     * move 匹配的文件
     * @param {*} filePathList 
     */
    moveInvalidFile = function moveInvalidFile(filePathList){
        filePathList.forEach(file => {
            let reg = /.png$/;
            if (file.size === 0 || reg.test(file.name)) {
                handleFile.moveFile(file.path, `./delete/${file.name}`);
            }
        })
    }
}

