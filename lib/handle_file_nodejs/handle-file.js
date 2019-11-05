let fs = require('fs'); // 引入fs模块
let crypto = require('crypto');
 
/**
 * 删除文件、文件夹
 * @param {string} path 文件路径
 */
function removeFile(path) {
	let files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			let curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				removeFile(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
    }
}

function copyFile(filePath, targetPath){
	if (!fs.existsSync(filePath) || fs.existsSync(targetPath)) return false;
	fs.copyFileSync(filePath, targetPath);
}

function moveFile(filePath, targetPath) {
	if (!fs.existsSync(filePath) || fs.existsSync(targetPath)) return false;
	fs.rename(filePath, targetPath, err => {
		if (err) throw err;
	})
}

/**
 * 文件生成md5
 * @param {string} path 文件路径
 * @param {function} next 回调函数
 */
function checkMd5(path){
	return new Promise((resolve, reject) => {
		let rs = fs.createReadStream(path);
		let hash = crypto.createHash('md5');
		rs.on('data', hash.update.bind(hash));

		rs.on('end', function () {
			resolve(hash.digest('hex'));
		});
	})
}

/**
 * 对比两个文件是否相同
 * @param {string} [pathOne] 文件路径 
 * @param {string} [pathTwo] 文件路径
 * @param {function} [next] 回调函数
 */
function comparisonFile(pathOne, pathTwo, next){
	checkMd5(pathOne, (dataOne) => {
		checkMd5(pathTwo, dataTwon => {
			// console.log(dataOne === dataTwon);
			next(dataOne === dataTwon);
		})
	});
}

// write to file
function writeFile(path, data) {
	if (typeof data === 'object') data = JSON.stringify(data);
	fs.writeFile(path, data + '\n', function(err) {
		if (err) throw err;
		console.log('写入成功');
	});
}

module.exports = {
	removeFile,
	checkMd5,
	comparisonFile,
	copyFile,
	moveFile,
	writeFile
}
