const express = require("express");
const schemas = require("../models/schemas");
const validate = require("../middleware/validate");
const vehicleSchemas = require("../models/vehicle");

const router = express.Router();

//create vehicle
router.post("/vehicles", validate(schemas.vehicle), (req, res) => {
  const vehicle = vehicleSchemas(req.body);

  vehicle
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//get all vehicles
router.get("/vehicles", (req, res) => {
  vehicleSchemas
    .find()
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
router.put("/vehicles/:id", validate(schemas.vehicle), (req, res) => {
  const { id } = req.params;

  vehicleSchemas
    .findByIdAndUpdate(
      { _id: id },
      {
        $set: req.body,
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//delete a user
router.delete("/vehicles/:id", (req, res) => {
  const { id } = req.params;
  vehicleSchemas
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
