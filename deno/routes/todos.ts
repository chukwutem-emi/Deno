import {Router} from "oak/mod.ts";
import {getDb} from "../helpers/db_client.ts";
import {ObjectId} from "mongo/mod.ts"


const router = new Router();

interface TodoDocument {
    _id: ObjectId;
    text: string;
};
interface Todo {
    id?: string;
    text: string;
};

let todos: Todo[] = [];
router.get("/ping", (ctx) => {
  ctx.response.body = "pong";
});

router.get("/", async (ctx) => {
    const todosCollection = getDb().collection<TodoDocument>("todos");
    const todosFromDb = await todosCollection.find().toArray();
    const transformedTodos: Todo[] = todosFromDb.map((todo) => {
        return {
            id: todo._id.toString(),
            text: todo.text
        }
    })
    ctx.response.body = { todos: transformedTodos};
    ctx.response.status = 200;
});

router.post("/todos", async (ctx) => {
    try {
        const data = await ctx.request.body.json() as {text: string};
        const newTodo: Todo = {
            //id: new Date().toISOString(),
            text: data.text
        }
        const id = await getDb().collection<TodoDocument>("todos").insertOne(newTodo);
        newTodo.id = id.toString();
    
        ctx.response.body = {message: "Created todo", todo: newTodo};
        ctx.response.status = 201;
    } catch (err) {
        console.error(err);
        ctx.response.status = 500;
        ctx.response.body = {message: "Internal server error"};
    }
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