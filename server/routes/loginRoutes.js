const express = require('express');
const router = express.Router();
const userModel = require("../models/users");
const bcrypt = require('bcrypt');

router.use(express.json()); 

router.get('/checklogged', function (req, res) {

    if (!req.session.user) {
        return res.json({logged: false, user: ""});
    }else{
        return res.json({logged: true, user: req.session.user});
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send("logout success!");
  });

router.get('/getusers', async (req, res) =>{
    const users = await userModel.find();
    console.log(users);
    return res.send(users);
    
} )  

router.post('/register', async (req, res) => {
    
    const {username, email, password} = req.body;
    if (!email || !password || !username) {
        return res.json({msg: "username, password and email are required"}); 
    }
    

    const exitmail = await userModel.findOne({email: email});
    const existuser = await userModel.findOne({username: username});

    if (exitmail || existuser) {
        return res.json({msg: " user already exists"});
    }

    const newUser = new userModel({username: username, email: email, password: password});
    bcrypt.hash(password, 7, async (err, hash) => {
        if (err) {
            return req.json({msg: "error while storing"})
        }
        newUser.password = hash;
        const savedUserRes = await newUser.save();

        if (savedUserRes) {
            return res.json({msg: "user registred!!"});
        }
    } )
})

router.post('/login', async (req, res) => {

    const {username, password} = req.body;

    if (!username || !password) {
        return res.json({msg: 'Password or username not valid'});
    }

    const user = await userModel.findOne({username: username});
    if(!user){
        return res.json({msg: 'User Not found'});
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
        req.session.user = username;
        req.session.admin = true;
        req.session.save()
        return res.json({msg: 'you have logged in succesfully'});
    } else {
        return res.json({msg: 'invalid password!!!'});
    }
} ); 



module.exports = router;