var cron = require("node-cron");

cron.schedule("*/5 * * * * *", () => {
	console.log("running every 5 seconds");
});
