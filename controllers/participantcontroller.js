const db = require("../models/index");
const helpers = require("./helpers.js");

module.exports = {
  create: function(req, res) {
    console.log("successfully created", req.body);
    db.Participant.create(req.body)
      .then(dbParticipant => res.json(dbParticipant))
      .catch(err => res.status(422).json(err));
  },
  createAndSendConfirmationEmail: function(req, res) {
    console.log(req.body);
    db.Participant.create(req.body)
      .then(dbParticipant => {
        helpers.sendConfirmationEmail(dbParticipant);
        res.json(dbParticipant);
      })
      .catch(err => res.status(422).json(err));
  },
  sendInviteEmailExisting: function(req, res) {
    console.log(req.body);
    helpers.sendInviteEmailExisting(req.body);
  },
  sendInviteEmailNewUser: function(req, res) {
    console.log(req.body);
    helpers.sendInviteEmailNewUser(req.body);
  },
  findAll: function(req, res) {
    db.Participant.find()
      // .sort({ date: -1 })
      .then(dbModel => {
        res.json(dbModel);
        console.log(dbModel);
      })

      .catch(err => res.status(422).json(err));
  },
  findAllAtCompany: function(req, res) {
    db.Participant.find({ company: req.params.id })
      // .sort({ date: -1 })
      .then(dbModel => {
        res.json(dbModel);
        console.log("SERVER SIDE OUTPUT:" + dbModel);
      })

      .catch(err => res.status(422).json(err));
  },
  findAllAtTeam: function(req, res) {
    db.Participant.find({ teams: req.params.id })
      // .sort({ date: -1 })
      .then(dbModel => {
        res.json(dbModel);
        console.log("SERVER SIDE OUTPUT:" + dbModel);
      })

      .catch(err => res.status(422).json(err));
  },
  // findAllAtTeam: function(req, res) {
  //   db.Participant.find({ teams: req.params.id })
  //     // .sort({ date: -1 })
  //     .then(p => {
  //       newParticipants = [];

  //       for (var i = 0; i < p.length; i++) {
  //         newParticipants.push(p[i].name);
  //       }
  //       console.log("new participants", newParticipants);
  //       console.log("response from participants", p);

  //       res.json(newParticipants);
  //     })

  //     .catch(err => res.status(422).json(err));
  // },

  findById: function(req, res) {
    db.Participant.findOne({ _id: req.params.id })
      .populate("teams")
      .then(dbModel => {
        res.json(dbModel);
        // console.log(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function(req, res) {
    db.Participant.findOne({ email: req.params.email })
      .populate("teams")
      .then(dbModel => {
        res.json(dbModel);
        // console.log(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Participant.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  confirm: function(req, res) {
    db.Participant.findOneAndUpdate(
      { _id: req.params.id },
      { confirmed: true },
      {
        new: true
      }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Participant.findOneAndRemove({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addTeamToParticipant: function(req, res) {
    db.Participant.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { teams: req.body.teamId } },
      { new: true }
    )
      .then(function(dbUser) {
        db.Team.find({
          _id: {
            $in: dbUser.teams
          }
        }).then(teams => {
          console.log("teams", teams);
          newteams = [];
          for (var i = 0; i < teams.length; i++) {
            newteams.push({
              id: teams[i]._id,
              teamName: teams[i].teamName
            });
          }

          //need to use .toObject because Mongoose enforces schema on the returned object

          dbUser2 = dbUser.toObject();
          dbUser2.teams = newteams;

          res.json(dbUser2);
        });
        // res.json(dbUser)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  sendAllEmails: function(req, res) {
    db.Participant.find({
      teams: req.params.id
    })
      .then(participants => {
        // console.log("Participants for company.");
        console.log(participants);
        var pairs = helpers.getPairs(participants);
        // for (var j = 0; j < pairs.length; j++) {
        //   helpers.sendPairEmail(pairs[j]);
        // }
        res.json(pairs);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  }

  //add confirmed: true later to the find parameters later
  // makeMatches: function(req, res) {
  //   db.Participant.find({ company: req.params.id, confirmed: true }).then(
  //     participants => {
  //       res.json({ pairs: helpers.getPairs(participants) });
  //     }
  //   );
  // }
};
