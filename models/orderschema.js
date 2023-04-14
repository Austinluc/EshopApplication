const mongoose=require('mongoose');


const orderSchema = new mongoose.Schema ({
    
    amount:{
        type:Number,
        required:false
    },
    orderdate:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    },
    productid:{
        type:String,
        required:true
    },
    addressid:{
        type:String,
        required:true
    },
  
    quantity:{
        type:Number
    },
    accesstoken:{
        type:String
    }


});
module.exports= mongoose.model("order",orderSchema);