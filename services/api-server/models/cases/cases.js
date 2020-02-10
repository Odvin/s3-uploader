const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  mimes: [String],
  minSize: { type: Number, required: true, min: 1024, max: 1048576 },
  maxSize: { type: Number, required: true, min: 2097152, max: 104857600 }
});

const Cases = mongoose.model('Cases', caseSchema);

module.exports = Cases;
