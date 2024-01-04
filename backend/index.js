const express = require("express");
const app = express();
const cors = require("cors");
const { createTodo, updateTodo } = require('./types');
const { todo }  = require ('./db')

app.use(express.json());
app.use(cors());

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
    try {
        const updatePayload = req.body;
        const parsedPayload = updateTodo.safeParse(updatePayload);
        if (!parsedPayload.success) {
            res.status(400).json({
                msg: "Invalid input for marking as completed",
            });
            return;
        }

        const updatedTodo = await todo.findById(req.body.id);
        if (!updatedTodo) {
            res.status(404).json({
                msg: "Todo not found",
            });
            return;
        }

        // Toggle the completed status
        updatedTodo.completed = !updatedTodo.completed;
        await updatedTodo.save();
        if (updatedTodo.completed == true) {
            res.json({
                msg: "Todo marked as completed",
                todo: updatedTodo,
            });
        } else {
        res.json({
            msg: "Todo marked as incompleted",
            todo: updatedTodo,
        });
    }
    } catch (error) {
        console.error("Error marking todo as completed:", error);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
});


app.listen(3456);




/* 
backend emii oori chivara unde ranku munda kaadhu
evarni padithe aadni allow cheytaniki.
(yevadu padithe aadu req petataniki).
andhuke cors ane daridrapu gottam edchindhi.
bollywood lo strong women ante lanja laga panga chapatam annattu,
cors unte ee backend andhariki dhani andhalu (data) panchi pettiddhi.
*/