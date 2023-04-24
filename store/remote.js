//const axios = require('axios');
const request = require('request')

function createRemoteDB ( host, port ){
    console.log("entroooo");
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
        console.log("esto recibe remote.js ",tabla,data);
        return req('POST', tabla,data)
    }
    function follow (tabla,userFrom,userTo){
        console.log("esto recibe follow en remote",tabla,{userFrom,userTo});

        return req('POST',tabla,{userFrom,userTo})
    }
    function listOne(tabla,id,prop){
        console.log("getOne datos",tabla,id,prop);

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
           // console.log("body sin json.parse",body);
           body=JSON.parse(body);
            console.log("!!!!!!!!! esto es body ya !!!!!",body);
            if (err || body.error) {//
              // console.log(err,body.body);
                console.error("Error con base de datos remota",body.body)
                return rejected( body)
            }else{
                //console.log("esto es el body",JSON.parse(body));
           // const resp = JSON.parse(body);
            return resolve(body.body)
            }
            

        })
    })
}

return {
    list,
    upsert,
    query,
    follow,
    listOne,
    followers,
    remove
}
}
module.exports = createRemoteDB;






