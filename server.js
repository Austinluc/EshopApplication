const express=require('express');

const app=express();

const bodyParser = require('body-parser');
const url = require('url');
const queryString = require('querystring');
const bcrypt=require('bcrypt');
const emailValidator=require('deep-email-validator');
const validator=require('validator');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose=require('mongoose');


//import  port
const serverConfig = require('./configs/config');
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Eshop_application")
        .then(() => {
                console.log("successfully connecting to Eshop DB");
        })
        .catch((err)=>{
                console.log("Error connecting to Eshop DB",err);
                process.exit();
        })
//import route
require('./route/auth.route')(app);
require('./route/address.route')(app);
require('./route/product.route')(app);
require('./route/order.route')(app);

//userRoute(app);
        app.listen(serverConfig.PORT,()=>{
            console.log(`server is running on ${serverConfig.PORT} PORT`)
        });