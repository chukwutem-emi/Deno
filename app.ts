import {Application} from "oak/mod.ts"


const app = new Application();

// context (ctx) => response, request
app.use((ctx) => {
    ctx.response.body = "Hello World!";
});

await app.listen({port: 8000})