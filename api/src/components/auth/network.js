const {Router} = require('express');
const response= require('../../../../network/response')
const authRouter=Router();
const controller= require('./index');


authRouter.post('/login',async (req,res)=>{
    try {
        //console.log('entro a /login');
        if(req.body.username && req.body.password){
        let token= await controller.login(req.body.username,req.body.password)
        
        response.success(req,res,token,200)
        }else response.error(req,res,"pls send valid info",400)
    } catch (error) {
        
        response.error(req,res,error.body,error.status)
    }
    
})

module.exports =authRouter