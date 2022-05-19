const jwt = require("jsonwebtoken");
const User = require("../models/users.model");


const auth = async (req, res, next) => {
    try{

        const token = req.cookies.jwtToken;
        // console.log(token);
        const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifiedUser);

        const user = await User.findOne({_id: verifiedUser._id});
        console.log(user.firstname + " " + user.lastname);

        req.token = token;
        req.user = user;

        next();

    }catch(err){
        console.log(err);
        res.status(401).send(err);
    }
}

module.exports = auth;