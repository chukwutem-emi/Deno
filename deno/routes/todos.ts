import {Router} from "oak/mod.ts";


const router = new Router();

interface Todo {
    id: string;
    text: string;
};

let todos: Todo[] = [];

router.get("/", (ctx) => {
    ctx.response.body = { todos: todos};
    ctx.response.status = 200;
});

router.post("/todos", async (ctx) => {
    const data = await ctx.request.body.json() as {text: string};
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: data.text
    }
    todos.push(newTodo);
    ctx.response.body = {message: "Created todo", todo: todos};
    ctx.response.status = 201;
});

router.put("/todos/:todoId", async (ctx) => {
    const data = await ctx.request.body.json() as {text: string};
    const tid = ctx.params.todoId;
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === tid
    })
    todos[todoIndex] = {
        id: new Date().toISOString(),
        text: data.text
    }
    ctx.response.body = {message: "Todo updated!."};
    ctx.response.status = 200;
});

router.delete("/todos/:todoId", (ctx) => {
    const tid = ctx.params.todoId;

    todos = todos.filter((todo) => {
        todo.id !== tid
    });
    ctx.response.body = {message: "Todo deleted."},
    ctx.response.status = 200;
});

export default router;