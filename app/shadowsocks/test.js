let net = require('net');

net.createServer(client => {
    client.on('data', data => {
        console.log(data.toString());
    })
}).listen(8888);

process.on('uncaughtException', err => {
    console.log(err);
});
