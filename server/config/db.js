const mongoose = require('mongoose');
const dbURL = require('./propiedas').DB;

module.exports = () =>{
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(()=> console.log(`Mongo conectado en ${dbURL}`))
    .catch(err => console.log(`Hubo un error ${err}`))

    process.on('SIGINT', () =>{
        mongoose.connection.close(()=>{
            console.log(`Mongo is disconted`);
            process.exit(0);
        })
    })
}