const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://hammadsiddiq:ace123@cluster0.wjnke9f.mongodb.net/employee"
);


app.post("/login", (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res.status(400).json({ error: "Email/Username and password are required" });
  }

  let query;
  if (email) {
    query = { email: email };
  } else {
    query = { username: username };
  }

  EmployeeModel.findOne(query)
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.status(200).json({ message: "Login success", user: user });
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      } else {
        res.status(404).json({ error: "No record exists" });
      }
    })
    .catch(err => {
      console.error("Error during login:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});
;

app.post("/register", async (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
