const mongoose = require('mongoose');

const { Schema } = mongoose;

const IpSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  registrationCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now()
  }
});

IpSchema.post('save', () => {
  const data = this;
  data.lastUpdateAt = new Date();
});

module.exports = mongoose.model('Ip', IpSchema);
