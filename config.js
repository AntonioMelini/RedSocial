require('dotenv').config();
const {API_PORT,POST_PORT,MYSQL_SERVICE_PORT,JWT_SECRET,MYSQL_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DATABASE} = process.env


module.exports = {
    api:{
        port: API_PORT  || 3000,
    },
    post:{ 
            port:POST_PORT
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
    }
}