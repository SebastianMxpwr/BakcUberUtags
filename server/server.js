const cors = require('cors')
const morgan = require('morgan')
const Routes = require('./routes/routes');
const express = require('express');
const opcionesGet = require('./Midlewares/opcionesGet')
const app = express();
const Db = require('./config/db');
Db();
const propiedades = require('./config/propiedas');
const { dbv1 } = require('./dao/dao_pasajero');
const { dbv2 } = require('./dao/dao_conductor');
const { dbv3 } = require('./dao/dao_admin');
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true})

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(cors());

app.use(opcionesGet)
app.use(morgan('dev'))
app.use('/api', router)
Routes(router);
router.get('/', (req, res) => {
    res.send('Hello')
})

app.use(router);
app.listen(propiedades.PORT, ()=> console.log('El servidor corre en el puerto ', propiedades.PORT))