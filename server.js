require('dotenv').config();

const {
  getAllCodes,
  createCode,
  updateCode,
  deleteCode,
} = require('./handlers');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const cors = require('cors');
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    const db = mongoose.connection;

    db.once('open', () => {
      console.log('Database connected! ');
    });

    db.on('error', (err) => {
      console.error('connection error:');
      console.log(err);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.get('/api/codes', getAllCodes);
app.post('/api/codes', createCode);
app.patch('/api/codes/:id', updateCode);
app.delete('/api/codes/:id', deleteCode);

//Connect to the database before listening
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    console.log('====================================');
  });
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
};
app.use(express.static('build', options));
