const {Router} = require('express');
const secure = require('./secure');
const response= require('../../../../network/response')
const router=Router();
const controller= require('./index');



router.get('/',async(req, res)=>{
    try {
        console.log("entro a '/' en user de api");
        let data= await controller.list();
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
        if(id){
            let data=await controller.follow(req.user.id,id)
            response.success(req,res,data,200)
        }else{
            response.error(req,res,"please send an id",400)
        }
    } catch (error) {
        response.error(req,res,error.message,500)
    }
})
router.get('/follow',secure('follow'),async (req,res)=>{
    try {
        let data= await controller.followers(req.user.id)
        response.success(req,res,data,200)
    } catch (error) {
        response.error(req,res,error.message,500)
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
        if(error.body.sqlMessage=="Duplicate entry 'anto' for key 'auth.username_UNIQUE'"){
            return response.error(req,res,"username not available",400)
        }
        response.error(req,res,error.message,400)
    }
    
})
router.get('/remove/:id',async(req, res)=>{
    try {
       // console.log("entro a /remove");
        const {id}=req.params
       
        if(id ){
        await controller.remove(id)
        let x= await controller.list()
        response.success(req,res,x,200);
        }else response.error(req,res,'send valid id',400)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
    
})
router.get('/get/:id',async(req, res)=>{
    try {
        //console.log("entro a /:id");
        if(req.params.id){
        let data= await controller.getOne(req.params.id);
        if(!data.length) return response.error(req,res,'can´t find ID',400)
        response.success(req,res,data,200);
        }else response.error(req,res,'send valid id',400)
    } catch (error) {
        response.error(req,res,error.message,500)
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