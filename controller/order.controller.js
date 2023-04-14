const jwt=require('jsonwebtoken');

const Order=require('../models/orderschema');

const Product=require('../models/productSchema');

const Address=require('../models/addressSchema');

const User=require('../models/userschema');


exports.userOrder=async (req,res)=>{
    
    try{
        const {productid,addressid}=req.body;
        let token =req.headers["x-auth-token"];

        const decodedToken=jwt.decode(token,{complete:true})
        const userId=decodedToken.payload.id;

        const user=await User.findOne({_id:userId});

        if(!user){
            return res.status(404).send({
                message:"user not found"
            })
        }
        const product=await Product.findOne({_id:productid});

        if(!product){
            return res.status(404).send({
                message:`No product  found for given id ${productid}`
            })
          
        }
        if(product.availableitems<=0){
            return res.status(400).send({
                message:`Product with ID ${productid} is currently out of stock!`
            })
        }
        const address=await Address.findOne({_id:addressid});
        
        if(!address){
            return res.status(404).send({
                message:`No address  found for given id ${addressid}`
            })
        }
        const newOrder=await Order.create({
            addressid:address._id,
            productid:product._id,
            quantity:req.body.quantity
        })
    
        res.status(200).send({
            id:newOrder._id,
            user:{user},
            product:{product},
            shippingAddress:{address},
            amount:product.price,
            orderdate: new Date(Date.now()),
        })
    }
    catch(err){
        console.log('error',err);
        res.status(500).send({
            message:"some error is occur while placing the order"
        })
    }
}