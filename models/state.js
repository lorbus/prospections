const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const StateSchema = new Schema({
  id           : { type : Number, required: true },
  abbreviation : { type : String, required: true, trim: true },
  name         : { type : String, required: true, trim: true },
  zip          : { type : Number, required: true, trim: true },
  commune      : { type : String, required: false, trim: true },
  lang         : { type : String, required: false, trim: true },
  alt          : { type : String, required: false, trim: true },
  long         : { type : String, required: false, trim: true },
  bsfNr        : { type : Number, required: false },
  
});

module.exports = mongoose.model('State', StateSchema);