const db = require("../models/index");
const moment = require("moment");
const helpers = require("./helpers.js");

module.exports = {
  create: function(req, res) {
    console.log(req.body);
    db.Admin.create(req.body)
      .then(dbAdmin => res.json(dbAdmin))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    db.Admin.find()
      // .sort({ date: -1 })
      .then(dbModel => {
        res.json(dbModel);
        console.log(dbModel);
      })

      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    db.Admin.findOne({ _id: req.params.id })
      .then(dbModel => {
        res.json(dbModel);
        // console.log(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Admin.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Admin.findOneAndRemove({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findCompaniesDueToday: function(req, res) {
    db.Admin.find({ endDate: moment().format("YYYY-MM-DD") })
      .then(dbModel => {
        res.json(dbModel);
        console.log(dbModel);
      })

      .catch(err => res.status(422).json(err));
  },
  sendAllEmails: function(req, res) {
    db.Admin.find({ endDate: moment().format("YYYY-MM-DD") })
      .then(companies => {
        console.log(companies);
        for (var i = 0; i < companies.length; i++) {
          db.Participant.find({ company: companies[i]._id }).then(
            participants => {
              // console.log("Participants for company.");
              console.log(participants);
              var pairs = helpers.getPairs(participants);
              for (var j = 0; j < pairs.length; j++) {
                helpers.sendPairEmail(pairs[j]);
              }
            }
          );
        }
      })
      .catch(err => res.status(422).json(err));
  }
};
