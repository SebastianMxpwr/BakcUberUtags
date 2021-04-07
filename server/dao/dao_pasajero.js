const authSchemaPasajero = require('../models/pasajero_model');

authSchemaPasajero.statics = {
  create: function (data, cb) {
    const pas = new this(data);
    pas.save(cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  }
}

module.exports = authSchemaPasajero;





