import express from "express";
import { User } from "../models/User.js";
const app = express.Router();
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwtSecret = "mynameismateeniamawebdeveloper";
app.post(
  "/createUser",
  [
    body("email", "incorrect email").isEmail(),
    body("name", "inncorrect name").isLength({ min: 4 }),
    body("password", "Minimum 8 length are required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      const { name, location, email } = req.body;
      await User.create({ name, location, email, password: secPassword });
      return res.status(200).json({
        message: "added succesfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        message: "something wrong",
        success: false,
      });
    }
  }
);

app.post(
  "/loginuser",
  [
    body("email", "incorrect email").isEmail(),
    body("password", "Minimum 8 length are required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let email = req.body.email;
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ error: "Invalid email" });
      }
      let pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res.status(400).json({ error: "Invlaid Password" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

export default app;
