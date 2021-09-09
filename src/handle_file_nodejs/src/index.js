const fs = require('fs');
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
    static moveEqualFile(){
        if (!fs.existsSync(`${_FILE_ROOT_}/_delete`)) fs.mkdirSync(`${_FILE_ROOT_}/_delete`)
        let filePathList = require('../_cache/filePathList.json');
        for(let key in filePathList) {
            let filePathData = filePathList[key] || {}

            if (filePathData && filePathData.length) {
                console.log(filePathData)
                filePathData.forEach(item => {
                    moveFile(item.path, `${_FILE_ROOT_}/_delete/${item.name}`)
                })
            }
        }
    }

    /**
     * move 匹配的文件
     * @param {*} filePathList 
     */
    static moveMatchFile(){
        const filePathList = require('../_cache/filePathList.json');

        mainRun(filePathList)
        function mainRun(list) {
            for(let key in list) {
                let item = list[key] || {}
                matchFunc(item) && moveFile(item.path, `${_FILE_ROOT_}/_delete/${item.name}`)

                if (item && item.length) {
                    mainRun({...item})
                }
            }
        }
        function matchFunc(filePathData){
            // 根据后缀名匹配
            // const reg = /.png$/;
            // return reg.test(filePathData.name)

            // 根据文件大小匹配
            // const fileSize = 100; // MB
            // return fileSize < filePathData.size;
        }
    }
}

module.exports = FileLib
