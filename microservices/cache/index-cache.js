const express= require('express');
const bodyParser = require('body-parser');
const router= require('./routes');
const config = require('../../config');

const app = express();

app.use(bodyParser.json());
app.use('/',router)


app.listen(config.cache.port, ()=>{
    console.log('Servicio de cache escuchando puerto', config.cache.port);
})