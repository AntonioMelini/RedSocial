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
            console.log("esta es la data de getAll microservice", data);
            data.length ? response.success(req,res,data,200) : response.success(req,res,"nothing upload yet",200) 
        }else{
            response.error(req,res,'please send a valid table',400);
        }
    } catch (error) {
        
        response.error(req,res,error.message,500)
    }
}
const getOne=async (req,res,next)=>{
    try {
        console.log("entro a getOne microservice MYSQL");
        const {tabla,id}=req.params;
        if(tabla && id){
            if(tabla==='user_follow'){
                let data = await ne(tabla,id,'id')
                return response.success(req,res,data,200) 
            }
            if(tabla=='post'){
                console.log("entro a post en microservice");
                let data = await store.getOne(tabla,id,'id')
                return response.success(req,res,data,200)
            }
            let data = await store.getOne(tabla,id,'id')
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
const followers = async (req,res,next)=>{
    try {
        
        console.log("entro a followers microservice:",req.body);
        let x = await store.followers(req.body.id)
        console.log("esto es el resultado: ",x);
        response.success(req,res,x,200)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
}
const create=async (req,res,next)=>{
    try {
        console.log("entro a create de microservixce");
        const {tabla}=req.params;
        const body= req.body
       
        //console.log(tabla,body);
        if(tabla){
            if(tabla=='users' && body.password && body.username && body.name){
                console.log('entro a users');
                let password = await bcrypt.hash(body.password,5)
                let x=await store.upsert('auth',{username:body.username,password})
             
                await store.upsert(tabla,{id:x.insertId,username:body.username,name:body.name})
                return response.success(req,res,"upsert was succed",201);
            
            }else if(tabla=='login' && body.password && body.username){
               
                    console.log("entro a login de microservice");
                    let data = await store.query('auth',body.username);
                    if(!data)  return response.error(req,res,"invalid username",400) 
                    console.log("esto es data en microservixce",data);
                   // data= JSON.parse(JSON.stringify(data));
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
            
            }else if(tabla=='user_follow' && body.userFrom && body.userTo){
                console.log("entro a user_follow");
                 await store.follow(tabla,body.userFrom,body.userTo)
                
                return response.success(req,res,"follow succed")
            }
 
        }else{
            response.error(req,res,'please send a valid table',400);
        }
    } catch (error) {
        //console.log(error);
        response.error(req,res,error,500)
    }
}

const followin= async (req,res)=>{
    try {
        console.log("entro a followin de microservice",req.body);
        let x=await store.followin(req.body.id)
        response.success(req,res,x,200)
        
    } catch (error) {
        response.error(req,res,error.message,400)
    }
}

const update= async (req,res,next)=>{
    try {
        const {tabla}=req.params;
        const body=req.body;
        console.log(body);
        if(tabla==='users'){
            console.log("entro a update de user en microservices controller");
            
                if(body.password || body.username){
                    console.log(" se hace el hash de la password");
                    body.password ? body.password= await bcrypt.hash(body.password,5):null;
                    await store.changeAuth(body,'auth');
                    
                }
                if(body.name || body.username ){
                    await store.changeUser(body,tabla);
                   
                }

             
            // password name username 
           
        } 
        if( tabla==='post'){

            console.log("entro a update de post en microservices controller");
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
        console.log("entro a remove de microservice");
        const {tabla,id}=req.params;
        const body=req.body
        console.log(tabla,id,body.id);
        if(tabla==='users' ){
            
                await store.remove('auth',id)
                await store.removeAll('post',"userId",id)
                await store.removeAll('user_follow',"User_from",id)
                 await store.remove(tabla,id);
               
                return response.success(req,res,'the remove was succed',200)
            

        }
         else if(tabla==='post' ){
           console.log("entro a post de microservice");
                await store.remove(tabla,id,body.id)
                
                return response.success(req,res,'the remove was succed',200)
          

        }
        else{
            throw new Error('invalid id');
        }




        // let data= await store.remove(tabla,id);
        // console.log(data);

    } catch (error) {
        console.log("entro a error de microservice controller",error.message);
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
    removeFollow,
    followers,
    followin
    

    
}