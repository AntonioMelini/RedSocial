
const redis = require('redis');

const client = redis.createClient({
    // host: config.cacheService.dbHost,
    // port: config.cacheService.dbPort,
    // password: config.cacheService.dbPass
    url: `redis://default:ddiSGAgm94zmWcYnDC4TrnK4fDD4fV67@redis-12050.c293.eu-central-1-1.ec2.cloud.redislabs.com:12050`
  });
  
  (async () => {
    await client.connect();
    console.log('Conectado a REDIS');
  })();


// const redis = require('redis');
// const client = redis.createClient({
//     socket: {
//         host: 'redis-12050.c293.eu-central-1-1.ec2.cloud.redislabs.com',
//         port: '12050'
//     },
//     username: "default",
//     password: 'ddiSGAgm94zmWcYnDC4TrnK4fDD4fV67'
// });





//client.connect().catch(err=>console.error(err))



async function list (tabla){
console.log("entro a list de redis :", tabla);
    let value = await client.get(tabla)
   // console.log("esto devuelve value",value);
    return JSON.parse(value)
    
}
async function getOne (tabla,id){
    console.log("entro a getOne de redis :", tabla,id);
    let value = await client.get(`${tabla}_${id}`)
    //console.log("esto devuelve value",value);
    return JSON.parse(value)
}
async function upsert(tabla,data){
    console.log("estamos en redis upsert:  ",tabla,data);
    let key = tabla;
    if (data && data.length==1 && data[0].id) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!entroooo!!!!!!!!!!!!!!! :",data[0].id);
      key += '_' +data[0].id;
    }
    console.log("esta es la KEY : ",key);
    let redisDATA=await client.setEx(key,15,JSON.stringify(data));
    console.log("REDIS DATA:",redisDATA);
    return true;
}
module.exports={
    list,
    getOne,
    upsert
}