import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // console.log(token);
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
