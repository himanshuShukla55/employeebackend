const employeeRouter = require("express").Router();
const { authenticate } = require("../middlewares/auth");
const { EmployeeModel } = require("../models/employee.model");

employeeRouter.use(authenticate);

employeeRouter.post("/", async (req, res, next) => {
  try {
    const emp = await EmployeeModel.create(req.body);
    res
      .status(201)
      .json({ success: true, msg: "employee data added!", data: emp._doc });
  } catch (error) {
    console.log("error in adding emp:", error);
    next(error);
  }
});

employeeRouter.patch("/edit/:id", async (req, res, next) => {
  try {
    const emp = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ success: true, msg: "employee data updated!", data: emp._doc });
  } catch (error) {
    console.log("error in updateing emp:", error);
    next(error);
  }
});
employeeRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    await EmployeeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "employee data deleted!" });
  } catch (error) {
    console.log("error in deleting emp:", error);
    next(error);
  }
});
employeeRouter.get("/", async (req, res, next) => {
  try {
    const employees = await EmployeeModel.find(req.query);
    res
      .status(200)
      .json({ success: true, msg: "employees data found!", data: employees });
  } catch (error) {
    console.log("error in finding employees data:", error);
    next(error);
  }
});
employeeRouter.get("/department", async (req, res, next) => {
  try {
    const employees = await EmployeeModel.find(req.query);
    res
      .status(200)
      .json({ success: true, msg: "employees data found!", data: employees });
  } catch (error) {
    console.log("error in finding employees data:", error);
    next(error);
  }
});
employeeRouter.get("/firstname", async (req, res, next) => {
  try {
    const employees = await EmployeeModel.find(req.query);
    res
      .status(200)
      .json({ success: true, msg: "employees data found!", data: employees });
  } catch (error) {
    console.log("error in finding employees data:", error);
    next(error);
  }
});
employeeRouter.get("/sort", async (req, res, next) => {
  try {
    const employees = await EmployeeModel.find().sort({
      salary: +req.query.order,
    });
    res
      .status(200)
      .json({ success: true, msg: "employees data found!", data: employees });
  } catch (error) {
    console.log("error in finding employees data:", error);
    next(error);
  }
});
module.exports = { employeeRouter };
