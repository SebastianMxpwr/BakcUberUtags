const conductorModel = require('../../models/conductor_model')
const condcutorCtrl = {}

condcutorCtrl.getConductores = async(re, res)=>{
    const conductor = await conductorModel.find()
    res.json(conductor)
}

condcutorCtrl.deleteConductores = async(req, res) => {
    await conductorModel.findByIdAndDelete(req.params.id)
    res.json({status: 'Producto Eliminado'})
}

module.exports = condcutorCtrl
