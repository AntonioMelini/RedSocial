
const TABLA='users';
const auth= require('../auth/index')

module.exports= function (injectedStore, injectedCache) {
    let store = injectedStore
    let cache = injectedCache
    if(!store){
        store = require('../../../../store/remote-mysql')
    }
    if (!cache){
        cache=require('../../../../store/remote-cache')
    }

   


async function list(){
   // console.log("entroa  controller list");
    let users = await cache.list(TABLA);
    if (!users){
        console.log("no estaba en cache !!");
        users=await store.list(TABLA);
        //console.log("$#$%"%"#% esto es users %&$ :",users);
        await cache.upsert(TABLA,users)
    }
    else{
        console.log("!!!!!!!!!Estos datos ya estaban en el cache !!!! ");

    }
    //console.log("que quilobo, esto es users :", users);
    return users;
   
}


async function getOne(id){
    console.log("entro a getOne controller : ",id);
    let user = await cache.getOne(TABLA,id)
  
    if(!user){
        console.log("!!!! los datos no estaban en el cache !!");
        user= await store.getOne(TABLA,id,"id")
        console.log("esto deberia tener el cache en el futuro :", user);
        await cache.upsert(TABLA,user)
    }else{
        console.log("!!!!!!! ya estaba en CACHE!!!!!");
    }
    //console.log("get one users controler");
    return user
}
async function upsert(body){
    console.log("entro a upsert");
    
    return await store.upsert(TABLA,body); 
}


async function update(body){
   // console.log(body,"este es el body");
     if(body.password || body.username)  await auth.changeAuth(body)
     if(body.username || body.name)  await store.changeUser(body,TABLA)
     
      
     


}


function remove(id){
    console.log("entro a remove controler",id);
    return store.remove(TABLA,id);

}



async function followin(id){
    console.log("entro a controler following",id);
    let following = await cache.list("user_follow")
    console.log("DEVOLUCION de cache.getone : ",following);
    if(!following){
        console.log("!!!!!!! NO ESTABA EN CACHE !!!!!!!!",following);
        following = await store.followin(id)
        console.log("USUARIO AL  que buscamos : ",following);
        following.length ? await cache.upsert("user_follow",following) : null
        
    }else{
        console.log("!!!!!!! YA ESTABA EN CACHE !!!!!!! ");
    }
    return following

}

function follow(tabla,userFrom,userTo){
    console.log("entroa  controller follow :",tabla,userFrom,userTo);
    return store.follow(tabla,userFrom,userTo);
}
async function followers(id){
    console.log("esto es controller user followers",id);
    let followers= await cache.list("user_follow")
    if(!followers){
        console.log("!!!!! NO ESTABA EN CACHE !!!!!");
        followers = await store.followers('followers',id)
        console.log("USUARIOS A LOS  que buscamos : ",followers);
        followers.length ? await cache.upsert("user_follow",followers) : null
    }else{
        console.log("!!!!!! YA ESTABA EN CACHE !!!!!");
    }
    return followers
}


return {
    list,
    getOne,
    upsert,
    remove,
    update,
    follow,
    followers,
    followin
}
}
