const Joi = require('joi');

const MessageSchema = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    surname: Joi.string().min(4).max(30).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(5).max(300).required()
});

module.exports = MessageSchema;