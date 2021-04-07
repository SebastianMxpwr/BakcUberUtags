const conductorModel = require('../../models/conductor_model')
const condcutorCtrl = {}

condcutorCtrl.getConductores = async(re, res)=>{
    const conductor = await conductorModel.find()
    res.json(conductor)
}

module.exports = condcutorCtrl