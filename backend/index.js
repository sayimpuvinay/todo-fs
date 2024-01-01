const express = require("express");
const app = express();
const { createTodo, updateTodo } = require('./types');
const { todo }  = require ('./db')

app.use(express.json());

app.post("/todo", async function(req, res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "you sent the wrong message",
        })
        return;
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "todo created"
    })
})

app.get("/todos", async function(req, res){
    const todos = await todo.find({});
    res.json({
        todos
    })
})

app.put("/completed", async function(req, res){
    const updatePayload = req.body;
    const parsedPayload = updatePayload.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.sendStatus(411).json({
            msg: "you sent the wrong inputs",
        })
        return;
    }
    await todo.update ({
        _id: req.body.id
    }, {
        completed: true
    })
    res.json ({
        msg: "todo marked as completed"
    })
})

app.listen(3456);