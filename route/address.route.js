

const addressRoute=require('../controller/address.controleller');

const authorizationChecked=require('../middleware/authorization');

const authenticationChecked=require('../middleware/authentication');

module.exports=function (app){
    app.post('/addresses',authenticationChecked.verifytoken,authorizationChecked.checkUser,addressRoute.Address);
}
