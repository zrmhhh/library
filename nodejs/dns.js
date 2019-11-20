let dns = require('dns');

dns.lookup('www.qq.com', (err, addr, family) => {
    if (err) throw err;
    console.log(addr);
})
// let options = {
//     all: true
// }
// dns.lookup('www.qq.com', options, (err, addr, family) => {
//     if (err) throw err;
//     console.log(addr, '\n', family);
// })
