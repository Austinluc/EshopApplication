const authRoute=require('../controller/auth.controller');

const addressRoute=require('../controller/address.controleller');

const authenticationChecked=require('../middleware/authentication');


module.exports=function(app){
    app.post('/users',authRoute.signup);

    app.post('/auth',authRoute.login);

}