import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: data._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized, please authenticate" });
  }
};