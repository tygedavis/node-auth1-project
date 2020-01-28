const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model.js');


router.post('/register', (req, res) => { //✔
  let user = req.body;

  const hash = bcrypt.hashSync(req.body.password, 8);

  user.password = hash;
  
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/login', (req,res) => { //✔
  let { username, password } = req.headers;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        console.log(user)
        res.status(200).json({ message: `Logged in: ${user.username}` });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/users', (req, res, next) => { //✔
  if (req.session && req.session.user) {
        console.log('GET success')
        Users.find()
          .then(users => { 
            res.status(200).json(users)
          })
          .catch(err => {
            res.status(401).json({ error: "Error with GET" })
          })
  } else {
    res.status(400).json({ error: "You shall not pass" });
  } 
});

module.exports = router;