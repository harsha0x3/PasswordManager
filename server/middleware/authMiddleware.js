import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Users from "../models/Users.js";
import AuthError from "../errors/authError.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Cookies");

  console.log(req.cookies);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decoded.userId);
      return next();
    } catch (error) {
      console.log(error);
      throw new AuthError("Not Authorised, Invalid Token");
    }
  }

  throw new AuthError("Not authorized, No token present");
});

export default protectRoute;
