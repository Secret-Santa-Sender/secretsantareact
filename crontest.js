var controller = require("./controllers/admincontroller.js");
const mongoose = require("mongoose");

// var cron = require("node-cron");

// cron.schedule("*/5 * * * * *", () => {
// 	console.log("running every 5 seconds");
// });

// function test() {
// 	console.log("hello world");
// }

// test();

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/secretsantareacted"
);

function sendEmailsDaily() {
	controller.sendAllEmails("", "");
	console.log("test");
}

sendEmailsDaily();

