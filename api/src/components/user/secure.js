const auth = require('../../../../authentication')


module.exports = function checkAuth  (action){
    const middleware = (req,res,next)=>{
        switch(action){
            case 'update':
                // const owner = req.body.id;
                // auth.check.own(req, owner);
                let a=auth.antonio(req,res,req.body.id || req.params.id)//verifica si hay errores de verificacion
                if(!a)next();// si no hay error next
                break;
            case 'follow':
                let c=auth.logged(req,res);
                if(!c)next();
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