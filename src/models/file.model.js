const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  raceName: String,
  raceDate: String,
  raceDistance: String,
  raceTime: String,
  created_at: { type: Date, default: Date.now },
});

const File = mongoose.model('File', FileSchema);
module.exports = File;
