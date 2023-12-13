const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    enum: ["Tech", "Marketing", "Operations"],
  },
  salary: {
    type: Number,
    required: true,
  },
});

const EmployeeModel = model("employee", EmployeeSchema);

module.exports = { EmployeeModel };
