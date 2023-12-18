const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const ShipmentModel = require("./models/Shipment");

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(
  "mongodb+srv://hammadsiddiq:ace123@cluster0.wjnke9f.mongodb.net/employee"
);

app.post("/login", async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res
      .status(400)
      .json({ error: "Email/Username and password are required" });
  }

  let query;
  if (email) {
    query = { email: email };
  } else {
    query = { username: username };
  }

  try {
    const user = await EmployeeModel.findOne(query);

    if (user) {
      if (user.password === password) {
        // Return the objectId along with other user information
        const { password, ...userInfo } = user._doc;
        res.status(200).json({ message: "Login success", user: { userInfo } });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "No record exists" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { username } = req.body;

  try {
    const existingEmployee = await EmployeeModel.findOne({ username });

    if (existingEmployee) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const employee = await EmployeeModel.create(req.body);
    res.json(employee);
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/addshipment", async (req, res) => {
  const {
    reference,
    receiverName,
    city,
    customerEmail,
    customerAddress,
    contactNumber,
    codAmount,
    userIds,
  } = req.body;

  try {
    const users = await EmployeeModel.find({ _id: { $in: userIds } });

    if (!users || !Array.isArray(users) || users.length !== userIds.length) {
      return res.status(404).json({ error: "One or more users not found" });
    }

    const shipment = await ShipmentModel.create({
      reference,
      receiverName,
      city,
      customerEmail,
      customerAddress,
      contactNumber,
      codAmount,
      user: users.map((user) => user._id),
    });

    // Update each user's shipments array using Promise.all
    await Promise.all(
      users.map(async (user) => {
        user.shipments.push(shipment._id);
        await user.save();
      })
    );

    res.json(shipment);
  } catch (err) {
    console.error("Error during shipment creation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getshipments", async (req, res) => {
  try {
    const shipments = await ShipmentModel.find();
    const formattedShipments = shipments.map((shipment) => ({
      id: shipment._id,
      reference: shipment.reference,
      receiverName: shipment.receiverName,
      city: shipment.city,
      customerEmail: shipment.customerEmail,
      customerAddress: shipment.customerAddress,
      contactNumber: shipment.contactNumber,
      codAmount: shipment.codAmount,
    }));
    res.json(formattedShipments);
  } catch (err) {
    console.error("Error fetching shipments:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/getregister", async (req, res) => {
  try {
    const employeesWithShipments = await EmployeeModel.find().populate(
      "shipments"
    );
    const formattedEmployees = employeesWithShipments.map((employee) => ({
      username: employee.username,
      shipments: employee.shipments.map((shipment) => ({
        id: shipment._id,
        reference: shipment.reference,
        receiverName: shipment.receiverName,
        city: shipment.city,
        customerEmail: shipment.customerEmail,
        customerAddress: shipment.customerAddress,
        contactNumber: shipment.contactNumber,
        codAmount: shipment.codAmount,
      })),
    }));
    res.json(formattedEmployees);
  } catch (err) {
    console.error("Error fetching employees with shipments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
