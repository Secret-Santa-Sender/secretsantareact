const router = require("express").Router();
const teamController = require("../../controllers/teamcontroller.js");

// Matches with "/api/team"
router
	.route("/")
	.post(teamController.create)
	.get(teamController.findTeamNames)

//Matches with "/api/team/:id"
router
	.route("/:id")
	.get(teamController.findById)

module.exports = router;
