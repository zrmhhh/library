var net = require('net');

net.createServer(function (client) {
    client.on('data', function (data) {
        console.log(data.toString())
        client.write(data);
        // console.log('client')
        // var server = net.createConnection(2222, '127.0.0.1');
        // server.write(Buffer.from('client'))
        // client.on("data", function (data) { console.log('client: client'); server.write(data); });
        // server.on("data", function (data) { console.log('client: server'); client.write(data); });
    });
}).listen(1111);

net.createServer(function (client) {
    client.on('data', function (data) {
        console.log('server')
        var server = net.createConnection(3333, '127.0.0.1');
        client.on("data", function (data) { console.log(`server: client ===>>> ${data.toString()}`); server.write(data); });
        server.on("data", function (data) { console.log(`server: server ===>>> ${data.toString()}`); client.write(data); });

        server.write(Buffer.from('server'))
    });
}).listen(2222);

net.createServer(function (client) {
    client.on('data', function (data) {
        client.write(Buffer.from(Date.now() + ''));
    });
}).listen(3333);


//处理各种错误
process.on('uncaughtException', function (err) {
    console.log("\nError!!!!");
    console.log(err);
});
