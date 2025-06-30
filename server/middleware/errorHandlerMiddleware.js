import CustomAPIError from "../errors/customError.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ msg: err.message, error: err.stack });
  }
  console.log(err.stack);

  return res
    .status(500)
    .json({ msg: "Something Went wrong", error: err.stack });
};

export default errorHandlerMiddleware;
