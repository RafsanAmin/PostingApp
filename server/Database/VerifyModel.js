const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
  code: { type: String, maxLength: 6 },
});

const verifyModel = new mongoose.model('verify', verifySchema);

module.exports = verifyModel;
