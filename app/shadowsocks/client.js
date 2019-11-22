const net = require('net');
const { Encryptor } = require("./lib/encrypt");
const SERVER_PORT = 6666;
const SERVER_HOST = '127.0.0.1';
let encryptor = new Encryptor('123456', 'aes-256-cfb');

net.createServer(client => {
    var buffer = new Buffer(0);
    client.on('data', data => {
        var server = net.createConnection(SERVER_PORT, SERVER_HOST);
        //交换服务器与浏览器的数据
        // data = encryptor.encrypt(data);
        server.write(data);
        client.on("data", function (data) {
            // data = encryptor.encrypt(data);
            server.write(data);
        });
        server.on("data", function (data) { client.write(data); });
    })
}).listen(7777);

//处理各种错误
process.on('uncaughtException', function (err) {
    console.log("\nError!!!!");
    console.log(err);
});
