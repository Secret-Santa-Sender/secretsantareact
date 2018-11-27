const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 3001;

const db = require("./models");

// Serve up static assets (usually on heroku) LATER FOR HEROKU
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	console.log("Serving: " + __dirname + "/client/build/index.html");
	app.get("*", function(req, res) {
		res.sendFile(__dirname + "/client/build/index.html");
	});
}

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add api routes WHEN BUILT
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/secretsantareacted"
);

app.listen(PORT, () => {
	console.log("🌎 now listening for requests on port " + PORT);
});
