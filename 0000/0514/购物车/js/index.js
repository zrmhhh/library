var goodsList = [
    {
        name: '苹果',
        price: 5,
        stock: 99
    }, {
        name: '香蕉',
        price: 8,
        stock: 99
    }, {
        name: '橘汁',
        price: 8,
        stock: 99
    }
]
var cartList = []

// 获取页面元素dom
var goodsEl = document.getElementsByClassName('goods')[0] // goods ul
var cartEl = document.getElementsByClassName('cart')[0] // cart ul
var cartAmountEl = document.getElementsByClassName('price-total')[0]

// 渲染商品列表页面
goodsList.forEach(goodsItem => {
    var goodsLiEl = document.createElement('li')
    var goodsLiPNameEl = document.createElement('p')
    var goodsLiPPriceEl = document.createElement('p')
    var goodsLiPStockEl = document.createElement('p')
    var goodsLiButtonEl = document.createElement('button')

    goodsLiPNameEl.innerHTML = `商品名称：${goodsItem.name}`
    goodsLiPPriceEl.innerHTML = `商品价格：${goodsItem.price}`
    goodsLiPStockEl.innerHTML = `商品库存：${goodsItem.stock}`
    goodsLiButtonEl.innerHTML = '购买'

    goodsLiEl.appendChild(goodsLiPNameEl)
    goodsLiEl.appendChild(goodsLiPPriceEl)
    goodsLiEl.appendChild(goodsLiPStockEl)
    goodsLiEl.appendChild(goodsLiButtonEl)

    goodsEl.appendChild(goodsLiEl)

    // 添加购买事件
    goodsLiButtonEl.addEventListener('click', function(){
        var isExist = false
        cartList.forEach(cartItem => {
            if (cartItem.name === goodsItem.name) {
                cartItem.count ++
                isExist = true
            }
        })

        if (!isExist) {
            cartList.push({
                name: goodsItem.name,
                price: goodsItem.price,
                count: 1
            })
        }
        
        // 渲染购物车列表
        renderCartFn()
    })
})

// 渲染购物车列表
function renderCartFn(){
    var priceTotal = 0
    
    cartEl.innerHTML = ''
    cartList.forEach((cartItem, cartIndex) => {
        var cartLiEl = document.createElement('li')
        var cartLiPNameEl = document.createElement('p')
        var cartLiPPriceEl = document.createElement('p')
        var cartLiPCountEl = document.createElement('p')
        var cartLiDivEl = document.createElement('div')
        var cartLiDivButtonMinusEl = document.createElement('button')
        var cartLiDivButtonPlusEl = document.createElement('button')

        cartLiPNameEl.innerHTML = `商品名称：${cartItem.name}`
        cartLiPPriceEl.innerHTML = `商品价格：${cartItem.price}`
        cartLiPCountEl.innerHTML = `购买数量：${cartItem.count}`
        cartLiDivButtonMinusEl.innerHTML = '-'
        cartLiDivButtonPlusEl.innerHTML = '+'

        cartLiEl.appendChild(cartLiPNameEl)
        cartLiEl.appendChild(cartLiPPriceEl)
        cartLiEl.appendChild(cartLiPCountEl)

        cartLiDivEl.appendChild(cartLiDivButtonMinusEl)
        cartLiDivEl.appendChild(cartLiDivButtonPlusEl)
        cartLiEl.appendChild(cartLiDivEl)

        cartEl.appendChild(cartLiEl)

        // 添加加减按钮事件
        cartLiDivButtonMinusEl.addEventListener('click', function(){
            cartItem.count --
            if (cartItem.count <= 0) {
                cartList.splice(cartIndex, 1)
            }
            renderCartFn()
        })
        cartLiDivButtonPlusEl.addEventListener('click', function(){
            cartItem.count ++
            renderCartFn()
        })

        // 累加购物车新品金额
        priceTotal += (cartItem.price * cartItem.count)
    })
    // 计算购物车总价
    cartAmountEl.innerHTML = `总价：${priceTotal}`
    cartEl.appendChild(cartAmountEl)
}

