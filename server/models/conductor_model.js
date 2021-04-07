const mongoose = require('mongoose');
const { Schema } = mongoose

const conductorSchema = new Schema({
  strNombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
    trim: true
  },
  nmbCelular:[
    {type: Number,required: [true, 'El numero de celular es necesario']}
  ],
  strEmail: {
    type: String,
    required: [true, 'El correo es necesario'],
    unique: true
  },
  strRfcCurp:{
    type: String,
    required: [true, 'El nombre es necesario'],
    trim: true,
    unique: true
  },
  strPassword: {
    type: String,
    required: [true, 'La contaseña es necesaria'],
    trim: true
  },
  blnActivo: {
    type: Boolean,
    default: true
  }
}, {
    timestamps:{
      createdAt: 'created_at',
      updatedAt: 'updated_at'
  },
  collection: "conductores"
  });

  module.exports = mongoose.model('Conductores', conductorSchema)