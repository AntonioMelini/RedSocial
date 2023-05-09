
const TABLA='post'

module.exports = function (injectedStore,injectedCache){
    let store = injectedStore
    let cache = injectedCache
    if(!store) store= require('../../../store/remote-mysql')
    if (!cache) cache = require ('../../../store/remote-cache') 

    async function list(){
        console.log("entro a post controller list");
        let posts= await cache.list(TABLA);

        if(!posts){
            console.log("!!!!! NO ESTABA EN CACHE !!!!!");
            posts = await store.list(TABLA)
            await cache.upsert(TABLA,posts)
        }else{
            console.log("!!!!!!!!! YA ESTABAN EN CAHCE !!!!!!!!!!!!");
        }

        return posts
    }
    async function getOne(id){
        console.log("entro a getOne post controller ");
        
        let post= await cache.getOne(TABLA,id);

        if(!post){
            console.log("!!!!! NO ESTABA EN CACHE !!!!!");
            post = await store.getOne(TABLA,id,"id")
            if(!post) return null
            await cache.upsert(TABLA,post)
        }else{
            console.log("!!!!!!!!! YA ESTABAN EN CAHCE !!!!!!!!!!!!");
        }

        return post
    }

    async function upsert(body){ 
        console.log("entro a upsert de controller");
        return store.upsert(TABLA,body)
    }
    async function remove(idPost,id){ 
        console.log("controller remove",idPost,id);
        return store.remove(TABLA,idPost,id)
    }
    async function update(data,id){
        console.log("controller update de post",data);
        let hayDatos = await store.getOne(TABLA,id,"id")
        console.log("esto es haydatos : ",hayDatos.length);
        return !hayDatos.length ? null : store.updatePost(TABLA,id,data.text)
    }

    return{
        list,
        getOne,
        upsert,
        remove,
        update
    };

}