const response=require('../../network/response');
const store = require('../../store/redis')


const getAll=async (req,res,next)=>{
    try {
        
        const {tabla}=req.params;
        if(tabla){
            console.log("entro a get all cache controller");
            let data = await store.list(tabla)
            console.log("esta es la data de getAll cache controller", data);
          //   return !data ? null : data
            data && Object.entries(data).length ? response.success(req,res,data,200) : res.send(null)
            //data?.length ? response.success(req,res,data,200) : response.success(req,res,"nothing upload yet",200) 
        }else{
          response.error(req,res,"please send valid params")
        }
    } catch (error) {
        //return null
        response.error(req,res,error.message,500)
    }
}
const getOne=async (req,res,next)=>{
    try {
        const {tabla,id}=req.params;
        console.log("entro a getOne cache CONTROLLER : ",tabla,id);
        
        if(tabla && id){
            
            let data = await store.getOne(tabla,id)
            console.log("esto devuelve getOne de redis :", data);
          return  data && Object.entries(data).length ? res.send(data) : res.send(null)
        }else{
            response.error(req,res,"send valid params",500)
        }
    } catch (error) {
        response.error(req,res,'please send a valid table',400);
        response.error(req,res,error.message,500)
    }
}
//  const createFollow = async (req,res,next)=>{
//     try {
//         if(req.user.id && req.params.id && req.user.id!= req.params.id){
//             console.log(req.params.id,req.user.id);
//             let x = await store.follow(req.user.id,req.params.id)
//             x.affectedRows ? response.success(req,res,"follow was succed",200) :
//             response.error(req,res,"invalid info",400)
            
//         }else{
//             response.error(req,res,"invalid information",401)
//         }
//     } catch (error) {
//         response.error(req,res,error.message,500)
//     }
// }
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
        console.log("entro a create de cache contro");
        const {tabla}=req.params;
        const body= req.body
       if(tabla && body){
        console.log(tabla,body);
        let data=await store.upsert(tabla,body)
        //console.log("esto da store.upsert :",data);
        console.log("esta es la data:",data);
        return  data ? res.send(true) : res.send(false)
       }
       return response.error(req,res,"no se pudo agregar nada",400)
        
    } catch (error) {
        console.log("algo anda mal en upsert");
        response.error(req,res,error,500)
    }
 }

const followin= async (req,res)=>{
    try {
        console.log("entro a followin de microservice cache",req.body);
        
        let x=await store.list(req.body.id)
        response.success(req,res,x,200)
        
    } catch (error) {
        response.error(req,res,error.message,400)
    }
}

// const update= async (req,res,next)=>{
//     try {
//         const {tabla}=req.params;
//         const body=req.body;
//         console.log(body);
//         if(tabla==='users'){
//             console.log("entro a update de user en microservices controller");
            
//                 if(body.password || body.username){
//                     console.log(" se hace el hash de la password");
//                     body.password ? body.password= await bcrypt.hash(body.password,5):null;
//                     await store.changeAuth(body,'auth');
                    
//                 }
//                 if(body.name || body.username ){
//                     await store.changeUser(body,tabla);
                   
//                 }

             
//             // password name username 
           
//         } 
//         if( tabla==='post'){

//             console.log("entro a update de post en microservices controller");
//             if(body.userId==req.user.id)
//                await store.updatePost(tabla,body.id,body.text) 

//              else   throw new Error("you can't modify another user",401)
               
//         }
//         response.success(req,res,"update was succed",200)
        
//     } catch (error) {
//         response.error(req,res,error.message,500)
//     }
// }
//  const remove= async(req,res,next)=>{
// //     try {
// //         console.log("entro a remove de microservice");
// //         const {tabla,id}=req.params;
// //         const body=req.body
// //         console.log(tabla,id,body.id);
// //         if(tabla==='users' ){
            
// //                 await store.remove('auth',id)
// //                 await store.removeAll('post',"userId",id)
// //                 await store.removeAll('user_follow',"User_from",id)
// //                  await store.remove(tabla,id);
               
// //                 return response.success(req,res,'the remove was succed',200)
            

// //         }
// //          else if(tabla==='post' ){
// //            console.log("entro a post de microservice");
// //                 await store.remove(tabla,id,body.id)
                
// //                 return response.success(req,res,'the remove was succed',200)
          

// //         }
// //         else{
// //             throw new Error('invalid id');
// //         }




// //         // let data= await store.remove(tabla,id);
// //         // console.log(data);

// //     } catch (error) {
// //         console.log("entro a error de microservice controller",error.message);
// //         response.error(req,res,error.message,500)
// //     }
//  }
//  const removeFollow= async (req,res,next)=>{
// //     try {
// //         const body=req.body
// //             if( req.user.id==body.User_from){
                
// //                 let x =await store.removeFollow(body.User_from,body.user_to)
// //                 x.affectedRows ? response.success(req,res,'remove was succed',200)
// //                 : response.error(req,res,"invalid IDs",400)
// //             }else throw new Error('invalid id',401);

        
// //     } catch (error) {
// //         response.error(req,res,error.message,error.statusCode)
// //     }
//  }




module.exports={
    getAll,
    getOne,
    create,
    

 
   
    followers,
    followin
    

    
}