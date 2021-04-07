const mongoose = require('mongoose');
const { Schema } = mongoose

const viejeSchema = new Schema({
    idPasajero:{
        type: Schema.Types.ObjectId,
        ref: 'pasajeros',
        required: [true, 'El pasajero debe existir']

    },
    idConductor:{
        type: Schema.Types.ObjectId,
        ref: 'conductores',
        required: [true, 'El conductor debe existir']

    },
    strOrigen:{
        type: String,
        required: [true, 'El origen debe estar']
    },
    strDestino:{
        type: String,
        required: [true, 'El destino debe estar']
    },
    blnActivo:{
        type: Boolean,
        default: true
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "viaje"   
})

module.exports = mongoose.model('Viaje', viejeSchema)
