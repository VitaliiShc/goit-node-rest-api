import Joi from 'joi';

const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(3)
    .max(30)
    .pattern(
      /^(\+?\d{0,3}(\s|\()?\d{1,3}(\s|\))?(\s|\-)?\d{1,3}(\s|\-)?\d{2,5}(\s|\-)?\d{2,5}(\s|\-)?)?\d{2,5}$/
    )
    .required()
    .messages({
      'string.pattern.base':
        'You shold enter a phone number in pattern: "(012) 345-6789" or "+789(012) 345-67-89" or a short number for an emergency. You can exclude hyphens, spaces and parentheses.',
    }),
});

 const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  phone: Joi.string()
    .min(3)
    .max(30)
    .pattern(
      /^(\+?\d{0,3}(\s|\()?\d{1,3}(\s|\))?(\s|\-)?\d{1,3}(\s|\-)?\d{2,5}(\s|\-)?\d{2,5}(\s|\-)?)?\d{2,5}$/
    )
    .messages({
      'string.pattern.base':
        'You shold enter a phone number in pattern: "(012) 345-6789" or "+789(012) 345-67-89" or a short number for an emergency. You can exclude hyphens, spaces and parentheses.',
    }),
})
  .min(1)
  .message('Body must have at least one field');

  export default { createContactSchema, updateContactSchema };