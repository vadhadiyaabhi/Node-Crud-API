const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/users", async (req, res) => {

    try{
        // console.log(req.body);
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password === cpassword){

            const user = new User(req.body);
            // console.log(user);
            const createdUser = await user.save();
            res.status(201).send(createdUser);
        }
        else{
            return res.status(400).send("Password and Confirm password must match");
        }

    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})

router.post("/login", async (req, res) => {

    try{

        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email: email});

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            res.status(200).send("Authenticated");
        }
        else{
            res.status(401).send("Invalid Credentials");
        }
        
    }catch(err){
        res.status(401).send("Invalid Credentials");
    }
})

module.exports = router;