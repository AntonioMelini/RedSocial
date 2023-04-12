
const TABLA='post'

module.exports = function (injectedStore){
    let store = injectedStore
    if(!store) store= require('../../../store/mysql')

    async function list(){
        console.log("entro a controller list");
        return store.list(TABLA)
    }
    async function getOne(id){
        return store.listOne(TABLA,id,"id")
    }

    async function upsert(body){
        return store.upsert(TABLA,body)
    }
    async function remove(id){
        return store.remove(TABLA,id)
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