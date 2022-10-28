const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userModel = require("./models/users")
const todoModel = require("./models/todos")

const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());
 
mongoose.connect(process.env.DatabaseConnection);

const loginRouter = require('./routes/loginRoutes');


app.use('/api', loginRouter);

app.post("/getyey", (req, res) => {
    console.log(req.body);
} )

app.get("/getTodos", (req, res) => {
    todoModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        }else{
            res.json(result)
        }
    } )
} )


app.post("/createTodo", async (req, res) => {
    const todo = req.body;
    const newTodo = new todoModel(todo);
    await newTodo.save();
    res.json(todo);
} );

app.delete('/deletetodo/:id', async (req, res) => {
    const id = req.params.id;

    await todoModel.deleteOne({ _id: id });
    res.send("DELETE Request Called")
  });

app.post('/edittodo/:id', async (req, res) => {
    const id = req.params.id;
    const todo = req.body;
    let docc = await todoModel.findOne({_id: id});
    let doc = await todoModel.findOneAndUpdate({_id: id}, {done: todo.done, todo: todo.todo}, {new: true});

    res.send("EDIT Request Called")
  });

app.get('/checkDone/:id', async (req, res) => {
    const id = req.params.id;

    let docc = await todoModel.findOne({_id: id});

    let doc = await todoModel.findOneAndUpdate({_id: id}, {done: !docc.done}, {new: true});

  });


app.listen(5000, () => { console.log("server runing 5000"); })
