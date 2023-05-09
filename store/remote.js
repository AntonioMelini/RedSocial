//const axios = require('axios');
const request = require('request')

function createRemoteDB ( host, port ){
    console.log("create remote db conected");
    const URL =  `http://${host}:${port}`;
    
    function list (table) {
        console.log("entro a list de remote");
        return req('GET', table)
    }
    function query (tabla,username,password){
        console.log("esto es query en remote ",username,password)
       
        return req('POST',tabla,{username,password})
    }
    function upsert (tabla,data) {
        console.log("esto recibe upsert remote.js ",tabla,data);
        return req( "POST",tabla,data)
    }
    function follow (tabla,userFrom,userTo){
        console.log("esto recibe follow en remote",tabla,{userFrom,userTo});

        return req('POST',tabla,{userFrom,userTo})
    }
    function getOne(tabla,id,prop){
        console.log("getOne remote.js datos :",tabla,id,prop);

        return req('GET',`${tabla}/${id}`,{id,prop})
    }
    function followers(tabla,id){
        console.log("entro a followers de remote.js",tabla,id);

        return req('GET',tabla,{id})
    }
    function remove(tabla,idTable,id){
        console.log("entro a remove de remote.js ",tabla,idTable,id);

        return req('DELETE',`${tabla}/${idTable}`,{id})
    }
    function removeAll(tabla,id){
        console.log("entro a removeAll de remote.js ",tabla,id);

        return req('DELETE',`All/${tabla}`,{id})
    }

    function changeAuth(data,tabla){
        console.log("esto recibe update de remote.js",tabla,data);

        return req("PUT",'users',data)
    }
    function changeUser(data,tabla){
        console.log("esto recibe update de remote.js",tabla,data);

        return req("PUT",tabla,data)
    }
    function followin(id){
        console.log("entro a followin de remote.js");

        return req('GET',"followin",{id})
    }
    function updatePost(tabla,data){
        console.log("esto recibe update post de remote.js ",tabla,data);
    }

 function req (method, table, data){
    let url = URL +'/'+table;
    if(data)data = Object.keys(data).length !== 0 ? JSON.stringify(data) : '';
    body=data
    console.log("esta es la url",url);
     
    
    return new Promise((resolve,rejected)=>{
        request({
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            url,
            body
            

        },(err,req,body)=>{
           console.log("body sin json.parse",body);
           body= !body ? body : JSON.parse(body) ;
           // console.log("!!!!!!!!! esto es body ya !!!!!",body);
            if (err || body.error) {//
              // console.log(err,body.body);
                console.error("Error con base de datos remota",body.body)
                return rejected( body)
            }else{
               console.log("esto es el body",body);
           // const resp = JSON.parse(body);
            return resolve(body.body || body)
            }
            

        })
    })
}

return {
    list,
    upsert,
    query,
    follow,
    getOne,
    followers,
    remove,
    changeAuth,
    changeUser,
    updatePost,
    removeAll,
    followin
}
}
module.exports = createRemoteDB;






