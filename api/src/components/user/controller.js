
const TABLA='users';
const auth= require('../auth/index')

module.exports= function (injectedStore) {
    let store = injectedStore
    if(!store){
        store = require('../../../../store/remote-mysql')
    }

   


async function list(){
    console.log("entroa  controller list");
    return  store.list(TABLA);

   
}


function getOne(id){
    console.log("get one users controler");
    return store.listOne(TABLA,id,"id");
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
function followin(id){
    console.log("entro a followin de controler",id);
    return store.followin('user_follow',id)

}

function follow(tabla,userFrom,userTo){
    console.log("entroa  controller follow");
    return store.follow(tabla,userFrom,userTo);
}
async function followers(id){
    console.log("esto es controller user followers",id);
    return store.followers('followers',id)
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
