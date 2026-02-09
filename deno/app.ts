import {Application} from "oak/mod.ts";
import todoRoutes from "./routes/todos.ts";


const app = new Application();

app.use(async (ctx, next) => {
    console.log("Middleware!");
    await next();
})

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods())

await app.listen({port: 8000})
