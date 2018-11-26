const db = require("../models/index");
const helpers = require("./helpers.js");

module.exports = {
  create: function(req, res) {
    console.log(req.body);
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
  findAll: function(req, res) {
    db.Participant.find()
      // .sort({ date: -1 })
      .then(dbModel => {
        res.json(dbModel);
        console.log(dbModel);
      })

      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    db.Participant.findOne({ _id: req.params.id })
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

  //add confirmed: true later to the find parameters later
  makeMatches: function(req, res) {
    db.Participant.find({ company: req.params.id, confirmed: true }).then(
      participants => {
        res.json({ pairs: helpers.getPairs(participants) });
      }
    );
  }
};
