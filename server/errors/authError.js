import CustomAPIError from "./customError.js";

class AuthError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

export default AuthError;
