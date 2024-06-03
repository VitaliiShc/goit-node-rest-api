import Joi from 'joi';
import { emailRegexp, emailPatternValidateMsg } from '../helpers/regexps.js';

const registerSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .messages({
      'string.pattern.base': emailPatternValidateMsg,
    })
    .required(),
  password: Joi.string().min(8).required(),
});

const resendVerifyEmailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .messages({
      'string.pattern.base': emailPatternValidateMsg,
    })
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .insensitive()
    .required(),
});

export default {
  registerSchema,
  resendVerifyEmailSchema,
  loginSchema,
  updateSubscriptionSchema,
};
