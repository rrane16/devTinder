const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    console.log("cookies auth file", cookies);

    const { token } = cookies;
    console.log("token", token);

    if (!token) {
      throw new Error("invalid token");
    }

    const decodedmessage = await jwt.verify(token, "DEVTINDERKEY34");
    console.log("decodedemessage", decodedmessage);

    const userId = decodedmessage._id;
    const user = await User.findById(userId);
    console.log("user data", user);

    if (!user) {
      throw new Error("user nopt found");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    console.log("error", err);
    res.send("400", "error while fetching", err.message);
  }
};

module.exports = { userAuth };
