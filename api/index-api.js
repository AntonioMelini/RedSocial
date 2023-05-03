const express = require ('express')
const bodyParser = require('body-parser')
const app = express();


const user = require('./src/components/user/network.js')
const authRouter = require('./src/components/auth/network.js')
//const postouter=require('./src/components/posts/network')
const config = require('../config.js')


app.use(bodyParser.json())
app.use('/api/user', user);
app.use('/api/auth',authRouter);
//app.use('/api/post',postouter) 

app.listen(config.api.port,()=>console.log('servicio post escuchando en el puerto',config.api.port)) 

