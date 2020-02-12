const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  extId: { type: String, required: true, unique: true },
  reseller: { type: String, required: true },
  cases: [{ type: mongoose.Schema.ObjectId, ref: 'Cases' }],
  storageUsage: { type: Number, required: true },
  storageSize: { type: Number, required: true }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
