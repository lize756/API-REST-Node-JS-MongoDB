const Joi = require("joi");

const schemas = {
  user: Joi.object().keys({
    firstname: Joi.string()
      .min(2)
      .max(100)
      .pattern(new RegExp("^[a-zA-Z0-9 ]{8,30}$"))
      .required(),
    lastname: Joi.string()
      .min(2)
      .max(100)
      .pattern(new RegExp("^[a-zA-Z0-9 ]{8,30}$"))
      .required(),
    username: Joi.string().min(8).max(100).required(),
    identification: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
    active: Joi.boolean().required(),
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
