const fs = require('fs')

// 商品列表
fs.writeFileSync('./db/goods', JSON.stringify([
    {
        id: 1000,
        name: '苹果',
        price: 8,
        stock: 9
    }, {
        id: 1001,
        name: '香蕉',
        price: 9,
        stock: 11
    }, {
        id: 1002,
        name: 'iphone6',
        price: 3999,
        stock: 5
    }, {
        id: 1003,
        name: 'iphoneX',
        price: 4999,
        stock: 2
    }
]), () => {})

// 优惠券列表
fs.writeFileSync('./db/coupon', JSON.stringify([
    {
        id: 1000,
        isGet: false,
        fill: 30,
        minus: 5
    }, {
        id: 1001,
        isGet: false,
        fill: 99,
        minus: 20
    }, {
        id: 1002,
        isGet: false,
        fill: 199,
        minus: 50
    }, {
        id: 1003,
        isGet: false,
        fill: 299,
        minus: 80
    }, {
        id: 1004,
        isGet: false,
        fill: 1000,
        minus: 200
    }
]), () => {})
