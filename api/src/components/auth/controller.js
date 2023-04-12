const jwtAuth = require('../../../../authentication')
const bcrypt = require('bcrypt')
const TABLA='auth'
const response= require("../../../../network/response")

module.exports= function (injectedStore) {
    let store = injectedStore
    if(!store){
        store = require('../../../../store/remote-mysql')
    }


    const login=async (username,password)=>{
        
            console.log('entro a controler login');
        let data= await store.query('login',username,password)
        console.log("esta es la data",data);
        if (data.length===237) return data
         throw new Error(data)
        
       
        
        
    }



    const upsert=async (data)=>{
        console.log("entro a auth upsert");
        const authData = {
            
            username:data.username,
            password:""
        }
            authData.password =await bcrypt.hash(data.password,5)
        //console.log(authData);
        return store.upsert(TABLA,authData)
    }


    const changeAuth= async (data)=>{
        //console.log(data,"esta es la data");
        let obj={
            id:data.id
        }
        if(data.password){
            let newPassword = await bcrypt.hash(data.password,5)
            obj.password=newPassword;
        }
        if(data.username) obj.username=data.username;

        return store.changeAuth(obj,TABLA)



        
       
    }


    return {
        upsert,
        login,
        changeAuth
    }
    
}

