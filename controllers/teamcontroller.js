const db = require("../models/index");

module.exports = {
  create: function(req, res) {
    console.log("successfully created team", req.body);
    db.Team.create(req.body)
      .then(dbTeam => res.json(dbTeam))
      .catch(err => res.status(422).json(err));
  },

 findTeamNames: function(req, res) {

    db.Team.find({ _id: {
    	$in: req.params
    } })
      .then(dbModel => {
        res.json(dbModel);
        console.log(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    db.Team.findOne({ _id: req.params.id })
      .then(dbModel => {
        res.json(dbModel);
        // console.log(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

}