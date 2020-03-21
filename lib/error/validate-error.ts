export default class ValidateError extends Error {
  constructor(message = 'Validate error.') {
    super(message);
  }
}
