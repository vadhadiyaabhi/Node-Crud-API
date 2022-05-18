// const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//------------Create Schema for collection-----------------
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid");
            }
        }
    },
    mobile: {
        type: Number,
        min: 10,
        max: 10,
        // required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 14,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})


//------------Middleware before entering data to the Schema
userSchema.pre("save", async function(next){
    
    if(this.isModified("password")){
        console.log(`Original Password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`Hashed Password is ${this.password}`);

        this.cpassword = undefined;
    }

    next();

})


//----------Create a new Collection-----------------
const User =  new mongoose.model('User', userSchema);

module.exports = User;