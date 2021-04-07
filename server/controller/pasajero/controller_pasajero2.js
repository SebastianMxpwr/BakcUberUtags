const pasajeroModel = require('../../models/pasajero_model')
const pasajeroCtrl = {}

pasajeroCtrl.getPasajeros = async (req, res)=>{
    const pasajero = await pasajeroModel.find()
    res.json(pasajero)
}

module.exports = pasajeroCtrl