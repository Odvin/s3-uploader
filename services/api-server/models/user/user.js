const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uploads: [
    {
      useCase: String,
      fileType: [String],
      minSize: Number,
      maxSize: Number
    }
  ],
  storageUsage: { type: Number, required: true },
  storageSize: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
