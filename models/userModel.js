const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
// const Joi = require("joi") 
const validator = require("validator")

const schema = mongoose.Schema

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
},{timestamp:true})

// static use method
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields must be completed");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email must be a valid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be strong");
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error("The email is already in use");
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await this.create({
        email,
        password: hash,
    });

    return user;
};


    // joi schema
// const validate = (data) => {
//     const schema = Joi.object({
//         email: Joi.string().email().required().label('email'),
//         password: Joi.string().min(6).max(20).required().label('password')
//     })
//     return schema.validate(data,{abortEarly:false})
// }

module.exports = mongoose.model('User',userSchema)