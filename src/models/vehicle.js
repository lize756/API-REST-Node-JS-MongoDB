const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  typeVehicle: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
