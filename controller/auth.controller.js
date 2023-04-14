const bcrypt = require('bcrypt');

const emailValidator = require('deep-email-validator');

const validator = require('validator');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const secretConfig= require('../configs/auth.config')

const User = require("../models/userschema");

const Order = require("../models/orderschema");

const Address = require("../models/addressSchema");

const Product = require("../models/productSchema");


//controller for sign up
exports.signup = async (req, res) => {

    try {

        if (!req.body || Object.keys === 0) {
            return res.status(400).send({
                message: "content cannot be empty"
            })
        }

        const { email, phone_number } = req.body;
        const phoneNumberRegex = /^\d{10}$/;
        //validating the email if its format is correct or wrong
        if (!validator.isEmail(email)) {
            return res.status(400).send({
                message: "Invalid email format"
            })
        }
        //validating the phone number if its format is correct or wrong
        if (!phoneNumberRegex.test(phone_number)) {
            res.status(400).send({
                message: "Invalid contact number!",
            })
        }

        //check the email is already exist or not
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).send({
                message: "Try any other email, this email is already registered",
            })
        }
       
        
        const userCreated = await User.create({
            password: bcrypt.hashSync(req.body.password, 8),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role: req.body.role
        });


        return res.status(200).send({
            status: "success",
            user: {
                _id: userCreated._id,
                first_name: userCreated.first_name,
                last_name: userCreated.last_name,
                email: userCreated.email
            }
        });

    }
    catch (err) {
        console.log("Error creating user", err);
        res.status(500).send({
            message: "Some error occurred while creating "
        });
    }
}

//controller for login 
exports.login=async (req,res)=>{
try{
    const {email,password}=req.body;
//checking the email and password
    if(!email&&!password){
        res.status(400).send({
            message:"please enter your valid email-id and password"
        })
    }
    const signinUser=await User.findOne({email});
//checking the email id
    if(!signinUser){
       return res.status(400).send({
            message:"This email has not been registered"
        })
    }
//checking the password
    if(!bcrypt.compareSync(req.body.password,signinUser.password)){
       return res.status(400).send({
            message:"Invalid credential"
        })
    }
    //create the token and send the user

    var token=jwt.sign({id:signinUser._id,somedate:"Important"},secretConfig.secret,{expiresIn:5000});

    res.header('x-auth-token',token).status(200).send({
        message:"successfully signed in your account",
        user:{
            email:signinUser.email,
            name:signinUser.first_name,
            isAuthenticated:true,
            accesstoken:token
        }
    })
      
}
catch(err){

    console.log("error",err);
    res.status(500).send({
        message:"Some error occured while signed in"
    })
}
}






