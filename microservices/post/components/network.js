const {Router} = require('express');

const response= require('../../../network/response')
const postRouter=Router();
const controller = require('./index')
const secure=require('../../../api/src/components/user/secure')


postRouter.get('/',async(req,res)=>{
    try {
        
        
        
            console.log('entro a /post de los posts');
            let data= await controller.list();
           
            response.success(req,res,data,200)
        
       
    } catch (error) { 
        response.error(req,res,error.message,error.code)
    }
})
postRouter.post('/',secure('update'),async(req, res)=>{
    try {
        console.log("entro a /create");
        const body=req.body
      //console.log("en create",);
        if( body.text && body.userId && body.userId==req.user.id){
         await controller.upsert(body)
        
        response.success(req,res,"posting was succed",200);
        }else response.error(req,res,'send valid params',400)
    } catch (error) {
        console.log("aca hay un error en network post");
        response.error(req,res,error.message,500)
    }
    
})
postRouter.get('/getOne/:id',async(req, res)=>{
    try {
       // console.log("entro a /remove");
        const {id}=req.params
       console.log("entro a getone de post");
        if(id.trim()!="" ){
        
        let x=await controller.getOne(id)
        response.success(req,res,x,200);
        }else response.error(req,res,'send valid id',400)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
    
})


postRouter.put('/:id',secure('post'),async(req,res)=>{
    try {
       console.log("entro a /update post");
        const body=req.body
        const {id}=req.params
      console.log(body);
        if(body.userId && body.text  && id){
           
        let x=await controller.update(body,id)
        console.log("esto devuelve x : ", x);
       // let x= await controller.list()
        return x ?   response.success(req,res,'user editation was completed',200):response.error(req,res,"post id is invalid",400);
        }else response.error(req,res,'send valid params',400)
    } catch (error) {
        console.log("aparecio un error");
        
        response.error(req,res,error.message,error.statusCode)
    }
})
postRouter.delete('/:id',secure('follow'),async(req, res)=>{
    try {
       console.log("entro a /remove");
        const {id}=req.params
       
        if(id ){
        let x=await controller.remove(id,req.user.id)
        console.log("esto devuelve el coso",x);
        // if (x.affectedRows) {
             return response.success(req,res,"remove was succed",200); 
        // }
        //response.error(req,res,"post with that id does´t exist",400)
        
        }else response.error(req,res,'send valid id',400)
    } catch (error) {
        console.log("entro a error de remove post ",error);
        response.error(req,res,error.body,500)
    }
    
})

module.exports= postRouter;





