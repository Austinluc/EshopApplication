

const Product = require("../models/productSchema");

const querystring=require('querystring');


exports.saveproduct =async (req,res)=>{

    try{
        const newProduct=await Product.create({
            name:req.body.name,
            manufacturer:req.body.manufacturer,
            category:req.body.category,
            image_url:req.body.image_url,
            price:req.body.price,
            availableitems:req.body.availableitems,
            description:req.body.description
        })
        res.status(201).json({
            _id: newProduct._id,
            name: newProduct.name,
            price: newProduct.price,
            category: newProduct.category,
            description: newProduct.description,
            manufacturer: newProduct.manufacturer,
            availableItems: newProduct.availableItems,
            created: newProduct.created,
            updated: newProduct.updated,
          });
    }
    catch(err){
        res.status(500).send({
            status:"fail",
            err:err
        })
    }
 }

 // search the product

exports.searchProduct=async (req,res)=>{
    try{
        const queryobj={...req.query};
        const excludedFields=["sortby","direction"];
        excludedFields.forEach((element) => delete queryobj[element])
            
       let query = Product.find(queryobj);
       
       if(req.query.sortby){
        if(req.query.direction==='ASC'){
            query= query.sort(req.query.sortby)

        }else if(req.query.direction==='DESC'){
              
            query= query.sort("-"+req.query.sortby)
        }
       }

       const products = await query;

       res.status(200).send({
          status:"success",
          products
       });
    }
    catch(err){
        console.log("err",err);
        res.status(500).send({
            message:"some error is occur"
        })
    }

};

//get product by category

exports.getProduct=async (req,res)=>{
    try{
        const retreiveCategory=await Product.distinct('category');

        if(!retreiveCategory || retreiveCategory.length===0){
           return  res.status(200).send([]);
        }
        res.status(200).send({
            message:"Successfully retreive the category",
            retreiveCategory
        })
    }
    catch(err){
        console.log("error",err)
        res.status(500).send({
            message:"some error is occured"
        })
    }
}

//get product by Id

exports.getById=async (req,res)=>{
    try{
        const retreiveProductbyId=await Product.findById(req.query.id);

        if(!retreiveProductbyId || retreiveProductbyId.length===0){
           return res.status(404).send({
            message:"no product found"
           });
        }
        res.status(200).send({
            message:"product retreive successfully by id",
            retreiveProductbyId
        })
    }
    catch(err){
        console.log("error",err)
        res.status(500).send({
            message:"some error is occured"
        })
    }
}

//update the product
exports.updateProductDetails=async (req,res)=>{
    try{
        const id=req.query.id;

        const updates={
            name:req.body.name,
            manufacturer:req.body.manufacturer,
            category:req.body.category,
            image_url:req.body.image_url,
            price:req.body.price,
            availableitems:req.body.availableitems,
            description:req.body.description
        }
        if(!updates){
            return res.status(400).send({
                message:'product data is required'
            })
        }
        const updateProduct=await Product.findByIdAndUpdate(id,updates);

        if(!updateProduct||updateProduct.length===0){
           return  res.status(400).send({
                message:'no product found for given id'
            })
        }
           res.status(200).send({
             status:'success',
             data:{
                updateProduct,
             }
           })
    }
    catch(err){
        console.log("error",err)
        res.status(500).send({
            message:"some error is occured"
        })
    }
}

//delete the product by given id
exports.DeleteProducts=async (req,res)=>{
    try{
        const id=req.query.id;

       
        const DeleteProduct=await Product.findByIdAndDelete(id);

        if(!DeleteProduct||DeleteProduct.length===0){
           return  res.status(400).send({
                message:'no product found for given id'
            })
        }
           res.status(200).send({
             status:'success',
             data:{
                DeleteProduct,
             }
           })
    }
    catch(err){
        console.log("error",err)
        res.status(500).send({
            message:"some error is occured"
        })
    }
}
    


