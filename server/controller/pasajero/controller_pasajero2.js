const pasajeroModel = require('../../models/pasajero_model')
const pasajeroCtrl = {}

pasajeroCtrl.getPasajeros = async (req, res)=>{
    const pasajero = await pasajeroModel.find()
    res.json(pasajero)
}

pasajeroCtrl.deletePasajeros = async(req, res) => {
    await pasajeroModel.findByIdAndDelete(req.params.id)
    res.json({status: 'Producto Eliminado'})
}

module.exports = pasajeroCtrl
