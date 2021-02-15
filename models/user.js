const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  email       : { type : String, required: true, trim: true },
  password    : { type : String, required: true, trim: true },
  phone       : { type : String, required: true, trim: true },
  firstName   : { type : String, required: true, trim: true },
  lastName    : { type : String, required: true, trim: true },
  role        : { type : String, trim: true },
  address     : { type : String, trim: true }

});

module.exports = mongoose.model('User', UserSchema);
