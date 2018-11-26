const router = require("express").Router();
const adminController = require("../../controllers/admincontroller.js");
const emailer = require("../../config/emailer.js");

// Matches with "/api/admin"
router
	.route("/")
	.get(adminController.findAll)
	.post(adminController.createAdminSendEmail);

// Matches with "/api/admin/:id"
router
	.route("/:id")
	.get(adminController.findById)
	.put(adminController.update)
	.delete(adminController.remove);

// Matches with "/api/admin/sendemail"

// router.route("/sendemail").post(emailer.send);

// router.route("/sendemail").post(adminController.createAdminSendEmail);

// Matches with "/api/admin/companiesduetoday"

router.route("/companiesdue/today").get(adminController.findCompaniesDueToday);

router.route("/emails/sendAllEmails").get(adminController.sendAllEmails);

module.exports = router;
