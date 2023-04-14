const orderRoute=require('../controller/order.controller');

const authorizationChecked=require('../middleware/authorization');

const authenticationChecked=require('../middleware/authentication');

module.exports=function (app){
    app.post('/orders',authorizationChecked.checkUser,orderRoute.userOrder)
}