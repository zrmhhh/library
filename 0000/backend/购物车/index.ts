const fs = require('fs')
const Koa = require('koa');
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const json = {
    a: 1,
    b: 2
}
// fs.writeFileSync('./db/test', 'jsxxxon', () => {})

// const data = fs.readFileSync('./db/test', 'utf8')


const app = new Koa();
const router = new Router()
app.use(bodyparser())

// app.use(async (ctx: { set: (arg0: string, arg1: string) => void; }, next: () => any) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   await next();
// });

router.get('/goods/list', async (ctx: { body: { code: number; data: any; }; }) => {
  const data = fs.readFileSync('./db/goods', 'utf8')
  ctx.body = {
    code: 200,
    data: JSON.parse(data)
  }
})

router.get('/cart/list', async (ctx: { body: { code: number; data: any; }; }) => {
  const data = fs.readFileSync('./db/cart', 'utf8')
  ctx.body = {
    code: 200,
    data: JSON.parse(data)
  }
})

router.post('/save/goods/list', async (ctx: { request: { body: any; }; body: { code: number; data?: { name: string; age: string; }; }; }) => {
  const reqBody = ctx.request.body
  fs.writeFileSync('./db/goods', JSON.stringify(reqBody), () => {})

  ctx.body = {
    code: 200
  }
})

router.post('/save/cart/list', async (ctx: { request: { body: any; }; body: { code: number; data?: { name: string; age: string; }; }; }) => {
  // console.log('-------------->', ctx.request.body)
  const reqBody = ctx.request.body
  fs.writeFileSync('./db/cart', JSON.stringify(reqBody), () => {})

  ctx.body = {
    code: 200
  }
})

app.use(router.routes())

app.listen(3000)
