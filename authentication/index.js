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
        let x='';
        console.log("entro a la funcion antonio");
        const authorization= req.headers.authorization || '';
        if(!authorization) throw new Error('no hay token');
    
        if(authorization.indexOf('Bearer ') === -1) throw new Error('Formato invalido',401)

        let token = authorization.split(' ')[1]; 
        let tokenListo= jwt.verify(token, config.jwt.secret)
        //console.log(tokenListo.id,owner);
        //console.log(tokenListo.id ==owner);
        if(tokenListo.id != owner){
            //throw new Error('no puedes modificar otro usuario',401)
            x="1"
             response.error(req,res,'no puedes modificar otro usuario',401)
            return x;
        }
        return x;
   
    
}
const logged=(req)=>{
    
        console.log("entro a la funcion logged");
        const authorization= req.headers.authorization || '';
        if(!authorization) throw new Error('no hay token');
    
        if(authorization.indexOf('Bearer ') === -1) throw new Error('Formato invalido',401)

        let token = authorization.split(' ')[1]; 
        let tokenListo= jwt.verify(token, config.jwt.secret)
        req.user=tokenListo
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