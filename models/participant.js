var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team"
    }
  ],
  confirmed: {
    type: Boolean,
    required: false,
    default: false
  }
});

ParticipantSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

ParticipantSchema.pre("save", function(next) {
  var user = this;
  console.log("modified?");
  console.log(user.isModified());
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // hash the password along with our new salt
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);

    // override the cleartext password with the hashed one
    user.password = hash;
    next();
  });
});

// This creates our model from the above schema, using mongoose's model method
var Participant = mongoose.model("participant", ParticipantSchema);

// Export the Article model
module.exports = Participant;
