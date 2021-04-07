const authSchemaConductor = require('../models/conductor_model')

authSchemaConductor.statics = {
    create: function (data, cb) {
      const con = new this(data);
      con.save(cb);
    },
    login: function (query, cb) {
      this.find(query, cb);
    }
  }

module.exports = authSchemaConductor;

