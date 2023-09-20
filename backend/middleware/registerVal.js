const UserModel = require("../models/userModel");

const registerVal = async(req,res,next) => {
    const {email,password} = req.body;

    if(password.length < 8){
        return res.status(400).send({"errmsg":"Password must be of minimum 8 characters!"})
    }

    if(!/\d/.test(password)){
        return res.status(400).send({"errmsg":"Password must contain at least a number!"})
    }

    if(!/[A-Z]/.test(password)){
        return res.status(400).send({"errmsg":"Password must contain at least an uppercase character!"})
    }

    if(!/[!@#$%^&*]/.test(password)){
        return res.status(400).send({"errmsg":"Password must contain at least a special character!"})
    }

    const existUser = await UserModel.findOne({email})

    if(existUser){
         res.status(400).send({"errmsg":"User already exists!"})
    }else{
        next()
    }

}

module.exports = registerVal;