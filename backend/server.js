const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://hammadsiddiq:ace123@cluster0.wjnke9f.mongodb.net/employee")

app.listen(3001, () =>{
  console.log("server is running")
})
