const log = require("../logger");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const {createUser, findUserByEmail} = require("../service/user.service");
const user = require("../models/users.model");

const createUserHandler = async (req, res) => {
    try{
        const user = await createUser(req.body);

        const jwtToken = await user.generateToken();
        //      user.tokens = user.tokens.concat({token: jwtToken});


        //  //-------------------------- To store jwtToken as cookie in user's browser
         res.cookie("jwtToken", jwtToken, {
             expires: new Date(Date.now() + 3600000),
             httpOnly: true,
             // secure: true // ----------- For https only
         })

        return res.status(201).send(_.omit(user.toJSON(), ["password"]));
    }
    catch(err){
        log.error(err);
        return res.status(409).send(err.message);
    }
}

const loginHandler = async (req, res) => {
    try{

        const email = req.body.email;
        const password = req.body.password;
        const user = await findUserByEmail(email);
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const jwtToken = await user.generateToken();
                
                //-------------------------- To store jwtToken as cookie in user's browser
                res.cookie("jwtToken", jwtToken, {
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: true,
                    // secure: true // ----------- For https only
                })
                console.log(user);
                res.status(200).send({msg: "Authenticated", token: jwtToken});
                // res.status(200).send({msg: "Authenticated", token: jwtToken, user: _.omit(user.toJSON(), ["password"])});
            }
            else{
                res.status(401).send("Invalid Credentials");
            }
        }
        else{
            res.status(401).send("Invalid Credentials");
        }
    }catch(err){
        log.error(err);
        res.status(401).send("Invalid Credentials");
    }
}

module.exports.createUserHandler = createUserHandler;
module.exports.loginHandler = loginHandler;