const {Router} = require('express');
const secure = require('./secure');
const response= require('../../../../network/response')
const router=Router();
const controller= require('./index');



router.get('/',async(req, res)=>{
    try {
        console.log("entro a '/' en user de api");
         let data=await controller.list();
         
        data= JSON.parse(JSON.stringify(data));
        console.log("esto es la data",data);
        response.success(req,res,data,200);
        
    } catch (error) {
        response.error(req,res,error.message,500)
    }
    
})

router.get('/follow/:id',secure('follow'),async(req,res)=>{
    try {
        console.log("entro a network follow");
        const {id}=req.params;
        if(id && id!= req.user.id){
            let user= await controller.getOne(req.user.id)
        if(!user.length) throw new Error("Invalid user")
            let data=await controller.follow("user_follow",req.user.id,id)
            console.log("esto es el follow",data);
            response.success(req,res,data,200)
        }else{
            response.error(req,res,"please send a valid id",400) 
        }
    } catch (error) {
        console.log("este es el error que llega",error);
        response.error(req,res,error.body.sqlMessage ||error.message,401)
    } 
})
router.get('/follow',secure('follow'),async (req,res)=>{
    try {
        
        let data= await controller.followers(req.user.id)
        console.log("esto es controller user",data);
        response.success(req,res,data,200)
    } catch (error) {
        console.log("entro a error de follow",error);
        response.error(req,res,error.message,500)
    }
})
router.get('/followin',secure('follow'),async(req,res)=>{
    try {
        let x= await controller.followin(req.user.id);
        console.log("esto es lo que devolvio todo",x);
        x.length ? response.success(req,res,x,200) :  response.success(req,res,"not following´s users yet")
    } catch (error) {
        console.log("entro a error de followin de user");
        response.error(req,res,error.message,401)
    }
})

router.post('/create',async(req, res)=>{
    try {
        console.log("entro a /create");
        const body=req.body
      console.log("este es el body del network",body);
        if( body.name && body.username && body.password){
        let user=await controller.upsert(body)
        console.log("este es el user creado ",user);
        let x= await controller.list()
        response.success(req,res,x,200);
        }else response.error(req,res,'send valid params',400)
    } catch (error) {
        if(error.body.sqlMessage){
            return response.error(req,res,"username not available",400)
        }
        response.error(req,res,error.message,400)
    }
    
})
router.delete('/remove/:id',secure('update'),async(req, res)=>{
    try {
        console.log("entro a /remove de user");
        const {id}=req.params
       
        if(id ){
        await controller.remove(id)
        let x= await controller.list()
        response.success(req,res,x,200);
        }else response.error(req,res,'send valid id',400)
    } catch (error) {
        console.log("QUE ṔASO PA?",error);
        response.error(req,res,error.message,500)
    }
    
})
router.get('/get/:id',async(req, res)=>{
    try {
        console.log("entro a /:id");
        if(req.params.id){
        let data= await controller.getOne(req.params.id);
        //console.log("data al final",data);
        if(!data.length) return response.error(req,res,'can´t find ID',400)
        response.success(req,res,data,200);
        }else response.error(req,res,'send valid id',400)
    } catch (error) {
        console.log(error);
        response.error(req,res,error.body,500)
    }
    
})
router.put('/',secure('update'),async(req,res)=>{
    try {
       console.log("entro a /update");
        const body=req.body
      
        if(body.id  ){
           
        await controller.update(body)
       // let x= await controller.list()
        response.success(req,res,'user editation was completed',200);
        }else response.error(req,res,'send valid params',400)
    } catch (error) {
        console.log("aparecio un error");
        
        response.error(req,res,error.message,error.statusCode)
    }
})
module.exports =router;
//