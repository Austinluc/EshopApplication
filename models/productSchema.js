const mongoose=require('mongoose');
// const { double } = require('webidl-conversions');

const productSchema=new mongoose.Schema({
    direction:{
        type:String,
       
        default:"ASC"
    },
    sortby:{
        type:String,
    },
    availableitems:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        immutale:true,
        default:()=>{
            return Date.now()
        }
    },
    description:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
       
    },
    manufacturer:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    updated:{
        type:Date,
        immutale:true,
        default:()=>{
            return Date.now()
        }
    }

});

module.exports= mongoose.model("product",productSchema);