const router = require("express").Router();
const adminRoutes = require("./admin");
const participantRoutes = require("./participant");


// admin routes
router.use("/admin", adminRoutes);

// participant routes
router.use("/participant", participantRoutes);

module.exports = router;