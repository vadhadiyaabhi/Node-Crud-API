const User = require("../models/users.model");

const createUser = async function(data){
    try{
        return await User.create(data);
    }catch(err){
        throw new Error(err);
    }
}

const findUserByEmail = async function(email){

    try{
        const user = await User.findOne({email: email});
        if(!user){
            return null;
        }
        else{
            return user;
        }
    }catch(err){
        log.error(err);
        throw new Error(err);
    }

}


module.exports.createUser = createUser;
module.exports.findUserByEmail = findUserByEmail;