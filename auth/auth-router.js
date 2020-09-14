const auth_router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');
const Users = require('../api/users/users-model.js');

auth_router.post('/register', (req, res) => {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 10);

  userInfo.password = hash;

  if(!req.body.username || !req.body.password) {
    res.status(404).json({ message: "Not all required inputs were entered" });
  } else {
    Users.add(userInfo)
      .then(user => {
        res.status(201).json({ id: user.id, username: user.username });
      })
      .catch(err => {
        res.status(500).json({ err: "Error registering user", message: err.message, stack: err.stack });
      });
  }
});

auth_router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ id: user.id, welcome: user.username, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error finding user to log in", err: err });
    });
});

auth_router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.stats(500).json({ err: "Error logging out" });
      } else {
        res.status(200).json({ message: "Successfully logged out" });
      }
    });
  } else {
    res.status(200).json({ message: "You were never here" });
  }
});

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '24h'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = auth_router;
