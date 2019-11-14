const router = require("express").Router();
const participantController = require("../../controllers/participantcontroller.js");

// Matches with "/api/participant"
router
	.route("/")
	.get(participantController.findAll)
	.post(participantController.createAndSendConfirmationEmail);

// Matches with "/api/participant/create"
router
	.route("/create")
	.get(participantController.findAll)
	.post(participantController.create);

// Matches with "/api/participant/:id"
router
	.route("/:id")
	.get(participantController.findById)
	.put(participantController.update)
	.delete(participantController.remove);

// Matches with "/api/participant/addTeamToParticipant/:id"

router.route("/addTeamToParticipant/:id").post(participantController.addTeamToParticipant);	

// Matches with "/api/participant/company/:id"

router.route("/company/:id").get(participantController.findAllAtCompany);	

// Matches with "/api/participant/confirm/:id"

router.route("/confirm/:id").put(participantController.confirm);

// Matches with "/api/participant/matches/:id"

router.route("/matches/:id").get(participantController.makeMatches);

module.exports = router;
