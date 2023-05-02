const express = require ('express')
const bodyParser=require('body-parser');
const config = require('../../config');
const postRouter=require('./components/network')

const app=express()

app.use(bodyParser.json());
app.use('/api/post',postRouter)

app.listen(config.post.port,()=>{
    console.log("listen to port ",config.post.port);
})