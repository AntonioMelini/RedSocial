const express= require('express');
const bodyParser = require('body-parser');
const router= require('./routes');
const config = require('../../config');

const app = express();

app.use(bodyParser.json());
app.use('/',router)


app.listen(config.mysqlService.port, ()=>{
    console.log('Servicio de mysql escuchando puerto', config.mysqlService.port);
})
