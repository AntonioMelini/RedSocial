const {Router} = require('express');

const response= require('../../../../network/response')
const postRouter=Router();
const controller = require('./index')
const secure=require('../user/secure')


postRouter.get('/',async(req,res)=>{
    try {
        
        
        
            console.log('entro a /post de los posts');
            let data= await controller.list();
            response.success(req,res,data,200)
        
       
    } catch (error) { 
        response.error(req,res,error.message,error.code)
    }
})
postRouter.post('/',async(req, res)=>{
    try {
        console.log("entro a /create");
        const body=req.body
      
        if( body.text && body.userId ){
         await controller.upsert(body)
        
        response.success(req,res,"posting was succed",200);
        }else response.error(req,res,'send valid params',400)
    } catch (error) {
        
        response.error(req,res,error.message,500)
    }
    
})
postRouter.get('/getOne/:id',async(req, res)=>{
    try {
       // console.log("entro a /remove");
        const {id}=req.params
       
        if(id.trim()!="" ){
        let x=await controller.getOne(id)
        response.success(req,res,x,200);
        }else response.error(req,res,'send valid id',400)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
    
})


postRouter.put('/',secure('post'),async(req,res)=>{
    try {
       console.log("entro a /update");
        const body=req.body
      
        if(body.id && body.text  ){
          // console.log(body.text);
        await controller.update(body.id,body.text)
       // let x= await controller.list()
        response.success(req,res,'user editation was completed',200);
        }else response.error(req,res,'send valid params',400)
    } catch (error) {
        console.log("aparecio un error");
        
        response.error(req,res,error.message,error.statusCode)
    }
})
postRouter.get('/remove/:id',async(req, res)=>{
    try {
       // console.log("entro a /remove");
        const {id}=req.params
       
        if(id ){
        let x=await controller.remove(id)
        if (x.affectedRows) {
            return response.success(req,res,"post elimination was succed",200); 
        }
        response.error(req,res,"post with that id does´t exist",400)
        
        }else response.error(req,res,'send valid id',400)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
    
})

module.exports= postRouter;