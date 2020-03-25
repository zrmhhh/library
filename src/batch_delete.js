const https = require('https');

function del(id){
    // 3374  3375 3376
    if (id === 3374 || id === 3375 || id === 3376) return false;
    let content = JSON.stringify({
        id,
        merchantId: 185
    })
    let options = {
        hostname: 'www.test.com',
        path: '/sq/merchant/api/store/v1/delete',
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // 'Content-Length': content.length,

            'Origin': 'https://www.test.com',
            'Referer': 'https://www.test.com/',
            'Sec-Fetch-Mode': 'cors',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',

            'X-MERCHANT-ID': 'ID',
            'X-AUTH-KEY': 'KEY',
            'X-AUTH-TOKEN': 'TOKEN'
        }
    };
    let req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`响应主体: ${chunk}`);
        });
    })
    req.write(content);
    req.end();
}

let id = 3787;
setInterval(() => {
    del(id)
    id ++;
}, 200);
