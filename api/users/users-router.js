const router = require('express').Router();
const Users = require('./users-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err: "Error fetching users" });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      console.log('user', user.id);
      if(user.id) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ notFound: "User with that I.D. could not be found"});
      }
    })
    .catch(err => {
      res.status(500).json({ err: "Could not get user by I.D." });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Users.update(id, changes)
    .then(user => {
      if(user) {
        res.status(201).json(user);
      } else {
        res.status(500).json({ err: "Could not update user" });
      }
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({ err: "There was an error updating user" });
    });
});

router.delete('/:id', (req, res) => {
  Users.removeUser(req.params.id)
    .then(count => {
      if(count > 0) {
        res.status(200).json({ message: "User has been successfully removed" });
      } else {
        res.status(404).json({ err: "This user was not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "There was an error deleting this user", err });
    });
});

router.get('/:id/plants', (req, res) => {
  const { id } = req.params
  Users.getUsersPlants(id)
    .then(plants => {
      res.status(200).json(plants);
    })
    .catch(err => {
      res.status(500).json({ err: "Error retrieving user's plants" });
    });
});

module.exports = router;
