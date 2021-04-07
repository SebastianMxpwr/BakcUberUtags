const Conductor = require('../../dao/dao_conductor');
const conductorModel = require('../../models/conductor_model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createcon = (req, res, next) => {
  const newConductor = {
    strNombre: req.body.strNombre,
    strEmail: req.body.strEmail,
    nmbCelular: req.body.nmbCelular,
    strRfcCurp: req.body.strRfcCurp,
    strPassword: bcrypt.hashSync(req.body.strPassword)
  }

  Conductor.create(newConductor, (err, user) => {
    if (err && err.code === 11000) return res.status(409).send('El email ya exite');
    if (err) return res.status(500).send('Server error');
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataConductor = {
      strNombre: user.strNombre,
      strEmail: user.strEmail,
      nmbCelular: user.nmbCelular,
      strRfcCurp: user.strRfcCurp,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    // response 
    res.send({ dataConductor });
  });
}

exports.logincon = (req, res, next) => {
  const conductorData = {
    strEmail: req.body.strEmail,
    strPassword: req.body.strPassword
  }
  Conductor.findOne({ strEmail: conductorData.strEmail }, (err, user) => {
    if (err) return res.status(500).send('Server error!');

    if (!user) {
      // email does not exist
      res.status(404).send({ message: 'No se pudo logear' });
    } else {
      const resultPassword = bcrypt.compareSync(conductorData.strPassword, user.strPassword);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

        const dataConductor = {
          strNombre: user.strNombre,
          strEmail: user.strEmail,
          nmbCelular: user.nmbCelular,
          strRfcCurp: user.strRfcCurp,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.send({ dataConductor });
      } else {
        // password wrong
        res.status(409).send({ message: 'Something is wrong' });
      }
    }
  });
}

