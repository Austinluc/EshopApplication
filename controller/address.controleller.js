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


//Controller for Address
exports.Address=async (req,res)=>{

    var token =req.headers["x-auth-token"];

    const zipRegex = /^\d{6}$/;

    const phoneNumberRegex = /^\d{10}$/;
    try{
        //checking whether the body is empty or not
        if(!req.body||Object.keys==0){
            return  res.status(400).send({
                message:"content should not be empty"
            })
        }
        //checking the credential
        if(!token){
           return res.status(401).send({
                message:"Please login first to access this endpoint!"
            })
        }
        //checking the zipcode format
        if(!zipRegex.test(req.body.zipcode)){
            res.status(400).send({
                message:"Invalid zipcode format"
            })
        }
         //validating the phone number if its format is correct or wrong
         if (!phoneNumberRegex.test(req.body.phone)) {
            res.status(400).send({
                message: "Invalid contact number!",
            })
        }
        //decode the token for relational purpose
        const decodedToken=jwt.decode(token,{complete:true})
        const userId=decodedToken.payload.id;

        const obj={};

        User.findOne({_id:userId})
            .then((user) => {
                if(!user){
                    throw new Error("user not found")
                }
                obj.user=user;
            })
            .catch((err)=>{
                console.log(err);
            });
        const userAddress=await Address.create({
            name:req.body.name,
            phone: req.body.phone,
            street: req.body.street,
            landmark: req.body.landmark,
            city: req.body.city,
            state: req.body.state,
            zipcode:req.body.zipcode,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        })

        res.status(200).send({
            status:"success",
            address:{
                _id:userAddress._id,
                name: userAddress.name,
                phone:userAddress.phone,
                street: userAddress.street,
                landmark: userAddress.landmark,
                city: userAddress.city,
                state: userAddress.state,
                zipcode: userAddress.zipcode,
                user:obj.user
            },
           
        })
    }
    catch(err){

        console.log("error",err);
        res.status(500).send({
            message:"Some error occured while getting the address"
        })
    }

}