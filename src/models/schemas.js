const Joi = require("joi");

const schemas = {
  user: Joi.object().keys({
    firstname: Joi.string().min(2).max(100).alphanum().required(),
    lastname: Joi.string().min(2).max(100).alphanum().required(),
    username: Joi.string().min(8).max(100).required(),
    identification: Joi.string().required(),
    password: Joi.string().alphanum(),
    active: Joi.boolean().required(),

    typeVehicle: Joi.string().alphanum(),
    brand: Joi.string().alphanum(),
    model: Joi.string().alphanum(),
    year: Joi.number(),
    licensePlate: Joi.string(),
  }),

  vehicle: Joi.object().keys({
    typeVehicle: Joi.string().alphanum().required(),
    brand: Joi.string().alphanum().required(),
    model: Joi.string().alphanum().required(),
    year: Joi.number().required(),
    licensePlate: Joi.string().required(),
  }),
};

module.exports = schemas;
