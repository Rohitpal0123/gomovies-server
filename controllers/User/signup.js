const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class signupUser {
  async userNameExists(email) {
    try {
      const userNameExists = await User.findOne({ email: email });
      if (userNameExists != null) throw "Username already exists !";
    } catch (error) {
      throw error;
    }
  }
  async emailExists(email) {
    try {
      const emailExists = await User.findOne({ email: email });
      if (emailExists != null) throw "Email is already used !";
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      console.log("third")
      const { firstName, lastName, userName, email, password } = req.body;
      console.log("🚀 ~ req.body:", req.body)

      await this.emailExists(email);
      await this.userNameExists(userName);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: hashedPassword,
      });

      if (!newUser) throw "User not signed up !";
      
      const token = generateToken(newUser._id);

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        domain: "notesify-three.vercel.app",
      };


      console.log(token)
      res.status(200)
      .cookie("jwt", token, options)
      .send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: {
          _id: newUser._id,
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: newUser.email,
          token: token,
        },
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error,
      });
    }
  };
}

module.exports = new signupUser();
