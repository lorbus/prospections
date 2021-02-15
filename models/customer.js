const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      State = require('./state');

console.log(State);

const CustomerSchema = new Schema({
  prospectionDate : { type : Date,   required: true,  trim: true },
  bdmName         : { type : String, required: true,  trim: true },
  leadFrom        : { type : String, required: true,  trim: true },
  businessType    : { type : String, required: true,  trim: true },
  registration    : { type : String, required: true,  trim: true },
  businessName    : { type : String, required: true,  trim: true },
  locationName    : { type : String, required: true,  trim: true },
  phone           : { type : String, required: true,  trim: true },
  pending         : { type : String, required: true,  trim: true },
  archivedReason  : { type : String, required: false, trim: true },
  archiveDate     : { type : Date,   required: false, trim: true },
  note1           : { type : String, required: false, trim: true },
  note2           : { type : String, required: false, trim: true }, 
  firstName       : { type : String, required: true,  trim: true },
  lastName        : { type : String, required: true,  trim: true },
  role            : { type : String, required: true,  trim: true },
  email           : { type : String, required: true,  trim: true },
  address         : { type : String, required: true,  trim: true },
  stateId         : { type : Number, required: true },
  state           : State.schema,
  startDate       : { type : Date,   required: false,  trim: true },
  endDate         : { type : Date,   required: false,  trim: true }

});

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');
