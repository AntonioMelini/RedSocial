const auth = require('../../../../authentication')
const response= require('../../../../network/response')

module.exports = function checkAuth  (action){
    const middleware = (req,res,next)=>{
        switch(action){
            case 'update':
                // const owner = req.body.id;
                // auth.check.own(req, owner);
                let a=auth.antonio(req,res,req.body.id || req.body.userId || req.params.id)//verifica si hay errores de verificacion
                console.log("esto es a",a);
                if(a==200)next();// si no hay error next
                else{response.error(req,res,a.message||a,401)}
                break;
            case 'follow':
                let c=auth.logged(req,res);
                console.log("esto es c",c);
                if(!c)next();
                else{response.error(req,res,c.message||c,401)}
               // console.log("no hay error");
                break;
            case 'post':
                let b=auth.antonio(req,res,req.body.userId)
                if(!b)next();
                break;
            default:
                next();
        }
    }
    return middleware
}