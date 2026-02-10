import {Application} from "oak/mod.ts";
import todoRoutes from "./routes/todos.ts";
import {connect} from "./helpers/db_client.ts"

await connect()
const app = new Application();


app.use(async (_ctx, next) => {
    console.log("Middleware!");
    await next();
})
app.use(async (ctx, next) => {
  console.log(ctx.request.method, ctx.request.url.href);
  await next();
});


// CORS
app.use(async (ctx, next) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
    ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    await next();
})
app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods())

console.log("Server starting on http://localhost:8000");
await app.listen({port: 8000})
