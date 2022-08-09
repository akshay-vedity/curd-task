import * as Joi from 'joi';

const customerValidation = Joi.object().keys({
    name: Joi.string().required(),
    job: Joi.string().required()
});

const idValidation = Joi.object().keys({
    id: Joi.number().required()
});

const pageValidation = Joi.object().keys({
    page: Joi.number().required()
});

export { customerValidation, idValidation, pageValidation };