const validator = require("validator");
function postapivalidation(req) {
  if (req.body.name == "") {
    throw new Error("Name should not be empty");
  }
  if (!validator.isEmail(req.body.emailId)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(req.body.password)) {
    throw new Error("Please enter strong password");
  }
}

const validateProfileEditData = (req) => {
  const allowedfields = ["name", "lastName", "about", "city", "skills"];

  console.log("validation req body", req.body);

  isUpdateAllowed = Object.keys(req.body).every((fields) =>
    allowedfields.includes(fields)
  );

  return isUpdateAllowed;
};

module.exports = { postapivalidation, validateProfileEditData };
