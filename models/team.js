var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var Pair = new Schema({
  from: {
    type: String
  },
  to: {
    type: String
  }
});

// Using the Schema constructor, create a new team Schema object
var TeamSchema = new Schema({
  teamName: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: false
  },
  complete: {
    type: Boolean,
    required: false
  },
  emailAddress: {
    type: String,
    // ref: "Participant",
    required: false
  },
  pairs: {
    type: [Pair]
  }
});

// This creates our model from the above schema, using mongoose's model method
var Team = mongoose.model("Team", TeamSchema);

// Export the Article model
module.exports = Team;
