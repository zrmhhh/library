
let fs = require('fs'); // 引入fs模块
let crypto = require('crypto');
 
// 删除文件、文件夹
function deleteFile(path) {
	let files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			let curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				deleteFile(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
    }
}

// deleteFile('./001')

// md5
function checkMd5(path, next){
	let rs = fs.createReadStream(path);
	let hash = crypto.createHash('md5');
	rs.on('data', hash.update.bind(hash));

	rs.on('end', function () {
		next(hash.digest('hex'));
		// console.log(hash.digest('hex'));
	});
}

// checkMd5('./app.js', (data) => {
// 	checkMd5('./app.js', (resData) => {
// 		console.log(resData === data);
// 	})
// });

export {
	deleteFile,
	checkMd5
}
