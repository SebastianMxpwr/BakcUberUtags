const Admin = require('../../dao/dao_admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createAdmin = (req, res) => {
  const newAdmin = {
    strNombre: req.body.strNombre,
    strEmail: req.body.strEmail,
    nmbCelular: req.body.nmbCelular,
    strRfcCurp: req.body.strRfcCurp,
    strPassword: bcrypt.hashSync(req.body.strPassword),
  }

  Admin.create(newAdmin, (err, user) => {
    if (err && err.code === 11000) return res.status(409).send('El email ya existe');
    if (err) return res.status(500).send('Error de servidor', err);
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataAdmin = {
      strNombre: user.strNombre,
      strEmail: user.strEmail,
      nmbCelular: user.nmbCelular,
      strRfcCurp: user.strRfcCurp,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    // response 
    res.send({ dataAdmin });
  });
}
  exports.loginadmin = (req, res) => {
    const adminData = {
      strEmail: req.body.strEmail,
      strPassword: req.body.strPassword
    }
    Admin.findOne({ strEmail: adminData.strEmail }, (err, user) => {
      if (err) return res.status(500).send('Error de servidor', err);
  
      if (!user) {
        res.status(404).send({ message: 'No se pudo logearo' });
      } else {
        const resultPassword = bcrypt.compareSync(adminData.strPassword, user.strPassword);
        if (resultPassword) {
          const expiresIn = 24 * 60 * 60;
          const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
  
          const dataAdmin = {
            strNombre: user.strNombre,
            strEmail: user.strEmail,
            nmbCelular: user.nmbCelular,
            strRfcCurp: user.strRfcCurp,
            accessToken: accessToken,
            expiresIn: expiresIn
          }
          res.send({ dataAdmin });
        } else {

          res.status(409).send({ message: 'Algo paso' });
        }
      }
    })
  }

