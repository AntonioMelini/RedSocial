require('dotenv').config();
const {API_PORT,REDIS_PASSWORD,REDIS_HOST,REDIS_PORT,CACHE_SERVICE_HOST,CACHE_SERVICE_PORT,CACHE_SERVICE,CACHE_PORT,POST_PORT,MYSQL_SERVICE_PORT,JWT_SECRET,MYSQL_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DATABASE} = process.env


module.exports = {
    api:{
        port: API_PORT  || 3000,
    },
    post:{ 
            port:POST_PORT
    },
    cache:{ 
        port:CACHE_PORT
},
    jwt: {
        secret: JWT_SECRET
    },
    mysql:{
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
    },
    mysqlService:{
        host: MYSQL_HOST,
        port: MYSQL_SERVICE_PORT
    },
    cacheService:{
        host: CACHE_SERVICE_HOST,
        port: CACHE_SERVICE_PORT
    },
    redis:{
        password:REDIS_PASSWORD,
        port:REDIS_PORT,
        host:REDIS_HOST
    }
}