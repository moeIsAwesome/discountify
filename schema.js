const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  code: { type: String },
  percentage: { type: Number },
  status: { type: String },
});

const Code = mongoose.model('Codes', codeSchema);

module.exports = { Code };
