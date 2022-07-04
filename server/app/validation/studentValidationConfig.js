const StudentJoiSchema = require("./studentJoiSchema");
exports.registeration = (req, res, next) => {
  const body = req.body;
  const { error, value } = StudentJoiSchema.register.validate(body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  // console.log("no validation error in registeration")
  next();
};

exports.update = (req, res, next) => {
  const body = req.body;
  const { error, value } = StudentJoiSchema.update.validate(body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  next();
};
