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
            body=JSON.parse(body)
            if (err || body.error) {
               
                console.error("Error con base de datos remota",err || body.body)
                return rejected(err || body)
            }else{
                console.log("esto es el body",JSON.parse(body));
            const resp = JSON.parse(body);
            return resolve(resp.body)
            }
            

        })
    })
}

return {
    list,
    upsert,
    query
}
}
module.exports = createRemoteDB;






