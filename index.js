const express = require("express");
const cors = require("cors");
const { connection } = require("./utils/db");
const { userRouter } = require("./routes/users.routes");
const { handleError } = require("./middlewares/handleError");
const { employeeRouter } = require("./routes/employee.routes");
const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/users", userRouter);
app.use("/employees", employeeRouter);

app.use(handleError);

app.listen(3000, async () => {
  try {
    await connection(
      "mongodb+srv://himanshu:Himanshu123@cluster0.ztbwklm.mongodb.net/employeesManagement"
    );
    console.log("connected to database!");
  } catch (error) {
    console.error("error connecting to db: ", error);
  }
  console.log("app is listening!");
});
