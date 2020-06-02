const { admin, db } = require('../util/admin');

// eslint-disable-next-line consistent-return
exports.Authware = (req,res,next) => {
  let idToken;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      return db.collection('users').where(`userId`, '==', req.user.uid).limit(1).get();
    })
    .then(data => {
      req.user.uname = data.docs[0].data().uname;
      req.user.userId = data.docs[0].data().userId;
      return next();
    })
    .catch(err => {
      return res.status(500).json({ error: err.message });
    })
  } else {
    return res.status(403).json({ error: 'Unauthorized', tok: idToken });
  }
}