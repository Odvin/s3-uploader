const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  case: { type: String, required: true, unique: true },
  mineTypes: [String],
  minSize: { type: Number, required: true },
  maxSize: { type: Number, required: true }
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;