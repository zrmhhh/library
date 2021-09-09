const http = require('http');

function createMenu(paramsObj){
    let obj = {
        "title": "权限管理",
        "alias_title": "权限管理",
        "desc": "权限管理",
        "frontend_url": "/permission",
        "backend_url": "",
        "custom": "a",
        "menu_type": 1,
        "status": 1,
        "hide_in_menu": 0,
        "header": "home",
        "sort_order": 1,
        "parent_id": 0
    }
    Object.assign(obj, paramsObj)
    let content = JSON.stringify(obj)
    let options = {
        hostname: 'b2c-backend.lyky.xyz',
        path: '/admin/menu/create',
        port: 80,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',

            'Origin': 'http://b2c-ops.lyky.xyz',
            'Referer': 'http://b2c-ops.lyky.xyz/',
            'Sec-Fetch-Mode': 'cors',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',

            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbi5sYWlkYW5tZS5jb200IiwiYXVkIjoiYWRtaW4ubGFpZGFubWUuY29tIiwiaWF0IjoxNjMxMTc1NzQ3LCJleHAiOjE2MzEyNjIxNDcsInN1YiI6eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIn19.XsBUQ-igwPGeIEOmXtn7z6UrcVLToF5Zq_tjPkntmGk',
        }
    };
    let req = http.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`响应主体: ${chunk}`);
        });
    })
    req.write(content);
    req.end();
}

let { subPages } = require('./data.js');
subPages.forEach((item, index) => {
    item.sort_order = index + 1
    createMenu(item)
})

