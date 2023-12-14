const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
const ShipmentModel = require('./models/Shipment');
const { ObjectID } = require('mongodb'); // Import ObjectID from MongoDB

const app = express();
app.use(cors());


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(
  'mongodb+srv://hammadsiddiq:ace123@cluster0.wjnke9f.mongodb.net/employee',
);


app.post('/login', async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res.status(400).json({ error: 'Email/Username and password are required' });
  }

  let query;
  if (email) {
    query = { email: email };
  } else {
    query = { username: username };
  }

  EmployeeModel.findOne(query)
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // Return the objectId along with other user information
          const { _id, ...userInfo } = user._doc;
          res.status(200).json({ message: 'Login success', user: { _id, ...userInfo } });
        } else {
          res.status(401).json({ error: 'Incorrect password' });
        }
      } else {
        res.status(404).json({ error: 'No record exists' });
      }
    })
    .catch((err) => {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});



app.post('/register', async (req, res) => {
  const { username } = req.body;

  // Check if the username already exists
  const existingEmployee = await EmployeeModel.findOne({ username });

  if (existingEmployee) {
    // If the username already exists, send an error response
   return res.status(400).json({ error: 'Username already exists' });
    
  }

  // If the username does not exist, create a new employee record
  EmployeeModel.create(req.body)
    .then((employee) => res.json(employee))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post('/addshipment', (req, res) => {
  ShipmentModel.create(req.body)
    .then((shipment) => res.json(shipment))
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.get('/getshipments', (req, res) => {
  ShipmentModel.find()
    .then((shipments) => {
      // Map documents to include an 'id' property
      const formattedShipments = shipments.map(shipment => ({
        id: shipment._id, // You can use the _id field as the id
        reference: shipment.reference,
        receiverName: shipment.receiverName,
        city: shipment.city,
        customerEmail: shipment.customerEmail,
        customerAddress: shipment.customerAddress,
        contactNumber: shipment.contactNumber,
        codAmount: shipment.codAmount,
      }));
      res.json(formattedShipments);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
}); 


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});