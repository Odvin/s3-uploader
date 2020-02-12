const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  case: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  bucket: { type: String, required: true },
  mime: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const Uploads = mongoose.model('Uploads', uploadSchema);

module.exports = Uploads;
