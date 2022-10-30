const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userModel = require("./models/users")
const todoModel = require("./models/todos")

const cors = require('cors');
require('dotenv').config();

app.use(express.json());

mongoose.connect(process.env.DatabaseConnection);

const loginRouter = require('./routes/loginRoutes');

app.use(cookieParser());
const session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ385',
    resave: true,
    saveUninitialized: true
}))
 
app.use(cors());
app.use('/api', loginRouter);

app.get("/getTodos", (req, res) => {
    todoModel.find({user: req.session.user}, (err, result) => {
        if (err) {
          res.json(err);
        }else{
          var data = {
            result : result,
            usa : req.session.user
          } 
          res.json(data)
        }
    } ) 
} )


app.post("/createTodo", async (req, res) => {
    console.log(req.session.user);
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
