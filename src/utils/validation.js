function postapivalidation(req) {
  if (req.body.name == "") {
    throw new Error("Name should not be empty");
  }
}

module.exports = { postapivalidation };
