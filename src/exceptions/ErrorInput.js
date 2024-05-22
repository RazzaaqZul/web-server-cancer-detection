const ClientError = require("./ClientError");

class ErrorInput extends ClientError {
  constructor(message) {
    super(message);
    this.name = "InputError";
  }
}

module.exports = ErrorInput;
