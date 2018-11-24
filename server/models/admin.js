var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var AdminSchema = new Schema({
  // `firstName` is required and of type String
  companyName: {
    type: String,
    required: true
  },
  // `lastName` is required and of type String
  endDate: {
    type: Date,
    required: true
  },
  complete: {
    type: Boolean,
    required: false
  },
  emailAddress: {
    type: String,
    // ref: "Participant",
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Admin = mongoose.model("Admin", AdminSchema);

// Export the Article model
module.exports = Admin;
