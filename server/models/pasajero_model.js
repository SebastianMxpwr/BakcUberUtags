const mongoose = require('mongoose')
const { Schema } = mongoose

const pasajeroSchema = new Schema({
  strNombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
    trim: true
  },
  strEmail: {
    type: String,
    required: [true, 'El Email es necesario'],
    trim: true,
    unique: true
  },
  strPassword: {
    type: String,
    required: [true, 'La contraseña es necesaria'],
    trim: true
  },
  nmbCelular:[
    {type: Number}
  ],
  strRfcCurp:{
    type: String,
    required: [true, 'El Curp o Rfc es necesario'],
  },
  blnActivo:{
    type: Boolean,
    default: true
  }
}, {
    timestamps:{
      createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "pasajeros"
  });

module.exports = mongoose.model('Pasajeros', pasajeroSchema)