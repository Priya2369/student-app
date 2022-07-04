const Joi = require('joi');

const StudentJoiSchema = {
    register:Joi.object({
        Name: Joi.string().min(3).max(200).required().trim().pattern(/^[a-z]([a-z,.'-]*)+(\s[a-z,.'-]+)*$/i),
        Gender: Joi.string().required(),
        PhoneNumber:Joi.string().required().trim().length(10).pattern(/^[6-9]+[0-9]+$/),
        Email: Joi.string().min(4).max(30).trim().pattern(/\S+@\S+\.\S+/),
        DateOfBirth: Joi.date().required(),

    }),

    update:Joi.object({
        Name: Joi.string().min(3).max(200).required().trim().pattern(/^[a-z]([a-z,.'-]*)+(\s[a-z,.'-]+)*$/i),
        Gender: Joi.string().required(),
        PhoneNumber:Joi.string().required().trim().length(10).pattern(/^[6-9]+[0-9]+$/),
        Email: Joi.string().min(4).max(30).trim().pattern(/\S+@\S+\.\S+/),
        DateOfBirth: Joi.date().required(),

    }),
}

module.exports = StudentJoiSchema;
