const jwt =require('jsonwebtoken');
const secretConfig=require('../configs/auth.config');
const User=require('../models/userschema');

//check the admin
exports.checkAdmin=(req,res,next)=>{
    let token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).json({
      message: "Please login first to access this endpoint!",
    });
  }
  jwt.verify(token, secretConfig.secret, (err) => {
    if (err) {
      return res.status(401).send({
        message: "unauthorized",
      });
    }
  });

  const decodedToken=jwt.decode(token,{complete:true});
  const userId= decodedToken.payload.id;

  User.findOne({_id:userId})
        .then((user)=>{ 
            if(!user){
            throw new Error ("user not found")
            }
            const userType=user.role;
            if(userType!=="admin"){
                return res.status(401).json({
                message: "you are not authorised to access this endpoint",
             });
                  
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
              message: "An error occurred while processing your request",
            });
          });
          next();
        
          
    }

    //check user

exports.checkUser=(req,res,next)=>{
    let token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).json({
      message: "Please login first to access this endpoint!",
    });
  }
  jwt.verify(token, secretConfig.secret, (err) => {
    if (err) {
      return res.status(401).send({
        message: "unauthorized",
      });
    }
  });

  const decodedToken=jwt.decode(token,{complete:true});
  const userId= decodedToken.payload.id;

  User.findOne({_id:userId})
        .then((user)=>{ 
            if(!user){
            throw new Error ("user not found")
            }
            const userType=user.role;
            if(userType!=="user"){
                return res.status(401).json({
                message: "you are not authorised to access this endpoint",
             });
                  
            }
          next();

        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
              message: "An error occurred while processing your request",
            });
          });
        
          
    }