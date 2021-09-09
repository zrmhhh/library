const { moveFile, writeFile } = require('./lib/file-handle.js')
const CreateFilePath = require('./lib/get-file-path/index.js');

class FileLib {
    /**
     * 生成file path tree
     */
    static CreateFilePathTree = CreateFilePath

    /**
     * move 相同的文件
     * @param {*} filePathList 
     */
    moveEqualFile = function moveEqualFile(){
        let filePathList = require('../_cache/filePathList.json');
        filePathList.forEach(filePathData => {
            if (filePathData && filePathData.length) {
                console.log(filePathData)
            }


            // filePathList.forEach(fileTwo => {
            //     if (fileOne.hash === fileTwo.hash) {
            //         if (fileOne.name === fileTwo.name) return;
            //         moveFile(fileOne.path, `${_DIR_ROOT_}/_delete/${fileOne.name}`)
            //     }
            // })
        })
    }

    /**
     * move 匹配的文件
     * @param {*} filePathList 
     */
    moveInvalidFile = function moveInvalidFile(){
        let filePathList = require('../_cache/filePathList.json');
        filePathList.forEach(filePathData => {
            let reg = /.png$/;
            if (filePathData.size === 0 || reg.test(filePathData.name)) {
                moveFile(filePathData.path, `${_DIR_ROOT_}/_delete/${filePathData.name}`);
            }
        })
    }
}

module.exports = FileLib
