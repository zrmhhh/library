let dgram = require ('dgram');
let server = dgram.createSocket("udp4");

server.on ("message", function (msg, rinfo) {
  console.log("server got: " + msg + "\nfrom: " + rinfo.address + ":" + rinfo.port);
});

server.on("listening", function () {
  let address =server.address();
  console.log("server listening: " + address.address + ":" + address.port);
});

server.bind(7777);


let message = Buffer.from("Node.js")
let client = dgram.createSocket("udp4");

client.send(message, 0, message.length, 7777, "localhost", function (err, bytes) {
  client.close();
});
