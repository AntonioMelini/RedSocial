exports.success =function(req,res,message='todo okey',status=200){
    res.status(status).send({
        error:false,
        status: status,
        body: message,
    })
}

exports.error =function(req,res,message='internal error',status=500){
    res.status(status).send({
        error:true,
        status: status,
        body: message,
    })
}