const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the payload size limit as needed

mongoose.connect('mongodb+srv://hammadsiddiq:ace123@cluster0.wjnke9f.mongodb.net/Portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Subtotal: Number,
});

// Use the correct collection name in the model
const DataModel = mongoose.model('Csv', dataSchema);

app.post('/upload', async (req, res) => {
  try {
    const data = req.body;
    await DataModel.insertMany(data);
    res.status(200).json({ message: 'Data successfully inserted into MongoDB' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
