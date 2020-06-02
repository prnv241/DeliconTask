const { db } = require('../util/admin');

exports.newres = (req,res) => {
  const resdoc = {
    name: req.body.name,
    mobno: req.body.mobno,
    email: req.body.email,
    address: req.body.address,
    createdAt: new Date().toISOString(),
    userId: req.user.userId,
    uname: req.user.uname
  } 
  db.collection('reservations').add(resdoc)
   .then(() => {
     return res.json({ msg: 'Added sucessfully' });
   })
   .catch(err => {
     return res.status(500).json({ error: err.message });
   })
}

exports.getres = (req,res) => {
  db.collection('reservations').where('userId', '==', req.user.userId).get()
    .then(data => {
      let reservations = [];
      data.forEach(doc => {
        reservations.push({
          name: doc.data().name,
          mobno: doc.data().mobno,
          email: doc.data().email,
          address: doc.data().address,
          userId: req.user.userId,
          createdAt: doc.data().createdAt,
          uname: req.user.uname,
          resId: doc.id
        })
      });
      return res.json(reservations);
    })
    .catch(err => {
      return res.status(500).json({ error: err.message });
    })
}