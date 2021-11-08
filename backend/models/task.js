const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  time: { type: Number, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
