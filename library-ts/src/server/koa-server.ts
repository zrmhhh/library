import Koa from 'koa';

const server: Koa = new Koa();
const port: number = 3000;

server.use((ctx: Koa.DefaultContext) => {
    ctx.body = 'balalalalal';
});

server.listen(port, () => {
    console.log(`Node.js v${process.versions.node}`);
});

export default server
