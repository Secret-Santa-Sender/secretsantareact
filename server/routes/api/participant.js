const router = require("express").Router();
const participantController = require("../../controllers/participantcontroller.js");

// Matches with "/api/participant"
router
	.route("/")
	.get(participantController.findAll)
	.post(participantController.create);

// Matches with "/api/participant/:id"
router
	.route("/:id")
	.get(participantController.findById)
	.put(participantController.update)
	.delete(participantController.remove);

// Matches with "/api/participant/matches/:id"

router.route("/matches/:id").get(participantController.makeMatches);

module.exports = router;
