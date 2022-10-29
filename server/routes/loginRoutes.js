const express = require('express');
const router = express.Router();
const userModel = require("../models/users");
const bcrypt = require('bcrypt');
const session = require('express-session');

router.use(express.json()); 
router.use(session({
    secret: '2C44-4D44-WppQ385',
    resave: true,
    saveUninitialized: true
}))

router.get('/checklogged', function (req, res) {

    if (!req.session.user) {
        return res.json({logged: false, user: ""});
    }else{
        return res.json({logged: true, user: req.session.user});
    }
});


router.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
  });

router.post('/register', async (req, res) => {
    
    const {email, password} = req.body;
    if (!email || !password) {
        return res.json({msg: "password and email are required"}); 
    }
    
    const user = await userModel.findOne({email: email});
    if (user) {
        return res.json({msg: " user already exists"});
    }

    const newUser = new userModel({email: email, password: password});
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

    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({msg: 'Passord or email not valid'});
    }

    const user = await userModel.findOne({email: email});
    if(!user){
        return res.json({msg: 'User Not found'});
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
        req.session.user = email;
        req.session.admin = true;
        return res.json({msg: 'you have logged in succesfully'});
    } else {
        return res.json({msg: 'invalid password!!!'});
    }
} ); 



module.exports = router;