const userModel=require('../models/user.model')
const userService=require('../services/user.service')
const {validationResult}=require('express-validator')
const blackListTokenModel=require('../models/blackListToken.model')
module.exports.registerUser=async(req,res,next)=>{
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors:errors.array()})  // we get withMessage data in errors.array()
    // }
    // const errors=validationResult(req)
    // console.log("Error at registerUser",errors)

    const {fullname,email,password}=req.body
    const isuserExist=await userModel.findOne({email})
    if(isuserExist)
        return res.status(400).json({message:"User already exist"})

    const hashPassword=await userModel.hashPassword(password)
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
    })
    const token=user.generateAuthToken()
    res.status(201).json({token,user})
}

module.exports.loginUser=async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})  // we get withMessage data in errors.array()
    }

    const {email,password}=req.body

    // since I mentioned select:false for password in userModel I am using +password
    const user=await userModel.findOne({email}).select('+password')

    if(!user)
        return res.status(401).json({message:'Invalid email or password'})

    const isMatch=await user.comparePassword(password)

    if(!isMatch)
        return res.status(401).json({message:"Invalid email or password"})

    const token=user.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({token,user})
}

module.exports.logoutUser=async(req,res,next)=>{
    const token= req.cookies.token || req.headers?.authorization.split(' ')[1]
    await blackListTokenModel.create({token})
    res.clearCookie('token')
    res.status(200).json({message:'Logged Out'})
}

module.exports.getUserProfile=async (req,res,next)=>{
    if(!req.user)
        return res.status(404).json({message:'User not found'})

    // we will get req.user value from the response of authUser
    return res.status(200).json(req.user)
}