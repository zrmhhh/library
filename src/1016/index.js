
var fs = require('fs'); // 引入fs模块
var crypto = require('crypto');
 
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
// console.log(checkMd5('./app.js') == checkMd5('./app.js'));
// console.log(checkMd5('./app.js') == checkMd5('./README.md'));

checkMd5('./app.js', (data) => {
	checkMd5('./app.js', (resData) => {
		console.log(resData === data);
	})
});
// console.log('0f61f6f3e295150c634fd15514a20cc2' === 'c554484835cc743da7be57742f531570')
