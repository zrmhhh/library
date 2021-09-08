const fs = require('fs'); // 引入fs模块
const crypto = require('crypto');

/**
 * 获取文件扩展名
 * @param {String} filePath 文件路径
 * @returns 
 */
function getFileSuffix(filePath) {
  let arr = filePath.split('.');
  let len = arr.length;
  return arr[len - 1];
}

/**
 * 文件生成md5
 * @param {string} path 文件路径
 * @param {function} next 回调函数
 */
function generateMD5(path){
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
 * @param {string} pathOne 文件1路径
 * @param {string} pathTwo 文件2路径
 * @param {function} next 回调函数
 */
function comparisonFile(pathOne, pathTwo, next){
	generateMD5(pathOne, (dataOne) => {
		generateMD5(pathTwo, dataTwon => {
			// console.log(dataOne === dataTwon);
			next(dataOne === dataTwon);
		})
	});
}

module.exports = {
  getFileSuffix
}
