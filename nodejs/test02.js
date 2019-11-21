var net = require('net');

net.createServer(function (client) {
    client.on('data', function (data) {
        var server = net.createConnection(443, 'www.baidu.com');
        client.on("data", function (data) { server.write(data); });
        server.on("data", function (data) { client.write(data); });

        if (req.method == 'CONNECT')
            client.write(new Buffer("HTTP/1.1 200 Connection established\r\nConnection: close\r\n\r\n"));
        else
            server.write(buffer);
    });
}).listen(2222);


//处理各种错误
process.on('uncaughtException', function (err) {
    console.log("\nError!!!!");
    console.log(err);
});
