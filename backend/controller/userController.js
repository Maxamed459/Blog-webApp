import User from "../models/User.js";
import comparePassword from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    // success

    const { username, email, password } = req.body;

    const isUserExists = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });
    if (isUserExists) {
      return res.status(400).send("username or email already exists");
    }

    const userInfo = new User({
      email: email,
      username: username,
      password: password,
    });

    await userInfo.save();

    userInfo.password = undefined;

    res.status(201).send(userInfo);
  } catch (error) {
    res.send("Something went wrong..." + error.message);
    console.log("Error At ", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExists = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!isUserExists) {
      return res.status(400).send("email is not found");
    }

    // password checking
    const isPasswordCorrect = await isUserExists.comparePassword(password);
  } catch (error) {
    console.log("Error at loginUser", error);
    res.status(400).send(error.message);
  }
};
