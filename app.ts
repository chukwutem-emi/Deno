import {Application} from "https://deno.land/x/oak@v17.2.0/mod.ts"


const app = new Application();

// context (ctx) => response, request
app.use((ctx) => {
    ctx.response.body = "Hello World!";
});

await app.listen({port: 8000})