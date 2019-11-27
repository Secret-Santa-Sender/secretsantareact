var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var ParticipantSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  likes: {
    type: String,
    required: false
  },
  dislikes: {
    type: String,
    required: false
  },
  imgUrl: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Admin"
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: "Team"
  }],
  confirmed: {
    type: Boolean,
    required: false,
    default: false
  }
});

// This creates our model from the above schema, using mongoose's model method
var Participant = mongoose.model("participant", ParticipantSchema);

// Export the Article model
module.exports = Participant;
