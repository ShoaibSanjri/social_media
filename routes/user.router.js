const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

userRouter.post("/register", async (req, res) => {
    let {name, email, password, gender} = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                res.send("error while hashing password")
            }
            else if(hash) {
                let user = new UserModel({name, email, password:hash, gender});
                await user.save();
                res.status(200).send({"msg":"User is registered"})
            }
        });
        
    }
    catch (err) {
        res.status(400).send({"msg":err})
    }
})

userRouter.post('/login', async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await UserModel.findOne({email:email});
        if (user) {
            var token = jwt.sign({ authorID: password }, 'masai');
            res.status(200).send({'msg':"Login success","token":token})
        }
        else {
            res.status(400).send({'msg':"Please Put right Credentials"})
        }
    } catch (err) {
        res.status(400).send({'msg':"Please register first!!"})
    }
})

module.exports = {
    userRouter
}

// "name":"chunnu",
// "password":"chunnu@123",
// "email":"chunnu@gmail.com",
// "gender":"Male"