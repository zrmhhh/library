const cluster = require('cluster');
// const { fork } = require('child_process');
const numCPUs = require('os').cpus().length;

// child
const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  };
  return sum;
};
process.on('message', (msg) => {
  const sum = longComputation();
  process.send(sum);
});

if (!cluster.isMaster) return false;
// main process
const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const compute = cluster.fork('./process/index.js');
    compute.send('start');
    compute.on('message', sum => {
      res.end(`Sum is ${sum}`);
    });
  } else {
    res.end('Ok')
  }
});
server.listen(3000);


