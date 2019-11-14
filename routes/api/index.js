const router = require("express").Router();
const adminRoutes = require("./admin");
const participantRoutes = require("./participant");
const teamRoutes = require("./team");



// admin routes
router.use("/admin", adminRoutes);

// team routes
router.use("/team", teamRoutes);

// participant routes
router.use("/participant", participantRoutes);

module.exports = router;