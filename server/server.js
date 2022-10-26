const express = require('express');
const app = express();
const mongoose = require('mongoose')

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://aminelarbi:hanndelta14@cluster0.qm0bupw.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
// client.connect(err => {
//     const collection = client.db("mydb").collection("users");
//     // perform actions on the collection object
//     client.close();
//   });

mongoose.connect("mongodb+srv://aminelarbi:hanndelta14@cluster0.qm0bupw.mongodb.net/?retryWrites=true&w=majority");


app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
} );

app.listen(5000, () => { console.log("server runing 5000"); }) 