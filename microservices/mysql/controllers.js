const response=require('../../network/response');
const store = require('../../store/mysql')
const bcrypt = require('bcrypt');
const jwtAuth = require('../../authentication')

const getAll=async (req,res,next)=>{
    try {
        console.log("entro a get all microservice");
        const {tabla}=req.params;
        if(tabla){
            
            let data = await store.list(tabla)
            data && response.success(req,res,data,200) 
        }else{
            response.error(req,res,'please send a valid table',400);
        }
    } catch (error) {
        
        response.error(req,res,error.message,500)
    }
}
const getOne=async (req,res,next)=>{
    try {
        console.log("entro a getOne microservice");
        const {tabla,id}=req.params;
        if(tabla && id){
            if(tabla==='user_follow'){
                let data = await store.listOne(tabla,id,'id')
                return response.success(req,res,data,200) 
            }
            let data = await store.listOne(tabla,id,'id')
            data.length ? response.success(req,res,data,200) 
            : response.error(req,res,'invalid id',400)
        }else{
            response.error(req,res,'please send a valid table',400);
        }
    } catch (error) {
        
        response.error(req,res,error.message,500)
    }
}
const createFollow = async (req,res,next)=>{
    try {
        if(req.user.id && req.params.id && req.user.id!= req.params.id){
            console.log(req.params.id,req.user.id);
            let x = await store.follow(req.user.id,req.params.id)
            x.affectedRows ? response.success(req,res,"follow was succed",200) :
            response.error(req,res,"invalid info",400)
            
        }else{
            response.error(req,res,"invalid information",401)
        }
    } catch (error) {
        response.error(req,res,error.message,500)
    }
}
const create=async (req,res,next)=>{
    try {
        console.log("entro a create de microservixce");
        const {tabla}=req.params;
        const body= req.body
       
        console.log(tabla,body);
        if(tabla){
            if(tabla=='users' && body.password && body.username && body.name){
                console.log('entro a users');
                let password = await bcrypt.hash(body.password,5)
                let x=await store.upsert('auth',{username:body.username,password})
               
                await store.upsert(tabla,{id:x.id,username:body.username,name:body.name})
                return response.success(req,res,"upsert was succed",201);
            
            }else if(tabla=='login' && body.password && body.username){
               
                    console.log("entro a login de microservice");
                    let data = await store.query('auth',body.username);
                    data= JSON.parse(JSON.stringify(data));
                    let passwordPerfect = await bcrypt.compare(body.password,data.password)
                    
                    if(passwordPerfect){
                        let token= jwtAuth.tokenSign(data)
                       
                        return response.success(req,res,token,200)
                    }
                    console.log("esta todo roto");
                    return response.error(req,res,"password incorrect",400)
                
            }else if(tabla=='post' && body.text && body.userId){
                await store.upsert(tabla,{text:body.text,userId:body.userId});
                return response.success(req,res,"upsert was succed",201);
            
            }

        }else{
            response.error(req,res,'please send a valid table',400);
        }
    } catch (error) {
        //console.log(error);
        response.error(req,res,error,500)
    }
}
const update= async (req,res,next)=>{
    try {
        const {tabla}=req.params;
        const body=req.body;
        console.log(body.id,req.user);
        if(tabla==='users'){
            if(body.id==req.user.id ){
                if(body.password || body.username){
                    body.password ? body.password= await bcrypt.hash(body.password,5):null;
                    await store.changeAuth(body,'auth');
                    
                }
                if(body.name || body.username ){
                    await store.changeUser(body,tabla);
                   
                }

            } else{
                response.error(req,res,"you can't modify another user",401)
            }
            // password name username 
           
        } 
        if( tabla==='post'){
            if(body.userId==req.user.id)
               await store.updatePost(tabla,body.id,body.text) 

             else   throw new Error("you can't modify another user",401)
               
        }
        response.success(req,res,"update was succed",200)
        
    } catch (error) {
        response.error(req,res,error.message,500)
    }
}
const remove= async(req,res,next)=>{
    try {
        const {tabla,id}=req.params;
        const body=req.body

        if(tabla==='users' ){
            if( req.user.id==id){
                await store.remove('auth',id)
                 await store.remove(tabla,id);
               
                return response.success(req,res,'the remove was succed',200)
            }else throw new Error('invalid id');

        }
         else if(tabla==='post' ){
            if( req.user.id==body.userId){
                await store.remove(tabla,id)
                return response.success(req,res,'the remove was succed',200)
            }else throw new Error('invalid id');

        }
        else{
            throw new Error('invalid id');
        }




        // let data= await store.remove(tabla,id);
        // console.log(data);

    } catch (error) {
        response.error(req,res,error.message,500)
    }
}
const removeFollow= async (req,res,next)=>{
    try {
        const body=req.body
            if( req.user.id==body.User_from){
                
                let x =await store.removeFollow(body.User_from,body.user_to)
                x.affectedRows ? response.success(req,res,'remove was succed',200)
                : response.error(req,res,"invalid IDs",400)
            }else throw new Error('invalid id',401);

        
    } catch (error) {
        response.error(req,res,error.message,error.statusCode)
    }
}




module.exports={
    getAll,
    getOne,
    create,
    createFollow,
    update,
    remove,
    removeFollow
}