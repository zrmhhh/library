const fs = require('fs'); // 引入fs模块
 
/**
 * 删除文件、文件夹（删除是危险操作，已注释，建议使用移动功能，二次确认后手动删除）
 * @param {string} path 文件路径
 */
function removeFile(path) {
	let files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach( file => {
			let curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) {
				// 递归删除文件夹内文件
				removeFile(curPath);
			} else {
				// delete file
				// fs.unlinkSync(curPath);
			}
		});
		// 删除目录
		// fs.rmdirSync(path);
    }
}

/**
 * 复制文件
 * @param {String} filePath 
 * @param {String} targetPath 
 * @returns 
 */
function copyFile(filePath, targetPath){
	if (!fs.existsSync(filePath) || fs.existsSync(targetPath)) return false;
	fs.copyFileSync(filePath, targetPath);
}

/**
 * 移动文件
 * @param {String} filePath 
 * @param {String} targetPath 
 * @returns 
 */
function moveFile(filePath, targetPath) {
	if (!fs.existsSync(filePath) || fs.existsSync(targetPath)) return false;
	fs.rename(filePath, targetPath, err => {
		if (err) throw err;
	})
}

/**
 * 写入文件
 * @param {String} path 
 * @param {Object | String} data 
 */
function writeFile(path, data) {
	if (typeof data === 'object') data = JSON.stringify(data);
	fs.writeFile(path, data + '\n', function(err) {
		if (err) throw err;
		console.log('写入成功');
	});
}

module.exports = {
	removeFile,
	copyFile,
	moveFile,
	writeFile
}
