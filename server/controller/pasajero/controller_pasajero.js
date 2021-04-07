const Pasajero = require('../../dao/dao_pasajero');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createpas = (req, res) => {
  const newPasajero = {
    strNombre: req.body.strNombre,
    strEmail: req.body.strEmail,
    strPassword: bcrypt.hashSync(req.body.strPassword),
    nmbCelular: req.body.nmbCelular,
    strRfcCurp: req.body.strRfcCurp
  }

  Pasajero.create(newPasajero, (err, user) => {
    if (err && err.code === 11000) return res.status(409).send('El email ya existe');
    if (err) return res.status(500).send('Error del servidor', err);
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataPasajero = {
      strNombre: user.strNombre,
      strEmail: user.strEmail,
      strRfcCurp: user.strRfcCurp,
      nmbCelular: user.nmbCelular,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    // response 
    res.send({ dataPasajero });
  });
}

exports.loginpas = (req, res) => {
  const PasajeroData = {
    strEmail: req.body.strEmail,
    strPassword: req.body.strPassword
  }
  Pasajero.findOne({ strEmail: PasajeroData.strEmail }, (err, user) => {
    if (err) return res.status(500).send('Hubo un error en el servidor', err);

    if (!user) {
      res.status(404).send({ message: 'El correo no existe' });
    } else {
      const resultPassword = bcrypt.compareSync(PasajeroData.strPassword, user.strPassword);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

        const dataPasajero = {
          strNombre: user.strNombre,
          strEmail: user.strEmail,
          strRfcCurp: user.strRfcCurp,
          nmbCelular: user.nmbCelular,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.send({dataPasajero});
      } else {
        // password wrong
        res.status(409).send({ message: 'Error al logearse' });
      }
    }
  });
}