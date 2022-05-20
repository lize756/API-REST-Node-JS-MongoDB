const express = require("express");
const bcrypt = require("bcrypt");
const schemas = require("../models/schemas");
const validate = require("../middleware/validate");
const userSchema = require("../models/user");

const router = express.Router();

// create user
router.post("/users", validate(schemas.user), async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new userSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    identification: req.body.identification,
    password: encryptedPassword,
    active: req.body.active,
  });

  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//get a users
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//update a users
router.put("/users/:id", validate(schemas.user), async (req, res) => {
  const { id } = req.params;

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  userSchema
    .findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          identification: req.body.identification,
          password: encryptedPassword,
          active: req.body.active,
        },
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
