
const authorizationChecked=require('../middleware/authorization');

const authenticationChecked=require('../middleware/authentication');

const productRoute=require('../controller/product.controller');

module.exports=function(app){
    app.post('/products',authenticationChecked.verifytoken,authorizationChecked.checkAdmin,productRoute.saveproduct);

    app.get('/products',productRoute.searchProduct);

    app.get('/products/categories',productRoute.getProduct);

    app.get('/products/id',productRoute.getById);

    app.put('/products/id',authorizationChecked.checkAdmin,productRoute.updateProductDetails);

    app.delete('/products/id',authorizationChecked.checkAdmin,productRoute.DeleteProducts);
}