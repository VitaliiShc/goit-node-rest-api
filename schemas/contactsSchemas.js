import Joi from 'joi';
import {
  emailRegexp,
  emailPatternValidateMsg,
  phoneRegexp,
  phonePatternValidateMsg,
} from '../helpers/regexps.js';

const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': emailPatternValidateMsg,
  }),
  phone: Joi.string().min(3).max(30).pattern(phoneRegexp).required().messages({
    'string.pattern.base': phonePatternValidateMsg,
  }),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().pattern(emailRegexp).messages({
    'string.pattern.base': emailPatternValidateMsg,
  }),
  phone: Joi.string().min(3).max(30).pattern(phoneRegexp).messages({
    'string.pattern.base': phonePatternValidateMsg,
  }),
  favorite: Joi.boolean(),
})
  .min(1)
  .message('Body must have at least one field');

const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
};
