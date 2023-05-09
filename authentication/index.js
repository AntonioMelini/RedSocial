const response=require("../network/response")
const jwt=require('jsonwebtoken');
const config = require('../config');




const tokenSign= (user)=> {
   // console.log('entro a jwt');
    return jwt.sign(user, config.jwt.secret)
}

// const verify= (token)=>{
//   //  console.log('entro a verify',token);
//     return jwt.verify(token, config.jwt.secret)
// }

const antonio=(req,res,owner)=>{
    try {
        let x='';
        console.log("entro a la funcion antonio",owner);
        const authorization= req.headers.authorization || '';
        if(!authorization) throw new Error('no hay token');
    
        if(authorization.indexOf('Bearer ') === -1) throw new Error('Formato invalido',401)

        let token = authorization.split(' ')[1]; 
        let tokenListo= jwt.verify(token, config.jwt.secret)
        //console.log(tokenListo.id,owner);
        //console.log(tokenListo.id ==owner);
        if(tokenListo.id != owner){
            //throw new Error('no puedes modificar otro usuario',401)
            
             return x=new Error('no puedes modificar otro usuario')
            
        }
        req.user=tokenListo
       
        return x=200
       
    } catch (error) {
        console.log("este es el error",error);
         return error.message
    }
        
   
    
}
const logged=(req,res)=>{
    try {
        let err=false;
        console.log("entro a la funcion logged");
        const authorization= req.headers.authorization || '';
        if(!authorization) throw new Error('no hay token'); 
    
        if(authorization.indexOf('Bearer ') === -1) throw new Error('Formato invalido',401)

        let token = authorization.split(' ')[1]; 
        let tokenListo= jwt.verify(token, config.jwt.secret)
        console.log("este es el token listo",tokenListo);
        req.user=tokenListo
        return err;
        
        }catch(error){
         console.log("este es el error",error.message);
         return error
        //response.error(req,res,error.message,401)
    }
    
       
        //console.log(tokenListo.id,owner);
        //console.log(tokenListo.id ==owner);
       
}

// const check = {
//     own: (req, owner)=>{
//        // console.log('/n entro a check');
//         const decoded=decodeHeader(req);
//        // console.log(decoded);
//     }
// }

// const getToken= (auth)=>{
//     //console.log('entro a get token',auth);
//     if(!auth) throw new Error('no hay token');
    
//     if(auth.indexOf('Bearer ') === -1) throw new Error('Formato invalido')

//     let token = auth.split(' ')[1];
//     //console.log(token);
//     return token;

// }

// const decodeHeader=(req)=>{
//     //console.log('entro a decoheader');
//     const authorization = req.headers.authorization || '';
//     const token = getToken(authorization);
//     const decoded = verify(token);

//     req.user = decoded;
//     return decoded;
// }
module.exports={
    tokenSign,
    // decodeHeader,
    // getToken,
    // check,
    // verify,
    antonio,
    logged


};