const fs = require('fs')
const Koa = require('koa');
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const app = new Koa();
const router = new Router()
app.use(bodyparser())

// app.use(async (ctx: { set: (arg0: string, arg1: string) => void; }, next: () => any) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   await next();
// });

// 登录
router.post('/login', async (ctx: { request: { body: any; }; body: { code: number; message: string; token: string; }; }) => {
  const reqBody = ctx.request.body
  let resBody = {
    code: 400,
    message: '登录失败',
    token: ''
  }
  if (reqBody.account === 'zhaoyang' && reqBody.password === '666888') {
    resBody.code = 200,
    resBody.message = '登陆成功'
    resBody.token = 'asldruo234978584767656'
  }

  ctx.body = resBody
})
// 优惠券
router.get('/coupon/list', async (ctx: { body: { code: number; data: any; }; }) => {
  const data = fs.readFileSync('./db/coupon', 'utf8')
  ctx.body = {
    code: 200,
    data: JSON.parse(data)
  }
})
router.post('/coupon/get', async (ctx: { request: { body: any; }; body: { code: number; message: string; data: {} | {} | {}; }; }) => {
  const couponList = JSON.parse(fs.readFileSync('./db/coupon', 'utf8'))
  const reqBody = ctx.request.body
  const couponId = Number(reqBody.id)
  const couponIndex = couponList.map((v: { id: any; }) => v.id).indexOf(couponId)
  // console.log(couponId, couponIndex, typeof couponId)
  if (couponIndex === -1) {
    ctx.body = {
      code: 400,
      message: '该优惠券不存在',
      data: {}
    }
  } else {
    const isGet = couponList[couponIndex].isGet
    if (isGet) {
      ctx.body = {
        code: 400,
        message: '该优惠券已领取',
        data: {}
      }
    } else {
      couponList[couponIndex].isGet = true
      fs.writeFileSync('./db/coupon', JSON.stringify(couponList), () => {})
      ctx.body = {
        code: 200,
        message: '领取成功',
        data: {}
      }
    }
  }
})
router.get('/coupon/my/query', async (ctx: { body: { code: number; data: any; }; }) => {
  const dataStr = fs.readFileSync('./db/coupon', 'utf8')
  const dataArr = JSON.parse(dataStr)
  const myCouponList = [] as any
  dataArr.forEach((item: { isGet: any; }) => {
    if (item.isGet) myCouponList.push(item)
  })

  ctx.body = {
    code: 200,
    data: myCouponList
  }
})
// 商品列表
router.get('/goods/list', async (ctx: { body: { code: number; data: any; }; }) => {
  const data = fs.readFileSync('./db/goods', 'utf8')
  ctx.body = {
    code: 200,
    data: JSON.parse(data)
  }
})

// 结算订单
router.post('/order/create', async (ctx: { request: { body: any; }; body: { code: number; message: string; }; }) => {
  const couponList = JSON.parse(fs.readFileSync('./db/coupon', 'utf8'))
  const goodsList = JSON.parse(fs.readFileSync('./db/goods', 'utf8'))
  let couponMap = {} as any
  let goodsMap = {} as any
  goodsList.forEach((goodsItem: { id: string | number; }) => {
    goodsMap[goodsItem.id] = goodsItem
  })
  couponList.forEach((couponItem: { id: string | number; }) => {
    couponMap[couponItem.id] = couponItem
  })

  const reqBody = ctx.request.body
  const couponId = reqBody.coupon_id
  const buyGoodsList = reqBody.cart_list

  let totalPrice = 0
  buyGoodsList.forEach((item: { id: any; count: any; }) => {
    let id = item.id
    let count = item.count
    let goodsItem = goodsMap[id] || {}
    
    totalPrice += (goodsItem.price * count)
  })

  let couponItem = couponMap[couponId]
  if (totalPrice >= couponItem.fill) {
    totalPrice -= couponItem.minus
    if (totalPrice <= 0) {
      totalPrice = 0.01
    }
  }

  ctx.body = {
    code: 200,
    message: '购买成功'
  }
})

app.use(router.routes())
app.listen(3000)
