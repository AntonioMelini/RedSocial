
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
        return store.upsert(TABLA,body)
    }
    async function remove(idPost,id){ 
        return store.remove(TABLA,idPost,id)
    }
    async function update(id,text){
        //console.log(text);
        return store.updatePost(TABLA,id,text)
    }

    return{
        list,
        getOne,
        upsert,
        remove,
        update
    };

}