let fs = require('fs'); // 引入fs模块
let crypto = require('crypto');
 
/**
 * 删除文件、文件夹
 * @param {文件路径} path 
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

// removeFile('./001')

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
 * @param {文件路径} path 
 * @param {回调函数} next 
 */
function checkMd5(path, next){
	let rs = fs.createReadStream(path);
	let hash = crypto.createHash('md5');
	rs.on('data', hash.update.bind(hash));

	rs.on('end', function () {
		next(hash.digest('hex'));
	});
}

/**
 * 对比两个文件是否相同
 * @param {文件路径} pathOne 
 * @param {文件路径} pathTwo 
 * @param {回调函数} next 
 */
function comparisonFile(pathOne, pathTwo, next){
	checkMd5(pathOne, (dataOne) => {
		checkMd5(pathTwo, dataTwon => {
			// console.log(dataOne === dataTwon);
			next(dataOne === dataTwon);
		})
	});
}

module.exports = {
	removeFile,
	checkMd5,
	comparisonFile,
	copyFile,
	moveFile
}
