const express = require("express");
const schemas = require("../models/schemas");
const validate = require("../middleware/validate");
const vehicleSchemas = require("../models/vehicle");
const userSchema = require("../models/user");

const router = express.Router();

//create vehicle
router.post("/vehicles/:id", validate(schemas.vehicle), (req, res) => {
  const vehicle = vehicleSchemas(req.body);
  const { id } = req.params;
  userSchema
    .findOneAndUpdate({ _id: id }, { $push: { vehicles: req.body } })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//get all vehicles
router.get("/vehicles/:id", (req, res) => {
  const { id } = req.params;
  const projection = { _id: 0, vehicles: 1 };
  userSchema
    .find({ _id: id }, { vehicles: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//get a vehicles
router.get("/vehicles/:id", (req, res) => {
  const { id } = req.params;
  vehicleSchemas
    .findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//update a vehicles
router.put("/vehicles/:userId/vehicle/:id", (req, res) => {
  const { userId, id } = req.params;

  userSchema
    .findOneAndUpdate(
      { _id: userId, "vehicles._id": id },

      {
        $set: {
          "vehicles.$": req.body,
        },
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//delete a vehicle
router.delete("/vehicles/:userId/vehicle/:id", (req, res) => {
  const { userId, id } = req.params;
  userSchema
    .findOneAndUpdate(
      { _id: userId, "vehicles._id": id },
      { $pull: { vehicles: { _id: id } } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
