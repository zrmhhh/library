const { moveFile, writeFile } = require('./lib/file-handle.js')
const generateMD5 = require('./lib/file-utils.js')
const CreateFilePathTree = require('./lib/get-file-path/index.js');

class FileLib {
    static CreateFilePathTree = CreateFilePathTree
    /**
     * create symbol to file
     * @param {Array} filePathList 文件列表
     */
    createHash = async function createHash(filePathList){
        filePathList.forEach( async file => {
            let hash = await generateMD5(file.path);
            file.hash = hash;
            writeFile(`${_DIR_ROOT_}/_cache/filePathListHash.json`, filePathList);
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
                    moveFile(fileOne.path, `./new-delete/${fileOne.name}`)
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
                moveFile(file.path, `./delete/${file.name}`);
            }
        })
    }
}

module.exports = FileLib
