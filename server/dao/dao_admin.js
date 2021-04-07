const authSchemaAdmin = require('../models/admin_model')

authSchemaAdmin.statics = {
  create: function (data, cb) {
    const admin = new this(data);
    admin.save(cb);
  },
    login: function (query, cb) {
      this.find(query, cb);
    }
  }

module.exports = authSchemaAdmin;

