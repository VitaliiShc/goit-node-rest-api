export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const emailPatternValidateMsg = 'Invalid email format';

export const phoneRegexp =
  /^(\+?\d{0,3}(\s|\()?\d{1,3}(\s|\))?(\s|\-)?\d{1,3}(\s|\-)?\d{2,5}(\s|\-)?\d{2,5}(\s|\-)?)?\d{2,5}$/;
export const phonePatternValidateMsg =
  'You should enter a phone number in pattern: "(012) 345-6789" or "+789(012) 345-67-89" or a short number for an emergency. You can exclude hyphens, spaces and parentheses';
