const db= {
    user:[
        {id:'1',name:'antonio'},
        {id:'2',name:'pedro'},
        {id:'3',name:'juana'},
        {id:'4',name:'maria'}
    ]
    
}

    async function list (tabla){
        return db[tabla]
    }


    async function get(tabla,id){
        let col= await list(tabla)
        return col.filter(item=>item.id===id) || null
    }
    async function upsert(tabla,data){
        if(!db[tabla]){
            db[tabla]=[];
        }
        db[tabla].push(data)
        console.log(db);
        //return data
    } 
    async function query(tabla,username){
        //console.log('entro a query');
        let col= await list(tabla);
   
        return col.filter(item=>item.username==username )[0] || null 
        
    }
    async function updateUserPassword (user,tablaPassword,tablaUser){
        let authUser={
            id:user.id,
            username:user.username,
            password:user.password
        }
        let dbUser={
            id:user.id,
            username:user.username,
            name:user.name,
        }
        console.log("hasta aca",tablaPassword,tablaUser);

        if(tablaPassword && tablaUser){
            console.log("entro");
            
            
            
            db[tablaPassword]=db[tablaPassword].map((usuario)=>{
               
                if(usuario.id===user.id){
                    usuario=authUser
                    
                }
                //onsole.log(usuario);
                  return usuario
            })



            db[tablaUser]=db[tablaUser].map((usuario)=>{
               // console.log(usuario.id===user.id);
                if(usuario.id===user.id){
                    usuario=dbUser
                }
                 return usuario
            })
            console.log("user id",user.id);
            console.log("los de auth");
            console.log(db[tablaPassword]);
            console.log("los de users");
            console.log( db[tablaUser])
        }
        else
        {
            console.log('papapapap');
            db[tablaPassword]=db[tablaPassword].map((usuario)=>{
                if(usuario.id===user.id){
                    usuario.password=authUser.password
                }
                return usuario
            })
            console.log( db[tablaPassword])
        }
    }
    async function remove(tabla,id){
        console.log("entro a remove store",id);
        db[tabla]= db[tabla].filter(users=>users.id!==id)
        return db[tabla]
    }

module.exports={
    list,
    get,
    upsert,
    remove,
    query,
    updateUserPassword
}