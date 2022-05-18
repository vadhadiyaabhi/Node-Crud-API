const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {

    try{
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password === cpassword){

            const user = new User(req.body);
            // console.log(user);

            const jwtToken = await user.generateToken();
            user.tokens = user.tokens.concat({token: jwtToken});


            //-------------------------- To store jwtToken as cookie in user's browser
            res.cookie("jwtToken", jwtToken, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
                // secure: true // ----------- For https only
            })

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
            const jwtToken = await user.generateToken();

            //-------------------------- To store jwtToken as cookie in user's browser
            res.cookie("jwtToken", jwtToken, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
                // secure: true // ----------- For https only
            })

            res.status(200).send({msg: "Authenticated", token: jwtToken});
        }
        else{
            res.status(401).send("Invalid Credentials");
        }
        
    }catch(err){
        console.log(err);
        res.status(401).send("Invalid Credentials");
    }
})

router.get("/logout", auth, async(req, res) => {

    try{
        res.clearCookie("jwtToken");
        res.send("Logout Successfull");
    }catch(err){
        res.status(500).send(err);
    }

})

module.exports = router;