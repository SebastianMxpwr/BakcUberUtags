const viajeModel = require('../../models/viaje_modelo')
const viajeCtrl = {}

viajeCtrl.getViaje = async (req, res)=>{
    const viaje = await viajeModel.find()
    res.json(viaje)
}

viajeCtrl.crearViaje = async (req, res)=>{
    const viaje = new viajeModel(req.body)
    await viaje.save()
    res.json(viaje)
}

viajeCtrl.deleteViaje = async (req, res)=>{
    await viajeModel.findByIdAndRemove(req.params.id)
    res.json('se elimino')
}

module.exports = viajeCtrl