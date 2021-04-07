const mongoose = require('mongoose');
const { Schema } = mongoose

const adminSchema = new Schema({
  strNombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
    trim: true
  },
  strEmail: {
    type: String,
    required: [true, 'El email es necesario'],
    trim: true,
    unique: true
  },
  strPassword: {
    type: String,
    required: [true, 'La contraseña es necesaria'],
    trim: true
  },
  strRfcCurp:{
    type: String,
    required: [true, 'El Rfc o Curp es necesario']
  },
  nmbCelular:[
    {type: Number}
  ],
  blnActivo:{
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
},
collection: "admin"
  });

  module.exports = mongoose.model('Admin', adminSchema)