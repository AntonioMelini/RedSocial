const mysql = require('mysql2');




const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    database: config.mysql.database,
    user: config.mysql.user,
    password: config.mysql.password,
    
};

//coneccion

let coneccion = mysql.createConnection(dbconf)

coneccion.connect((error)=>{
    if(error){
        throw error;
    }else{
        console.log("db conected");
    }
})


function list (tabla){
    
        return new Promise ((resolve,rejected)=>{
            coneccion.query(`SELECT * FROM Red_Social.${tabla}`,(err,data)=>{
                if(err) return rejected(err)
        
               resolve(data)
            })
        })
}
function listOne(tabla,id,prop){

        if(tabla==="user_follow"){
            return new Promise((resolve,rejected)=>{
                coneccion.query(`select * from Red_Social.${tabla} where user_to=${id}`,(err,datos)=>{
                    if(err) return rejected(err)

                    resolve(datos)
                })
            })
        }
        return new Promise ((resolve,rejected)=>{
            coneccion.query(`select * from Red_Social.${tabla} where ${prop}=${id}`,(err,datos)=>{

                if(err) return rejected(err)

                resolve(datos)
            })
        })
}



 function upsert(tabla,data){
    
    console.log("entroa a upsert de mysql");
    if(tabla==="auth"){

        return new Promise ((resolve,rejected)=>{

       // console.log(`insert into Red_Social.${tabla} (username,password) values(${data.username},${data.password})``);            
            coneccion.query(`insert into Red_Social.${tabla} set ?`,data,(error,datos)=>{
                if(error) return rejected(error);
                
                    resolve(datos)
                
                
            })
        })
        
    

    }else if(tabla==="users"){
        console.log("entro a la de users");
        return new Promise ((resolve,rejected)=>{
            coneccion.query(`insert into Red_Social.${tabla} set ?`,data,(error,datos)=>{
                if(error) return rejected(error);

                resolve(datos)
            })
        })
    }else{
        return new Promise((resolve,rejected)=>{
            coneccion.query(`insert into Red_Social.${tabla} set?`,data,(err,datos)=>{

                if (err) return rejected(err)

                resolve(datos)
            })
        })
    }
   
    
} 
async function query(tabla,username){
    //console.log('entro a query');
    let col= await list(tabla);
   // console.log(col.filter(item=>item.username==username )[0]);
    return col.filter(item=>item.username==username )[0] || null 
    
}
 function changeAuth (user,tabla){
    if(user.username && user.password){
        console.log("entro a username y password");
        return new Promise((resolve,rejected)=>{
            coneccion.query(`update Red_Social.${tabla} set username='${user.username}',password='${user.password}' where id='${user.id}'`,(error,data)=>{
                if(error) return rejected (error)

                resolve(data)
            })
        })
    }else if(user.username){
        console.log("entro a username");
        return new Promise((resolve,rejected)=>{
            coneccion.query(`update Red_Social.${tabla} set username='${user.username}' where id='${user.id}'`,(error,data)=>{
                if(error) return rejected (error)

                resolve(data)
            })
        })
    }else{
        console.log("entro solo a password");
        return new Promise((resolve,rejected)=>{
            coneccion.query(`update Red_Social.${tabla} set password='${user.password}' where id='${user.id}'`,(error,data)=>{
                if(error) return rejected (error)

                resolve(data)
            })
        })
    }
}

function changeUser(user,tabla){
    if(user.username && user.name){
        console.log("entro a username y name");
        return new Promise((resolve,rejected)=>{
            coneccion.query(`update Red_Social.${tabla} set username='${user.username}',name='${user.name}' where id='${user.id}'`,(error,data)=>{
                if(error) return rejected (error)

                resolve(data)
            })
        })
    }else if(user.username){
        console.log("entro a username");
        return new Promise((resolve,rejected)=>{
            coneccion.query(`update Red_Social.${tabla} set username='${user.username}' where id='${user.id}'`,(error,data)=>{
                if(error) return rejected (error)

                resolve(data)
            })
        })
    }else{
        console.log("entro solo a name");
        return new Promise((resolve,rejected)=>{
            coneccion.query(`update Red_Social.${tabla} set name='${user.name}' where id='${user.id}'`,(error,data)=>{
                if(error) return rejected (error)

                resolve(data)
            })
        })
    }
}

 function remove(tabla,id){
    
    return new Promise((resolve,rejected)=>{
        coneccion.query(`delete from Red_Social.${tabla} where id=${id}`,(error,data)=>{
            if(error) return rejected(error);
            
            resolve(data);
        })
    })
}


async function follow(userFrom,userTo){
    let users= await list("users");
    console.log(users);
    let userWanted= users.filter(user=>user.id==userTo)
    console.log(userWanted);
    if(userWanted.length){
        return new Promise((resolve,rejected)=>{
            coneccion.query(`insert into Red_Social.user_follow (User_from,user_to) values (${userFrom},${userTo})`,(err,data)=>{
                if(err) return rejected(err);

                resolve (data);
        })
    })
    }else{
        throw new Error('invalid id')
    }
}
 function removeFollow(userFrom,userTo){
   
    return new Promise((resolve,rejected)=>{
        coneccion.query(`delete from Red_Social.user_follow where User_from=${userFrom} && user_to=${userTo}`,(err,data)=>{
            if (err) return rejected(err)

            resolve(data)
        })
    })
}
function followers(id){
    
    return new Promise((resolve,rejected)=>{
        coneccion.query(`select * from Red_Social.users  join Red_Social.user_follow on Red_Social.user_follow.User_from=Red_Social.users.id  where user_to=${id}`,(err,data)=>{
            if(err) return rejected(err)

            resolve(data)
        })
    })
}
function updatePost(tabla,id,text){

    return new Promise((resolve,rejected)=>{
        coneccion.query(`update  Red_Social.${tabla} set text='${text}' where id=${id}`,(err,datos)=>{

            if (err) return rejected(err)

            resolve(datos)
        })
    })
}

//coneccion.end();
module.exports={
    list,
    remove,
    upsert,
    query,
    changeAuth,
    changeUser,
    follow,
    followers,
    listOne,
    updatePost,
    removeFollow

}

