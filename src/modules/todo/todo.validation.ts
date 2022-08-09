import * as Joi from 'joi';

const createValidation = Joi.object().keys({
    payee: Joi.string().required(),
    child: Joi.string().required(),
    pendingAmount: Joi.number().positive().required()
});

const updateValidation = Joi.object().keys({
    id: Joi.string().hex().length(24),
    payee: Joi.string().required(),
    child: Joi.string().required(),
    pendingAmount: Joi.number().positive().required()
});

const listValidation = Joi.object().keys({
    pageNo: Joi.number().optional().allow(""),
    pageSize: Joi.number().optional().allow(""),
    payee: Joi.string().optional().allow(""),
    child: Joi.string().optional().allow("")
});

const objectIdValidation = Joi.object().keys({
    id: Joi.string().hex().length(24)
});

export { createValidation, updateValidation, listValidation, objectIdValidation };