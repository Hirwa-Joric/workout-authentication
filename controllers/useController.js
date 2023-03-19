const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}
// login controller
exports.loginUser = (req, res) => {
    res.json({message:"use login in"})
}


// register controller

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
    const user = await User.signup(email, password);
        const token =  await createToken(user._id)
        res.status(200).json({email,token})
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
