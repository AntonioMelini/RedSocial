
const TABLA='post'

module.exports = function (injectedStore){
    let store = injectedStore
    if(!store) store= require('../../../store/mysql')

    async function list(){
        console.log("entro a controller list");
        return store.list(TABLA)
    }
    async function getOne(id){
        console.log("entro a getone de controller post");
        return store.listOne(TABLA,id,"id")
    }

    async function upsert(body){ 
        console.log("entro a upsert de controller");
        return store.upsert(TABLA,body)
    }
    async function remove(idPost,id){ 
        console.log("controller remove",idPost,id);
        return store.remove(TABLA,idPost,id)
    }
    async function update(data){
        console.log("controller de post",data);
        return store.updatePost(TABLA,data)
    }

    return{
        list,
        getOne,
        upsert,
        remove,
        update
    };

}