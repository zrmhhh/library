
var fs = require('fs'); // 引入fs模块
var crypto = require('crypto');
 
// 删除文件
function deleteall(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
    }
}

// deleteall('./001')

// md5
function checkMd5(path, next){
	var rs = fs.createReadStream(path);
	var hash = crypto.createHash('md5');
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


