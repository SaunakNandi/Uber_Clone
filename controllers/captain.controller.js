const captainModel=require('../models/captain.model')
const captainService=require('../services/captain.service')
const {validationResult}=require('express-validator')
const blackListTokenModel=require('../models/blackListToken.model')

module.exports.registerCaptain=async(req,res,next)=>{
    // const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors:errors.array(),})  // we get withMessage data in errors.array()
    // }

    const {fullname,email,password,vehicle}=req.body
    console.log("vehicle ",vehicle)
    const isCapatainExist=await captainModel.findOne({email})
    if(isCapatainExist)
        return res.status(400).json({message:"Captain already exist"})

    const hashPassword=await captainModel.hashPassword(password)
    console.log("Good till here")
    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })
    console.log(captain)
    const token=captain.generateAuthToken()
    res.status(201).json({token,captain})
}

module.exports.loginCaptain=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})  // we get withMessage data in errors.array()
    }

    const {email,password}=req.body

    // since I mentioned select:false for password in userModel I am using +password
    const captain=await captainModel.findOne({email}).select('+password')

    if(!captain)
        return res.status(401).json({message:'Invalid or password'})

    const isMatch=await captain.comparePassword(password)

    if(!isMatch) // if password didn't match
        return res.status(401).json({message:"Invalid email or password"})

    const token=captain.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({token,captain})
}

module.exports.getCaptainProfile=async(req,res)=>{
    if (!req.captain) {
        return res.status(404).json({ message: 'Captain not found' });
    }
    res.status(200).json({captain:req.captain})
}

module.exports.logoutCaptain=async(req,res,next)=>{
    const token= req.cookies.token || req.headers?.authorization.split(' ')[1]
    await blackListTokenModel.create({token})
    res.clearCookie('token')
    res.status(200).json({message:'Logged Out'})
}