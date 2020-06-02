const { db } = require('../util/admin');
const firebase = require('firebase');
const config = require('../util/config');
firebase.initializeApp(config);

exports.signup = (req,res) => {
  let token, userId;
  firebase.auth().createUserWithEmailAndPassword(req.body.email , req.body.password)
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken()
    })
    .then(idtoken => {
      token = idtoken;
      const userdoc = {
        uname: req.body.uname,
        email: req.body.email ,
        createdAt: new Date().toISOString(),
        userId: userId
      };
      return db.doc(`/users/${userdoc.userId}`).set(userdoc);
    })
    .then(() => {
      return res.json({ token });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    }) 
}

exports.login = (req,res) => {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      return res.status(500).json({ error: err.message });
    })
}