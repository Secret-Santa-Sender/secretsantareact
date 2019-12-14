const router = require("express").Router();
const participantController = require("../../controllers/participantcontroller.js");

// Matches with "/api/participant"
router
	.route("/")
	.get(participantController.findAll)
	.post(participantController.create);

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

// Matches with "/api/participant/email/:email"
router.route("/email/:email").get(participantController.findByEmail);

// Matches with "/api/participant/sendInviteEmailExisting"
router
	.route("/sendInviteEmailExisting")
	.post(participantController.sendInviteEmailExisting);

// Matches with "/api/participant/sendInviteEmailNewUser"
router
	.route("/sendInviteEmailNewUser")
	.post(participantController.sendInviteEmailNewUser);

// Matches with "/api/participant/addTeamToParticipant/:id"

router
	.route("/addTeamToParticipant/:id")
	.post(participantController.addTeamToParticipant);

// Matches with "/api/participant/company/:id"

router.route("/company/:id").get(participantController.findAllAtCompany);

// Matches with "/api/participant/team/:id"

router.route("/team/:id").get(participantController.findAllAtTeam);

// Matches with "/api/participant/sendallemails/:id"

router.route("/sendallemails/:id").get(participantController.sendAllEmails);

// Matches with "/api/participant/confirm/:id"

router.route("/confirm/:id").put(participantController.confirm);

// Matches with "/api/participant/matches/:id"

// router.route("/matches/:id").get(participantController.makeMatches);

module.exports = router;
